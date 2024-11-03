'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ChevronIcon, PauseIcon } from '@/components/atoms/icons'
import { useSwipe } from '@/utils/hooks/useSwipe'
import { cn } from '@/utils/utils'

import { arrowClass, controlClass, dottWrapClass, innerWrapClass } from './Carousel.style'

export type GalleryItem = {
  src: string
  alt: string
}

export type CarouselProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** children length */
  pages: number
  /** for setting width as tailwind class */
  width?: string
  /** aspect ratio of carousel as tailwind class  */
  ratio?: string
  /** optional current page for external control. */
  currentPage?: number
  /** optional boolean for autoplay */
  autoplay?: { interval: number }
  /** optional boolean for hiding carousel arrows. */
  hideArrows?: boolean
  /** optional boolean for hiding carousel control dotts. */
  hideControlDotts?: boolean
  /** optional set current page fn for external control. */
  setCurrentPage?: (page: number) => void
}

export const CarouselItem = ({ children }: PropsWithChildren) => {
  return (
    <div className={cn('CarouselItem', 'h-full w-full')} role="group" aria-roledescription="slide">
      {children}
    </div>
  )
}

/** Carousel component can display multiple panels or images controled by arrows and dotts. Children must have 100% width. USE CLIENT */
export const Carousel = forwardRef<HTMLDivElement, PropsWithChildren<CarouselProps>>(
  (
    {
      className,
      pages,
      width = 'w-full',
      ratio = 'aspect-w-16 aspect-h-9',
      currentPage = 1,
      autoplay,
      hideArrows,
      hideControlDotts,
      children,
      setCurrentPage,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage)
    const [isPaused, setIsPaused] = useState(false)
    const selectedPage = currentPage && setCurrentPage ? currentPage : localCurrentPage

    const handlePageChange = useCallback(
      (page: number, stop: boolean = false) => {
        if (setCurrentPage) {
          setCurrentPage(page)
        } else {
          setLocalCurrentPage(page)
        }
        if (autoplay && !isPaused && stop) {
          setIsPaused(true)
        }
      },
      [autoplay, isPaused, setCurrentPage],
    )

    const handleSwipe = useCallback(
      (value: { x: number; y: number }) => {
        if (value.x > 0 && Math.abs(value.x) > 30) {
          handlePageChange(selectedPage === 1 ? pages : selectedPage - 1, true)
        } else if (value.x < 0 && Math.abs(value.x) > 30) {
          handlePageChange(selectedPage === pages ? 1 : selectedPage + 1, true)
        }
      },
      [pages, selectedPage, handlePageChange],
    )

    const { componentRef } = useSwipe(handleSwipe)
    useImperativeHandle(ref, () => componentRef.current!)

    const getSelectedDott = (index: number) => {
      return selectedPage === index + 1 ? 'selected [&>div]:scale-150' : ''
    }

    useEffect(() => {
      let sliderInterval: NodeJS.Timeout
      if (autoplay && !isPaused) {
        sliderInterval = setInterval(() => {
          handlePageChange(selectedPage === pages ? 1 : selectedPage + 1)
        }, autoplay.interval)
      }
      return () => {
        clearInterval(sliderInterval)
      }
    }, [selectedPage, autoplay, isPaused, pages, handlePageChange])

    return (
      <div
        className={cn('Carousel', 'relative flex items-center overflow-hidden', className)}
        ref={componentRef}
        role="region"
        aria-roledescription="carousel"
        data-testid="Carousel"
      >
        <div className={cn('CarouselRatioWrap', 'relative', width, ratio)}>
          <div
            className={cn('CarouselInnerWrap', innerWrapClass)}
            style={{
              width: `calc(100% * ${pages})`,
              marginLeft: `calc(-100% * ${selectedPage - 1})`,
            }}
          >
            {children}
          </div>
        </div>
        {!hideArrows && (
          <>
            <Button
              className={cn('left-4', arrowClass, controlClass)}
              color="none"
              size="none"
              startIcon={<ChevronIcon className={'h-10 w-10 rotate-90'} />}
              hideShadow
              aria-label={t('previousPage', {
                page: selectedPage === 1 ? pages : selectedPage - 1,
              })}
              onClick={() => handlePageChange(selectedPage === 1 ? pages : selectedPage - 1, true)}
            />
            <Button
              className={cn('right-4', arrowClass, controlClass)}
              color="none"
              size="none"
              startIcon={<ChevronIcon className={'h-10 w-10 -rotate-90'} />}
              hideShadow
              aria-label={t('nextPage', { page: selectedPage === pages ? 1 : selectedPage + 1 })}
              onClick={() => handlePageChange(selectedPage === pages ? 1 : selectedPage + 1, true)}
            />
          </>
        )}
        {Boolean(autoplay) && (
          <Button
            className={cn('absolute bottom-0 left-0 rounded-md bg-dark-950/25', controlClass)}
            color="none"
            size="none"
            startIcon={
              isPaused ? (
                <ChevronIcon className="-rotate-90 fill-current [&_path]:stroke-transparent" />
              ) : (
                <PauseIcon className="m-0.5 h-5 w-5 fill-current" />
              )
            }
            hideShadow
            aria-label={t(isPaused ? 'play' : 'pause')}
            onClick={() => setIsPaused(prev => !prev)}
          />
        )}
        {!hideControlDotts && (
          <div className={cn('DottWrap', dottWrapClass)}>
            {new Array(pages).fill(null).map((_, index) => (
              <Button
                key={`ControlDott${index}`}
                className={cn('ControlDott', 'p-1.5', controlClass, getSelectedDott(index))}
                color="none"
                size="none"
                hideShadow
                aria-label={t('page', { page: index + 1 })}
                onClick={() => handlePageChange(index + 1, true)}
              >
                <div className={cn('Dott', 'rounded-full bg-current p-1')} />
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  },
)

Carousel.displayName = 'Carousel'
