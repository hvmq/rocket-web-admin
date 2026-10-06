import { allowedParents, regionLevels, type Region } from './admin-regions-demo'

export type RegionImportMode = 'merge' | 'replace'
export type RegionImportPreview = {
  imported: Region[]
  regions: Region[]
  added: number
  updated: number
  removed: number
}

export const regionImportMaxBytes = 5 * 1024 * 1024
const maxRegions = 20_000

export const regionImportExample = {
  meta: { countryCode: 'VN' },
  provinces: [
    {
      code: '79',
      name: 'Thành phố Hồ Chí Minh',
      wards: [{ code: '26740', name: 'Phường Sài Gòn' }],
    },
  ],
}

export class RegionImportError extends Error {
  detail: string

  constructor(message: string, detail = '') {
    super(message)
    this.detail = detail
  }
}

function invalid(message: string, detail = ''): never {
  throw new RegionImportError(message, detail)
}

function record(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    invalid('Expected a JSON object.', path)
  }
  return value as Record<string, unknown>
}

function text(value: unknown, path: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    invalid('Enter a non-empty text value.', path)
  }
  return value.trim()
}

function code(value: unknown, path: string, digits: number): string {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0) {
    return String(value).padStart(digits, '0')
  }
  return text(value, path)
}

function status(value: unknown, path: string): Region['status'] {
  if (value === undefined) return 'Active'
  if (value !== 'Active' && value !== 'Inactive') {
    invalid('Status must be Active or Inactive.', path)
  }
  return value
}

function order(value: unknown, fallback: number, path: string): number {
  if (value === undefined) return fallback
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 1) {
    invalid('Enter a positive display order.', path)
  }
  return value
}

function nestedRegions(root: Record<string, unknown>): Region[] {
  if (!Array.isArray(root.provinces) || !root.provinces.length) {
    invalid('The province list must be a non-empty array.', 'provinces')
  }
  const meta = root.meta === undefined ? {} : record(root.meta, 'meta')
  const countryCode = text(meta.countryCode ?? 'VN', 'meta.countryCode')
  const countryId = countryCode.toLowerCase()
  const countryName = text(
    meta.countryName ?? (countryId === 'vn' ? 'Vietnam' : countryCode),
    'meta.countryName',
  )
  const regions: Region[] = [
    {
      id: countryId,
      name: countryName,
      level: 'Country',
      parentId: '',
      order: 1,
      status: 'Active',
    },
  ]
  let wardCount = 0
  root.provinces.forEach((value, index) => {
    const path = `provinces[${index}]`
    const province = record(value, path)
    const provinceCode = code(province.code, `${path}.code`, 2)
    const provinceId = `${countryId}-province-${provinceCode}`
    regions.push({
      id: provinceId,
      name: text(province.name, `${path}.name`),
      level: 'Province / City',
      parentId: countryId,
      order: order(province.order, index + 1, `${path}.order`),
      status: status(province.status, `${path}.status`),
    })
    if (regions.length > maxRegions) invalid('Too many regions in this JSON.')
    if (!Array.isArray(province.wards)) {
      invalid('Each province must have a wards array.', `${path}.wards`)
    }
    province.wards.forEach((value, wardIndex) => {
      const wardPath = `${path}.wards[${wardIndex}]`
      const ward = record(value, wardPath)
      regions.push({
        id: `${countryId}-ward-${code(ward.code, `${wardPath}.code`, 5)}`,
        name: text(ward.name, `${wardPath}.name`),
        level: 'Ward / Commune',
        parentId: provinceId,
        order: order(ward.order, wardIndex + 1, `${wardPath}.order`),
        status: status(ward.status, `${wardPath}.status`),
      })
      wardCount++
      if (regions.length > maxRegions) invalid('Too many regions in this JSON.')
    })
  })
  if (
    (meta.provinceCount !== undefined &&
      meta.provinceCount !== root.provinces.length) ||
    (meta.wardCount !== undefined && meta.wardCount !== wardCount)
  ) {
    invalid('Catalogue counts do not match the JSON data.', 'meta')
  }
  return regions
}

function flatRegions(values: unknown[]): Region[] {
  if (!values.length) invalid('The region list must be a non-empty array.')
  if (values.length > maxRegions) invalid('Too many regions in this JSON.')
  return values.map((value, index) => {
    const path = `regions[${index}]`
    const item = record(value, path)
    const level = text(item.level, `${path}.level`)
    if (!regionLevels.includes(level as Region['level'])) {
      invalid('Choose a supported region level.', `${path}.level`)
    }
    return {
      id: text(item.id, `${path}.id`),
      name: text(item.name, `${path}.name`),
      level: level as Region['level'],
      parentId:
        item.parentId === undefined ||
        item.parentId === null ||
        item.parentId === ''
          ? ''
          : text(item.parentId, `${path}.parentId`),
      order: order(item.order, index + 1, `${path}.order`),
      status: status(item.status, `${path}.status`),
    }
  })
}

export function parseRegionJson(source: string): Region[] {
  if (!source.trim()) invalid('Choose a JSON file or paste JSON data.')
  if (new TextEncoder().encode(source).length > regionImportMaxBytes) {
    invalid('The JSON file must be 5 MB or smaller.')
  }
  let value: unknown
  try {
    value = JSON.parse(source.replace(/^\uFEFF/, ''))
  } catch {
    invalid('Invalid JSON. Check quotes, commas and brackets.')
  }
  if (Array.isArray(value)) {
    return value.some(
      (item) => item && typeof item === 'object' && 'wards' in item,
    )
      ? nestedRegions({ provinces: value })
      : flatRegions(value)
  }
  const root = record(value, 'JSON')
  if ('provinces' in root) return nestedRegions(root)
  if (Array.isArray(root.regions)) return flatRegions(root.regions)
  return invalid('Use a provinces object or a regions array.')
}

function validateHierarchy(regions: Region[]): void {
  const byId = new Map<string, Region>()
  const siblingNames = new Set<string>()
  for (const region of regions) {
    if (byId.has(region.id)) invalid('Duplicate region ID.', region.id)
    byId.set(region.id, region)
    const nameKey = JSON.stringify([
      region.parentId,
      region.name.normalize('NFC').toLocaleLowerCase(),
    ])
    if (siblingNames.has(nameKey)) {
      invalid('A sibling with this name already exists.', region.name)
    }
    siblingNames.add(nameKey)
  }
  for (const region of regions) {
    if (region.level === 'Country') {
      if (region.parentId) invalid('A country cannot have a parent.', region.id)
      continue
    }
    const parent = byId.get(region.parentId)
    if (!parent) invalid('Parent region was not found.', region.id)
    if (!allowedParents[region.level].includes(parent.level)) {
      invalid('Parent level is incompatible with this region.', region.id)
    }
  }
  // Compatible levels strictly descend from Country to Ward / Commune,
  // so validating every parent level also rules out cycles and orphan trees.
}

function normalizeOrder(regions: Region[]): Region[] {
  const groups = new Map<string, Region[]>()
  for (const value of regions) {
    const group = groups.get(value.parentId) ?? []
    group.push({ ...value })
    groups.set(value.parentId, group)
  }
  return Array.from(groups.values()).flatMap((group) =>
    group
      .sort((a, b) => a.order - b.order)
      .map((region, index) => ({ ...region, order: index + 1 })),
  )
}

export function previewRegionImport(
  imported: Region[],
  current: Region[],
  mode: RegionImportMode,
): RegionImportPreview {
  const incomingIds = new Set<string>()
  for (const region of imported) {
    if (incomingIds.has(region.id)) invalid('Duplicate region ID.', region.id)
    incomingIds.add(region.id)
  }
  const next = normalizeOrder([
    ...(mode === 'merge'
      ? current.filter((item) => !incomingIds.has(item.id))
      : []),
    ...imported,
  ])
  validateHierarchy(next)
  const existing = new Map(current.map((item) => [item.id, item]))
  const changed = (a: Region, b: Region) =>
    a.name !== b.name ||
    a.level !== b.level ||
    a.parentId !== b.parentId ||
    a.order !== b.order ||
    a.status !== b.status
  return {
    imported,
    regions: next,
    added: next.filter((item) => !existing.has(item.id)).length,
    updated: next.filter((item) => {
      const before = existing.get(item.id)
      return before && changed(before, item)
    }).length,
    removed:
      mode === 'replace'
        ? current.filter((item) => !incomingIds.has(item.id)).length
        : 0,
  }
}
