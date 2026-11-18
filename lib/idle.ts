/**
 * Run `fn` when the main thread is idle (or after `timeout` ms at the latest), so scroll
 * animations for below-the-fold sections never compete with first paint and hydration.
 * Returns a cancel function. Falls back to setTimeout where requestIdleCallback is missing
 * (Safari).
 */
export function onIdle(fn: () => void, timeout = 1200): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(fn, 200)
  return () => window.clearTimeout(id)
}
