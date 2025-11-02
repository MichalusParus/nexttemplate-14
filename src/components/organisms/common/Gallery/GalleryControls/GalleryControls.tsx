'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { Image } from '@/components/atoms/common/Image'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { controlButtonClass, controlButtonVariant } from './GalleryControls.style'

export type GalleryControlsItem = {
  src: string
  alt: string
}

export type GalleryControlsProps = Pick<StyleProps, 'variant'> & {
  /** list of images data for displaying. */
  items: GalleryControlsItem[]
  /** boolean for Open Gallery */
  isOpen?: boolean
  /** for setting width as tailwind class */
  currentPage: number
  /** for passing setCurrentPage function */
  setCurrentPage: (value: number) => void
}

/** GalleryControls component can display multiple panels or images controled by arrows and dotts. RatioWrapProps supported. USE CLIENT */
export const GalleryControls = ({
  items,
  currentPage,
  isOpen,
  variant = 'outlined',
  setCurrentPage,
}: GalleryControlsProps) => {
  const t = useTranslations('Components')
  const galleryControlsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const selectedTab = galleryControlsRef?.current?.querySelector('.selected')
    selectedTab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [currentPage])

  return (
    <div
      className={cn('GalleryControlsControlItemsWrap', 'w-full shrink-0')}
      data-testid="GalleryControls"
    >
      <ScrollShadow>
        <div
          className="left-0 flex h-24 w-max items-center justify-start gap-1.5"
          ref={galleryControlsRef}
        >
          {items.map((item, index) => (
            <Button
              key={`GalleryControlItem${index}`}
              className={cn(
                'GalleryControlButton',
                currentPage === index + 1 && 'selected',
                controlButtonClass,
                controlButtonVariant[isOpen ? 'contained' : variant],
              )}
              color="none"
              size="none"
              hideShadow
              tabIndex={0}
              aria-label={t('page', { page: index + 1 })}
              onClick={e => {
                e?.stopPropagation()
                setCurrentPage(index + 1)
              }}
              data-testid="GalleryControlButton"
            >
              <Image src={item.src} alt={item.alt} ratio="aspect-video" />
            </Button>
          ))}
        </div>
      </ScrollShadow>
    </div>
  )
}

GalleryControls.displayName = 'GalleryControls'
