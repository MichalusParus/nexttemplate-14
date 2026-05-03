import { useCallback, useEffect, useRef, useState } from 'react'

const FADE_DISTANCE = 48

export const useScrollShadow = (disableHorizontal?: boolean) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const shadowRefs = useRef<Record<string, HTMLDivElement | null>>({
    top: null,
    bottom: null,
    left: null,
    right: null,
  })
  const [overflow, setOverflow] = useState({ vertical: false, horizontal: false })

  const checkOverflow = useCallback(() => {
    const el = contentRef.current
    if (!el) return

    const vertical = el.scrollHeight > el.clientHeight
    const horizontal = !disableHorizontal && el.scrollWidth > el.clientWidth

    setOverflow(prev =>
      prev.vertical === vertical && prev.horizontal === horizontal
        ? prev
        : { vertical, horizontal },
    )
  }, [disableHorizontal])

  const updateShadows = useCallback(() => {
    const el = contentRef.current
    if (!el) return

    const maxY = el.scrollHeight - el.clientHeight
    const maxX = el.scrollWidth - el.clientWidth

    const top = maxY > 0 ? Math.min(el.scrollTop / FADE_DISTANCE, 1) : 0
    const bottom = maxY > 0 ? Math.min((maxY - el.scrollTop) / FADE_DISTANCE, 1) : 0
    const left = maxX > 0 ? Math.min(el.scrollLeft / FADE_DISTANCE, 1) : 0
    const right = maxX > 0 ? Math.min((maxX - el.scrollLeft) / FADE_DISTANCE, 1) : 0

    if (shadowRefs.current.top) shadowRefs.current.top.style.opacity = String(top)
    if (shadowRefs.current.bottom) shadowRefs.current.bottom.style.opacity = String(bottom)
    if (shadowRefs.current.left) shadowRefs.current.left.style.opacity = String(left)
    if (shadowRefs.current.right) shadowRefs.current.right.style.opacity = String(right)
  }, [])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    checkOverflow()
    updateShadows()

    const observer = new ResizeObserver(() => {
      checkOverflow()
      updateShadows()
    })
    observer.observe(el)
    if (el.firstElementChild) observer.observe(el.firstElementChild)

    const mutationObserver = new MutationObserver(() => {
      checkOverflow()
      updateShadows()
    })
    mutationObserver.observe(el, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [checkOverflow, updateShadows])

  useEffect(() => {
    updateShadows()
  }, [overflow, updateShadows])

  const handleScroll = useCallback(() => {
    updateShadows()
  }, [updateShadows])

  const setTopShadowRef = useCallback((el: HTMLDivElement | null) => {
    shadowRefs.current.top = el
  }, [])
  const setBottomShadowRef = useCallback((el: HTMLDivElement | null) => {
    shadowRefs.current.bottom = el
  }, [])
  const setLeftShadowRef = useCallback((el: HTMLDivElement | null) => {
    shadowRefs.current.left = el
  }, [])
  const setRightShadowRef = useCallback((el: HTMLDivElement | null) => {
    shadowRefs.current.right = el
  }, [])

  return {
    contentRef,
    setTopShadowRef,
    setBottomShadowRef,
    setLeftShadowRef,
    setRightShadowRef,
    overflow,
    handleScroll,
  }
}
