function isLocalEnvironment(): boolean {
  if (typeof window === 'undefined') {
    return process.env.APP_ENV === 'local'
  }

  return document.documentElement.dataset.appEnv === 'local'
}

export const logger = {
  log(message: string, ...data: unknown[]) {
    if (isLocalEnvironment()) console.log(message, ...data)
  },
  info(message: string, ...data: unknown[]) {
    if (isLocalEnvironment()) console.info(message, ...data)
  },
  warn(message: string, ...data: unknown[]) {
    if (isLocalEnvironment()) console.warn(message, ...data)
  },
  error(message: string, ...data: unknown[]) {
    console.error(message, ...data)
  },
}
