export type Platform = 'android' | 'ios'
export type ContentLocale = 'vi' | 'en'
export type BuildConfig = {
  latestBuildNumber: number
  minSupportedBuildNumber: number
}
export type UpdateContent = {
  title: string
  message: string
  releaseNotes: string[]
}
export type AppConfig = {
  hasCriticalIssue: boolean
  update: Record<Platform, BuildConfig> & {
    locales: Record<ContentLocale, UpdateContent>
  }
}
export type AppConfigDraft = Omit<AppConfig, 'update'> & {
  update: Record<Platform, Record<keyof BuildConfig, string>> & {
    locales: Record<ContentLocale, UpdateContent>
  }
}

export const appConfigStorageKey = 'rocket-admin-app-config-v1'

export function createAppConfig(): AppConfig {
  return {
    hasCriticalIssue: false,
    update: {
      android: { latestBuildNumber: 52, minSupportedBuildNumber: 52 },
      ios: { latestBuildNumber: 52, minSupportedBuildNumber: 52 },
      locales: {
        vi: {
          title: 'Cập nhật ứng dụng',
          message:
            'Phiên bản mới đã sẵn sàng: Cali Life đã được cập nhật để mang đến trải nghiệm nhanh hơn, mượt mà hơn và ổn định hơn.',
          releaseNotes: [
            `• Tối ưu hiệu suất
Cải thiện tốc độ và khả năng phản hồi của ứng dụng.
• Cải thiện trải nghiệm
Tối ưu các tính năng để bạn sử dụng thuận tiện hơn.
• Lắng nghe ý kiến Hội viên
Chúng tôi đã ghi nhận và khắc phục các sự cố được Hội viên phản hồi, đồng thời tiếp tục cải thiện ứng dụng.
Cập nhật ngay để trải nghiệm phiên bản mới!`,
          ],
        },
        en: {
          title: 'App Update',
          message:
            'The new version is ready: Cali Life has been updated to provide a faster, smoother, and more stable experience.',
          releaseNotes: [
            `• Performance Optimization
Improved app speed and responsiveness.
• Enhanced Experience
Optimized features for a more convenient experience.
• Your Feedback Matters
We’ve listened to our members and resolved the issues they reported, while continuing to improve the app.
Update now to enjoy the latest version!`,
          ],
        },
      },
    },
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

export function isAppConfig(value: unknown): value is AppConfig {
  if (
    !isRecord(value) ||
    typeof value.hasCriticalIssue !== 'boolean' ||
    !isRecord(value.update)
  )
    return false
  for (const platform of ['android', 'ios']) {
    const build = value.update[platform]
    if (
      !isRecord(build) ||
      typeof build.latestBuildNumber !== 'number' ||
      typeof build.minSupportedBuildNumber !== 'number' ||
      !Number.isSafeInteger(build.latestBuildNumber) ||
      build.latestBuildNumber < 0 ||
      !Number.isSafeInteger(build.minSupportedBuildNumber) ||
      build.minSupportedBuildNumber < 0 ||
      build.minSupportedBuildNumber > build.latestBuildNumber
    )
      return false
  }
  const locales = value.update.locales
  if (!isRecord(locales)) return false
  return ['vi', 'en'].every((locale) => {
    const content = locales[locale]
    return (
      isRecord(content) &&
      typeof content.title === 'string' &&
      !!content.title.trim() &&
      typeof content.message === 'string' &&
      !!content.message.trim() &&
      Array.isArray(content.releaseNotes) &&
      content.releaseNotes.length > 0 &&
      content.releaseNotes.every(
        (note: unknown) => typeof note === 'string' && !!note.trim(),
      )
    )
  })
}

export function configToDraft(config: AppConfig): AppConfigDraft {
  const copy = structuredClone(config)
  const build = (platform: Platform) => ({
    latestBuildNumber: String(copy.update[platform].latestBuildNumber),
    minSupportedBuildNumber: String(
      copy.update[platform].minSupportedBuildNumber,
    ),
  })
  return {
    ...copy,
    update: {
      android: build('android'),
      ios: build('ios'),
      locales: copy.update.locales,
    },
  }
}

export function draftToConfig(draft: AppConfigDraft): AppConfig | null {
  const build = (platform: Platform) => ({
    latestBuildNumber:
      draft.update[platform].latestBuildNumber.trim() === ''
        ? NaN
        : Number(draft.update[platform].latestBuildNumber),
    minSupportedBuildNumber:
      draft.update[platform].minSupportedBuildNumber.trim() === ''
        ? NaN
        : Number(draft.update[platform].minSupportedBuildNumber),
  })
  const result = {
    ...draft,
    update: {
      android: build('android'),
      ios: build('ios'),
      locales: structuredClone(draft.update.locales),
    },
  }
  return isAppConfig(result) ? result : null
}
