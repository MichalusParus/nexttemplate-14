'use client'
import { useTranslations } from 'next-intl'
import React from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/atoms/common/Button'
import { ChevronIcon, PauseIcon } from '@/components/atoms/icons'
import { usePortalContainer } from '@/components/utils/hooks/usePortalContainer'
import { cn } from '@/utils/utils'

import { arrowClass, dotWrapClass } from './CarouselControls.style'

export type CarouselControlsProps = {
  /** selected page */
  selectedPage: number
  /** pages length */
  pages: number
  /** optional boolean for autoplay */
  autoplay?: 'on' | 'off' | 'paused'
  /** is paused state */
  isPaused: boolean
  /** optional boolean for hiding carousel arrows. */
  hideArrows?: boolean
  /** optional boolean for hiding carousel control dots. */
  hideControlDots?: boolean
  /** set isPaused state */
  setIsPaused: (value: boolean) => void
  /** onPageChange fn */
  onPageChange: (value: number, stop: boolean) => void
  /** optional custom controls to render inside carousel controls */
  customControls?: React.ReactNode
  /** optional portal target ID for displaying controls inside portal (for gallery purposes, nested buttons) */
  portalTargetId?: string
}

/** CarouselControls for Carousel. USE CLIENT */
export const CarouselControls = ({
  selectedPage,
  pages,
  autoplay = 'off',
  isPaused,
  hideArrows,
  hideControlDots,
  setIsPaused,
  onPageChange,
  customControls,
  portalTargetId,
}: CarouselControlsProps) => {
  const t = useTranslations('Components')
  const portalTarget = usePortalContainer(portalTargetId)

  const renderControls = (
    <>
      {!hideArrows && pages > 1 && (
        <>
          <Button
            className={cn('PreviousButton', 'left-0', arrowClass)}
            variant="contained"
            color="ghost"
            size="none"
            startIcon={<ChevronIcon className={'h-8 w-8 rotate-90'} />}
            hideShadow
            aria-label={t('previousPage', {
              page: selectedPage === 1 ? pages : selectedPage - 1,
            })}
            onClick={e => {
              e?.stopPropagation()
              onPageChange(selectedPage === 1 ? pages : selectedPage - 1, true)
            }}
            data-testid="PreviousButton"
          />
          <Button
            className={cn('NextButton', 'right-0', arrowClass)}
            variant="contained"
            color="ghost"
            size="none"
            startIcon={<ChevronIcon className={'h-8 w-8 -rotate-90'} />}
            hideShadow
            aria-label={t('nextPage', { page: selectedPage === pages ? 1 : selectedPage + 1 })}
            onClick={e => {
              e?.stopPropagation()
              onPageChange(selectedPage === pages ? 1 : selectedPage + 1, true)
            }}
            data-testid="NextButton"
          />
        </>
      )}
      {autoplay !== 'off' && pages > 1 && (
        <Button
          className={cn(
            'AutoplayButton',
            'absolute left-1/2 top-0 -translate-x-1/2 rounded-md opacity-0 focus-visible:opacity-100 group-hover:opacity-100',
          )}
          variant="contained"
          color="ghost"
          size="none"
          startIcon={
            isPaused ? (
              <ChevronIcon
                key="play"
                className="h-8 w-8 -rotate-90 fill-current [&_path]:stroke-transparent"
                data-testid="PlayIcon"
              />
            ) : (
              <PauseIcon key="pause" className="h-8 w-8 fill-current" data-testid="PauseIcon" />
            )
          }
          hideShadow
          aria-label={t(isPaused ? 'play' : 'pause')}
          onClick={e => {
            e?.stopPropagation()
            setIsPaused(!isPaused)
          }}
          data-testid="AutoplayButton"
        />
      )}
      {!hideControlDots && pages > 1 && (
        <div className={cn('DotWrap', dotWrapClass)} data-testid="DotWrap">
          {Array.from({ length: pages }, (_, index) => (
            <Button
              key={`ControlDot${index}`}
              className={cn(
                'ControlDot',
                'p-1.5',
                selectedPage === index + 1 && '[&>div]:scale-150',
              )}
              data-selected={selectedPage === index + 1 || undefined}
              variant="text"
              color="ghost"
              size="none"
              hideShadow
              tabIndex={-1}
              aria-current={selectedPage === index + 1 ? 'true' : undefined}
              aria-label={t('page', { page: index + 1 })}
              onClick={e => {
                e?.stopPropagation()
                onPageChange(index + 1, true)
              }}
              data-testid={`Dot${index}Button`}
            >
              <div className={cn('Dot', 'rounded-full bg-current p-1')} />
            </Button>
          ))}
        </div>
      )}
      {customControls}
    </>
  )

  if (portalTargetId && !portalTarget) {
    return null
  }

  if (portalTargetId && portalTarget) {
    return createPortal(renderControls, portalTarget)
  }

  return renderControls
}

CarouselControls.displayName = 'CarouselControls'
