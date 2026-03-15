/**
 * Check if a target element is contained by any of the provided container elements.
 * Used by dismiss hooks for outside-click and focus-out detection.
 */
export const isInside = (
  target: HTMLElement | Node | null,
  containers: (HTMLElement | null | undefined)[],
): boolean => {
  if (!target) return false
  return containers.some((container) => container?.contains(target))
}
