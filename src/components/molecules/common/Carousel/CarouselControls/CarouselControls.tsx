'use client'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { ChevronIcon, PauseIcon } from '@/components/atoms/icons'
import { cn } from '@/utils/utils'

import { arrowClass, controlClass, dottWrapClass } from './CarouselControls.style'

export type CarouselControlsProps = {
  /** selected page */
  selectedPage: number
  /** pages length */
  pages: number
  /** optional boolean for autoplay */
  autoplay?: boolean
  /** is paused state */
  isPaused?: boolean
  /** optional boolean for hiding carousel arrows. */
  hideArrows?: boolean
  /** optional boolean for hiding carousel control dotts. */
  hideControlDotts?: boolean
  /** set isPaused state */
  setIsPaused: (value: boolean) => void
  /** onPageChange fn */
  onPageChange: (value: number, stop: boolean) => void
}

/** CarouselControls for Carousel. USE CLIENT */
export const CarouselControls = ({
  selectedPage,
  pages,
  autoplay,
  isPaused,
  hideArrows,
  hideControlDotts,
  setIsPaused,
  onPageChange,
}: CarouselControlsProps) => {
  const t = useTranslations('Components')

  return (
    <>
      {!hideArrows && (
        <>
          <Button
            className={cn('PreviousButton', 'left-0', arrowClass, controlClass)}
            color="none"
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
            className={cn('NextButton', 'right-0', arrowClass, controlClass)}
            color="none"
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
      {Boolean(autoplay) && (
        <Button
          className={cn(
            'AutoplayButton',
            'absolute left-0 top-0 rounded-md bg-dark-950/25 opacity-0 focus-visible:opacity-100 group-hover:opacity-100',
            controlClass,
          )}
          color="none"
          size="none"
          startIcon={
            isPaused ? (
              <ChevronIcon
                className="h-8 w-8 -rotate-90 fill-current [&_path]:stroke-transparent"
                data-testid="PlayIcon"
              />
            ) : (
              <PauseIcon className="h-8 w-8 fill-current" data-testid="PauseIcon" />
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
      {!hideControlDotts && (
        <div className={cn('DottWrap', dottWrapClass)} data-testid="DottWrap">
          {Array.from({ length: pages }, (_, index) => (
            <Button
              key={`ControlDott${index}`}
              className={cn(
                'ControlDott',
                'p-1.5',
                selectedPage === index + 1 && 'selected [&>div]:scale-150',
                controlClass,
              )}
              color="none"
              size="none"
              hideShadow
              aria-label={t('page', { page: index + 1 })}
              onClick={() => {
                onPageChange(index + 1, true)
              }}
              data-testid={`Dott${index}Button`}
            >
              <div className={cn('Dott', 'rounded-full bg-current p-1')} />
            </Button>
          ))}
        </div>
      )}
    </>
  )
}

CarouselControls.displayName = 'CarouselControls'
