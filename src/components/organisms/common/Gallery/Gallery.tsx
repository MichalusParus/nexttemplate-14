'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useId, useRef, useState } from 'react'

import { Image } from '@/components/atoms/common/Image'
import { Paper, PaperProps } from '@/components/atoms/containers/Paper'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Carousel, CarouselProps } from '../../../molecules/common/Carousel'
import { CarouselItem } from '../../../molecules/common/Carousel/CarouselItem'
import { ImageViewer, ImageViewerProps } from '../../../molecules/popovers/ImageViewer'
import { GalleryControls } from './GalleryControls'

export type GalleryItem = {
  src: string
  alt: string
}

export type GalleryProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** list of images data for displaying. */
  items: GalleryItem[]
  /** optional label of component */
  label?: string
  /** for setting width as tailwind class */
  width?: string
  /** aspect ratio for Carousel in closed state as tailwind class  */
  ratio: string
  /** for passing aditional props to paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to imageViewer */
  imageViewerProps?: Partial<ImageViewerProps>
  /** for passing aditional props to carousel */
  carouselProps?: Partial<CarouselProps>
}

/** Gallery component can display multiple images with autoplay and image controll. RatioWrapProps supported. USE CLIENT */
export const Gallery = forwardRef<HTMLDivElement, GalleryProps>(
  (
    {
      className,
      items,
      label,
      variant = 'outlined',
      color = 'primary',
      width = 'w-full',
      ratio = 'aspect-video',
      paperProps = {},
      imageViewerProps = {},
      carouselProps = {},
    },
    ref,
  ) => {
    const id = useId()
    const t = useTranslations('Components')
    const testRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const { className: paperClassName, ...restPaperProps } = paperProps
    const { className: carouselClassName, ...restCarouselProps } = carouselProps

    return (
      <Paper
        className={cn('Gallery', 'overflow-hidden', paperClassName, className)}
        variant={variant}
        color={color}
        padding="p-0"
        hideShadow
        aria-label={label || t('gallery')}
        ref={ref}
        {...restPaperProps}
      >
        <ImageViewer
          className="rounded-none"
          name={'Gallery-' + id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          {...imageViewerProps}
        >
          <Carousel
            className={cn(
              'GalleryCarousel',
              'h-full w-full',
              isOpen && '[&>.CarouselRatioWrap]:max-h-galleryInnerHeight',
              carouselClassName,
            )}
            pages={items.length}
            currentPage={currentPage}
            width={width}
            ratio={isOpen ? 'aspect-video' : ratio}
            autoplay
            autoplayStopped
            hideControlDotts
            setCurrentPage={setCurrentPage}
            ref={testRef}
            {...restCarouselProps}
          >
            {items.map(item => (
              <CarouselItem key={item.alt} className="flex items-center justify-center">
                <Image className="bg-transparent" src={item.src} alt={item.alt} />
              </CarouselItem>
            ))}
          </Carousel>
          <GalleryControls
            items={items}
            isOpen={isOpen}
            currentPage={currentPage}
            variant={variant}
            setCurrentPage={setCurrentPage}
          />
        </ImageViewer>
      </Paper>
    )
  },
)

Gallery.displayName = 'Gallery'
