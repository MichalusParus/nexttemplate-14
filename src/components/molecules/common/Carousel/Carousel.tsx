'use client'
import { useTranslations } from 'next-intl'
import {
  Children,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { useTouch } from '@/utils/hooks/useTouch'
import { cn } from '@/utils/utils'

import { innerWrapClass } from './Carousel.style'
import { CarouselControls, CarouselControlsProps } from './CarouselControls/CarouselControls'
import { CarouselItem, CarouselItemProps } from './CarouselItem'

export type CarouselItemType = {
  label: string
  content: ReactNode
  carouselItemProps?: Partial<CarouselItemProps>
}

export type CarouselProps = Omit<
  CarouselControlsProps,
  'selectedPage' | 'isPaused' | 'setIsPaused' | 'onPageChange' | 'pages'
> & {
  /** for passing custom tailwind classes */
  className?: string
  /** optional array of items for render CarouselItems. If passes by children, pagesCount prop is required. */
  items?: CarouselItemType[]
  /** optional pages count. Auto-calculated from items.length if items provided. Required only when using manual children without items. */
  pagesCount?: number
  /** optional label of component */
  label?: string
  /** for setting width as tailwind class */
  width?: string
  /** aspect ratio of carousel as tailwind class  */
  ratio?: string
  /** optional current page for external control. */
  currentPage?: number
  /** optional custom message for empty state when no items provided */
  noItemsLabel?: string
  /** optional interval if autoplay is enabled */
  autoplayInterval?: number
  /** optional set current page fn for external control. */
  setCurrentPage?: (page: number) => void
  /** optional callback fired when the active page changes (works in both controlled and uncontrolled modes) */
  onPageChange?: (page: number) => void
}

/** Carousel component can display multiple panels or images controlled by arrows and dots. Supports items array and/or manual children with pages prop. USE CLIENT */
export const Carousel = forwardRef<HTMLDivElement | null, PropsWithChildren<CarouselProps>>(
  (
    {
      className,
      label,
      items,
      pagesCount,
      width = 'w-full',
      ratio = 'aspect-video',
      currentPage = 1,
      noItemsLabel,
      autoplay = 'off',
      autoplayInterval = 3000,
      hideArrows,
      hideControlDots,
      children,
      setCurrentPage,
      onPageChange,
      customControls,
      portalTargetId,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const totalPages = pagesCount || items?.length || 1
    const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage)
    const [isPaused, setIsPaused] = useState(autoplay === 'paused')
    const selectedPage = setCurrentPage ? currentPage : internalCurrentPage

    const handlePageChange = useCallback(
      (page: number, shouldPause: boolean = false) => {
        if (setCurrentPage) {
          setCurrentPage(page)
        } else {
          setInternalCurrentPage(page)
        }
        if (autoplay !== 'off' && shouldPause) {
          setIsPaused(true)
        }
        onPageChange?.(page)
      },
      [autoplay, setCurrentPage, onPageChange],
    )

    const handleSwipe = useCallback(
      (value: { x: number; y: number }) => {
        if (value.x > 0 && Math.abs(value.x) > 30 && Math.abs(value.y) < 30) {
          handlePageChange(selectedPage === 1 ? totalPages : selectedPage - 1, true)
        } else if (value.x < 0 && Math.abs(value.x) > 30 && Math.abs(value.y) < 30) {
          handlePageChange(selectedPage === totalPages ? 1 : selectedPage + 1, true)
        }
      },
      [totalPages, selectedPage, handlePageChange],
    )

    const { componentRef } = useTouch({ onSwipe: handleSwipe })
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )

    useEffect(() => {
      let sliderInterval: ReturnType<typeof setInterval>
      if (autoplay !== 'off' && !isPaused) {
        sliderInterval = setInterval(() => {
          handlePageChange(selectedPage === totalPages ? 1 : selectedPage + 1)
        }, autoplayInterval)
      }
      return () => {
        clearInterval(sliderInterval)
      }
    }, [selectedPage, autoplay, isPaused, totalPages, autoplayInterval, handlePageChange])

    return (
      <div
        className={cn('Carousel', 'group relative flex items-center overflow-hidden', width, className)}
        ref={componentRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label || t('carousel')}
        data-testid="Carousel"
      >
        <div
          className={cn('CarouselRatioWrap', 'relative w-full', ratio)}
          data-testid="CarouselRatioWrap"
        >
          <div
            className={cn('CarouselInnerWrap', 'max-h-full', innerWrapClass)}
            style={{
              width: `calc(100% * ${totalPages})`,
              marginLeft: `calc(-100% * ${selectedPage - 1})`,
            }}
            data-testid="CarouselInnerWrap"
          >
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <CarouselItem
                  key={`${item.label}-${index}`}
                  className="flex items-center justify-center"
                  isActive={index + 1 === selectedPage}
                  aria-label={`${index + 1} / ${totalPages}: ${item.label}`}
                  aria-current={selectedPage === index + 1 ? 'true' : undefined}
                  {...item.carouselItemProps}
                >
                  {item.content}
                </CarouselItem>
              ))}
            {children}
            {!items?.length && Children.count(children) === 0 && (
              <CarouselItem
                className="flex items-center justify-center"
                aria-label={noItemsLabel || t('noOptions')}
                aria-current="true"
              >
                <span className="text-muted-foreground">{noItemsLabel || t('noOptions')}</span>
              </CarouselItem>
            )}
          </div>
        </div>
        <CarouselControls
          selectedPage={selectedPage}
          pages={totalPages}
          autoplay={autoplay}
          isPaused={isPaused}
          hideArrows={hideArrows}
          hideControlDots={hideControlDots}
          setIsPaused={setIsPaused}
          onPageChange={handlePageChange}
          customControls={customControls}
          portalTargetId={portalTargetId}
        />
      </div>
    )
  },
)

Carousel.displayName = 'Carousel'
