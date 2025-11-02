'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useId, useState } from 'react'

import { Image } from '@/components/atoms/common/Image'
import { Paper, PaperProps } from '@/components/atoms/containers/Paper'
import { Span } from '@/components/atoms/typography/Span'
import { StyleProps } from '@/components/utils/types'
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
  /** optional custom message for empty state */
  noItemsLabel?: string
  /** for passing aditional props to paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to imageViewer */
  imageViewerProps?: Partial<ImageViewerProps>
  /** for passing aditional props to carousel */
  carouselProps?: Partial<CarouselProps>
}

/** Gallery component can display multiple images with autoplay and image controll. RatioWrapProps supported. USE CLIENT */
export const Gallery = forwardRef<HTMLDivElement | null, GalleryProps>(
  (
    {
      className,
      items,
      label,
      variant = 'outlined',
      color = 'primary',
      width = 'w-full',
      ratio = 'aspect-video',
      noItemsLabel,
      paperProps = {},
      imageViewerProps = {},
      carouselProps = {},
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const id = useId().replace(/:/g, '')
    const controlsPortalId = `${id}-galleryControlWrap`
    const imageViewerId = `${id}-imageViewer`
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
        <div className="group relative" id={controlsPortalId}>
          <ImageViewer
            className="rounded-none"
            name={imageViewerId}
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
              pages={items.length || 1}
              currentPage={currentPage}
              width={width}
              ratio={isOpen ? 'aspect-video' : ratio}
              autoplay="paused"
              hideControlDotts
              setCurrentPage={setCurrentPage}
              customControls={
                <GalleryControls
                  items={items}
                  isOpen={isOpen}
                  currentPage={currentPage}
                  variant={variant}
                  setCurrentPage={setCurrentPage}
                />
              }
              portalTargetId={isOpen ? imageViewerId : controlsPortalId}
              {...restCarouselProps}
            >
              {items && items.length ? (
                items.map((item, index) => (
                  <CarouselItem
                    key={`${item.src}-${index}`}
                    className="flex items-center justify-center"
                    selectedPage={currentPage}
                    pages={items.length}
                    aria-label={`${index + 1} / ${items.length}: ${item.alt}`}
                    aria-current={currentPage === index + 1 ? 'true' : undefined}
                  >
                    <Image className="bg-transparent" src={item.src} alt={item.alt} />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem
                  className="flex items-center justify-center"
                  aria-label={noItemsLabel || t('noOptions')}
                  aria-current={'true'}
                >
                  <Span variant="none" color="none">
                    {noItemsLabel || t('noOptions')}
                  </Span>
                </CarouselItem>
              )}
            </Carousel>
          </ImageViewer>
        </div>
      </Paper>
    )
  },
)

Gallery.displayName = 'Gallery'
