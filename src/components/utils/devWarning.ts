/** Logs a warning in development only. Tree-shaken from production builds. */
export const devWarning = (condition: boolean, message: string) => {
  if (process.env.NODE_ENV !== 'production' && condition) {
    console.warn(`[components] ${message}`)
  }
}
