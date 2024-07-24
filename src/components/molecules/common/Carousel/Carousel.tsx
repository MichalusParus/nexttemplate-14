'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, PropsWithChildren, useCallback, useImperativeHandle, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import RatioWrap from '@/components/atoms/containers/RatioWrap'
import { RatioWrapProps } from '@/components/atoms/containers/RatioWrap/RatioWrap'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import { useTouch } from '@/utils/hooks/useTouch'
import { cn, filterOutKeys } from '@/utils/utils'

import { arrowClass, controlClass, dottWrapClass, innerWrapClass } from './Carousel.style'

export type CarouselProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** children length */
  pages: number
  /** for setting width than default value as tailwind class */
  width?: string
  /** number in procents for ratio between height and width  */
  ratio: number
  /** for passing aditional props to ratio wrap */
  ratioWrapProps?: Partial<RatioWrapProps>
}

/** Carousel component can display multiple panels or images controled by arrows and dotts. RatioWrapProps supported. USE CLIENT */
export const Carousel = forwardRef<HTMLDivElement, PropsWithChildren<CarouselProps>>(
  ({ className = '', pages, width = '100%', ratio, ratioWrapProps = {}, children }, ref) => {
    const t = useTranslations('Components')
    const [currentPage, setCurrentPage] = useState(1)

    const handleSwipe = useCallback(
      (value: { x: number; y: number }) => {
        if (value.x > 0 && Math.abs(value.x) > 30) {
          setCurrentPage(prev => (prev === 1 ? pages : prev - 1))
        } else if (value.x < 0 && Math.abs(value.x) > 30) {
          setCurrentPage(prev => (prev === pages ? 1 : prev + 1))
        }
      },
      [pages],
    )

    const { componentRef } = useTouch(handleSwipe)
    useImperativeHandle(ref, () => componentRef.current!)

    const getSelectedDott = (index: number) => {
      return currentPage === index + 1 ? 'selected [&>div]:scale-150' : ''
    }

    return (
      <div
        className={cn('Carousel', 'relative overflow-hidden', className)}
        ref={componentRef}
        data-testid="Carousel"
      >
        <RatioWrap
          className={cn('bg-dark-400', ratioWrapProps.className)}
          ratio={ratio}
          width={width}
          {...filterOutKeys(ratioWrapProps, ['className'])}
        >
          <div
            className={cn('CarouselInnerWrap', innerWrapClass)}
            style={{
              width: `calc(100% * ${pages})`,
              marginLeft: `calc(-100% * ${currentPage - 1})`,
            }}
          >
            {children}
          </div>
        </RatioWrap>
        <Button
          className={cn('left-0', arrowClass, controlClass)}
          color="none"
          size="none"
          startIcon={<ChevronIcon className={'h-10 w-10 rotate-90'} />}
          hideShadow
          aria-label={t('previousPage', { page: currentPage === 1 ? pages : currentPage - 1 })}
          onClick={() => setCurrentPage(prev => (prev === 1 ? pages : prev - 1))}
        />
        <Button
          className={cn('right-0', arrowClass, controlClass)}
          color="none"
          size="none"
          startIcon={<ChevronIcon className={'h-10 w-10 -rotate-90'} />}
          hideShadow
          aria-label={t('nextPage', { page: currentPage === pages ? 1 : currentPage + 1 })}
          onClick={() => setCurrentPage(prev => (prev === pages ? 1 : prev + 1))}
        />
        <div className={cn('DottWrap', dottWrapClass)}>
          {new Array(pages).fill(null).map((_, index) => (
            <Button
              key={`carouselDott${index}`}
              className={cn('CarouselDott', 'p-1.5', controlClass, getSelectedDott(index))}
              color="none"
              size="none"
              hideShadow
              aria-label={t('page', { page: index + 1 })}
              onClick={() => setCurrentPage(index + 1)}
            >
              <div className="rounded-full bg-current p-1" />
            </Button>
          ))}
        </div>
      </div>
    )
  },
)

Carousel.displayName = 'Carousel'
