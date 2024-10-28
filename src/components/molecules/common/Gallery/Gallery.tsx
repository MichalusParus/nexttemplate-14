'use client'
import NextImage from 'next/image'
import { useTranslations } from 'next-intl'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { Image } from '@/components/atoms/common/Image'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { cn } from '@/utils/utils'

import { ImageViewer } from '../../popovers/ImageViewer'
import { Carousel } from '../Carousel'
import { GalleryItem } from '../Carousel/Carousel'

export type GalleryProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name of component for aria purposes */
  name: string
  /** list of images data for displaying. */
  items: GalleryItem[]
  /** for setting width as tailwind class */
  width?: string
  /** aspect ratio of Gallery as tailwind aspect plugin class  */
  ratio: string
}

/** Gallery component can display multiple panels or images controled by arrows and dotts. RatioWrapProps supported. USE CLIENT */
export const Gallery = forwardRef<HTMLDivElement, GalleryProps>(
  ({ className, name, items, width = 'w-full', ratio = 'aspect-w-16 aspect-h-9' }, ref) => {
    const t = useTranslations('Components')
    const galleryControlsRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
      const selectedTab = galleryControlsRef?.current?.querySelector('.selected')
      selectedTab?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }, [currentPage])

    return (
      <ImageViewer className={cn('Gallery', className)} name={name} ref={ref}>
        <div className="max-h-[80vh] w-full">
          <Carousel
            className="max-h-full w-full"
            pages={items.length}
            currentPage={currentPage}
            width={width}
            ratio={ratio}
            hideControlDotts
            setCurrentPage={setCurrentPage}
          >
            {items.map(item => (
              <NextImage key={item.alt} src={item.src} alt={item.alt} fill />
            ))}
          </Carousel>
        </div>
        <div
          className={cn('GalleryControlItemsWrap', 'max-h-[20vh] w-full shrink-0')}
          ref={galleryControlsRef}
        >
          <ScrollShadow>
            <div className="left-0 flex w-max items-center justify-start gap-2 px-2 py-1">
              {items.map((item, index) => (
                <Button
                  key={`GalleryControlItem${index}`}
                  className={cn(
                    'Gallery',
                    'w-40 min-w-12 shrink-0 outline hover:outline-2 hover:outline-dark-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-dark-50',
                    currentPage === index + 1 &&
                      'selected outline-2 outline-dark-50 focus:outline-2 focus:outline-dark-50',
                  )}
                  color="none"
                  size="none"
                  hideShadow
                  aria-label={t('page', { page: index + 1 })}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  <Image src={item.src} alt={item.alt} />
                </Button>
              ))}
            </div>
          </ScrollShadow>
        </div>
      </ImageViewer>
    )
  },
)

Gallery.displayName = 'Gallery'
