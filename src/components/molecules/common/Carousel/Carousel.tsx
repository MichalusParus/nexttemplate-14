'use client'
import { forwardRef, PropsWithChildren, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import RatioWrap from '@/components/atoms/containers/RatioWrap'
import { RatioWrapProps } from '@/components/atoms/containers/RatioWrap/RatioWrap'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'

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
  ratioWrapProps?: RatioWrapProps
}

/** Carousel component can display multiple panels or images controled by arrows and dotts. RatioWrapProps supported. USE CLIENT */
export const Carousel = forwardRef<HTMLDivElement, PropsWithChildren<CarouselProps>>(
  ({ className = '', pages, width = '100%', ratio, ratioWrapProps, children }, ref) => {
    const [currentPage, setCurrentPage] = useState(1)

    const getSelectedDott = (index: number) => {
      return currentPage === index + 1 ? 'selected scale-150' : ''
    }

    return (
      <div
        className={`Carousel ${className} relative overflow-hidden`}
        ref={ref}
        data-testid="Carousel"
      >
        <RatioWrap className="bg-dark-400" ratio={ratio} width={width}>
          <div
            className={`CarouselInnerWrap ${innerWrapClass}`}
            style={{
              width: `calc(100% * ${pages})`,
              marginLeft: `calc(-100% * ${currentPage - 1})`,
            }}
            {...ratioWrapProps}
          >
            {children}
          </div>
        </RatioWrap>
        <Button
          className={`left-0 [&_.Arrow]:rotate-90 ${arrowClass} ${controlClass}`}
          color="none"
          size="none"
          startIcon={<ChevronIcon className={'Arrow'} />}
          aria-label="previous page"
          onClick={() => setCurrentPage(prev => (prev === 1 ? pages : prev - 1))}
        />
        <Button
          className={`right-0 [&_.Arrow]:-rotate-90 ${arrowClass} ${controlClass}`}
          color="none"
          size="none"
          startIcon={<ChevronIcon className={'Arrow'} />}
          aria-label="next page"
          onClick={() => setCurrentPage(prev => (prev === pages ? 1 : prev + 1))}
        />
        <div className={`DottWrap ${dottWrapClass}`}>
          {new Array(pages).fill(null).map((_, index) => (
            <Button
              key={`carouselDott${index}`}
              className={`CarouselDott p-1.5 ${controlClass} ${getSelectedDott(index)}`}
              color="none"
              size="none"
              hideShadow
              aria-label={`page ${index + 1}`}
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
