'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useId, useMemo, useState } from 'react'

import { Image } from '@/components/atoms/common/Image'
import { Paper, PaperProps } from '@/components/atoms/containers/Paper'
import { focusWithinVariant } from '@/components/utils/common.style'
import { devWarning } from '@/components/utils/devWarning'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Carousel, CarouselItemType, CarouselProps } from '../../../molecules/common/Carousel'
import { ImageViewer, ImageViewerProps } from '../../../molecules/popovers/ImageViewer'
import { GalleryControls, GalleryItemType } from './GalleryControls'

export type GalleryProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** list of images data for displaying. */
  items: GalleryItemType[]
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
  carouselProps?: Omit<Partial<CarouselProps>, 'items' | 'children' | 'pagesCount'>
}

/** Gallery component can display multiple images with autoplay and image controll. RatioWrapProps supported. USE CLIENT */
export const Gallery = forwardRef<HTMLDivElement | null, GalleryProps>(
  (
    {
      className,
      items,
      label,
      width = 'w-full',
      ratio = 'aspect-video',
      variant = 'outlined',
      color = 'primary',
      paperProps = {},
      imageViewerProps = {},
      carouselProps = {},
    },
    ref,
  ) => {
    devWarning(
      items.length === 0,
      'Gallery: `items` array is empty. Gallery will render with no images.',
    )
    const t = useTranslations('Components')
    const id = useId().replace(/:/g, '')
    const controlsPortalId = `${id}-galleryControlWrap`
    const imageViewerId = `${id}-imageViewer`
    const [isOpen, setIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const { className: paperClassName, ...restPaperProps } = paperProps
    const { className: carouselClassName, ...restCarouselProps } = carouselProps
    const carouselItems: CarouselItemType[] = useMemo(
      () =>
        items.map(item => ({
          label: item.label,
          content: <Image className="bg-transparent" src={item.src} alt={item.label} />,
          carouselItemProps: {
            className: 'flex items-center justify-center',
            ...item.carouselItemProps,
          },
        })),
      [items],
    )

    return (
      <Paper
        className={cn(
          'Gallery',
          'overflow-hidden focus-within:ring',
          focusWithinVariant[variant][color],
          width,
          paperClassName,
          className,
        )}
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
                isOpen && '[&>.CarouselRatioWrap]:max-h-gallery-inner-height',
                carouselClassName,
              )}
              items={carouselItems}
              currentPage={currentPage}
              ratio={isOpen ? 'aspect-video' : ratio}
              autoplay="paused"
              hideControlDots
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
            />
          </ImageViewer>
        </div>
      </Paper>
    )
  },
)

Gallery.displayName = 'Gallery'
