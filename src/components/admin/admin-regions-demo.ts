export type RegionLevel =
  'Country' | 'Province / City' | 'Intermediate Area' | 'Ward / Commune'

export type Region = {
  id: string
  name: string
  level: RegionLevel
  parentId: string
  order: number
  status: 'Active' | 'Inactive'
}

export const initialRegions: Region[] = [
  {
    id: 'vn',
    name: 'Vietnam',
    level: 'Country',
    parentId: '',
    order: 1,
    status: 'Active',
  },
  {
    id: 'hcm',
    name: 'Ho Chi Minh City',
    level: 'Province / City',
    parentId: 'vn',
    order: 1,
    status: 'Active',
  },
  {
    id: 'saigon',
    name: 'Sai Gon Ward',
    level: 'Ward / Commune',
    parentId: 'hcm',
    order: 1,
    status: 'Active',
  },
  {
    id: 'benthanh',
    name: 'Ben Thanh Ward',
    level: 'Ward / Commune',
    parentId: 'hcm',
    order: 2,
    status: 'Active',
  },
  {
    id: 'hn',
    name: 'Ha Noi',
    level: 'Province / City',
    parentId: 'vn',
    order: 2,
    status: 'Active',
  },
  {
    id: 'dn',
    name: 'Da Nang',
    level: 'Province / City',
    parentId: 'vn',
    order: 3,
    status: 'Active',
  },
  {
    id: 'anhai',
    name: 'An Hai Ward',
    level: 'Ward / Commune',
    parentId: 'dn',
    order: 1,
    status: 'Inactive',
  },
  {
    id: 'sg',
    name: 'Singapore',
    level: 'Country',
    parentId: '',
    order: 2,
    status: 'Active',
  },
]

export const regionLevels: RegionLevel[] = [
  'Country',
  'Province / City',
  'Intermediate Area',
  'Ward / Commune',
]

export const allowedParents: Record<RegionLevel, RegionLevel[]> = {
  Country: [],
  'Province / City': ['Country'],
  'Intermediate Area': ['Province / City'],
  'Ward / Commune': ['Province / City', 'Intermediate Area'],
}

export function regionPath(regions: Region[], region: Region): string {
  const names: string[] = []
  const visited = new Set<string>()
  let current: Region | undefined = region
  while (current && !visited.has(current.id)) {
    names.unshift(current.name)
    visited.add(current.id)
    current = regions.find((item) => item.id === current?.parentId)
  }
  return names.join(' / ')
}

export function isAncestor(
  regions: Region[],
  id: string,
  targetId: string,
): boolean {
  const visited = new Set<string>()
  let current = regions.find((item) => item.id === id)
  while (current && !visited.has(current.id)) {
    if (current.id === targetId) return true
    visited.add(current.id)
    current = regions.find((item) => item.id === current?.parentId)
  }
  return false
}

export function orderedRegions(
  regions: Region[],
): { item: Region; depth: number }[] {
  const result: { item: Region; depth: number }[] = []
  const visited = new Set<string>()
  const children = new Map<string, Region[]>()
  for (const region of regions) {
    const siblings = children.get(region.parentId) ?? []
    siblings.push(region)
    children.set(region.parentId, siblings)
  }
  for (const siblings of children.values()) {
    siblings.sort((a, b) => a.order - b.order)
  }
  function visit(parentId: string, depth: number) {
    children.get(parentId)?.forEach((item) => {
      if (visited.has(item.id)) return
      visited.add(item.id)
      result.push({ item, depth })
      visit(item.id, depth + 1)
    })
  }
  visit('', 0)
  return result
}
