import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { forwardRef, ImgHTMLAttributes } from 'react'

import { cn } from '@/utils/utils'

type NativeImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>

type NextImgProps = Omit<NextImageProps, 'width' | 'objectFit' | 'objectPosition'>

export type ImageProps = NativeImgProps &
  NextImgProps & {
    /** src of image */
    src: string
    /** alt text for image */
    alt: string
    /** for setting width as tailwind class */
    width?: string
    /** aspect ratio of carousel as tailwind class  */
    ratio?: string
    /** object fit tailwind class */
    objectFit?:
      | 'object-cover'
      | 'object-contain'
      | 'object-fill'
      | 'object-none'
      | 'object-scale-down'
    /** object position tailwind class */
    objectPosition?:
      | 'object-center'
      | 'object-top'
      | 'object-bottom'
      | 'object-left'
      | 'object-right'
      | 'object-top-left'
      | 'object-bottom-right'
      | 'object-bottom-left'
      | 'object-top-right'
    /** sizes attribute for responsive image optimization */
    sizes?: string
  }

/** Next Image component with ratio wrap. Native ImgHTMLAttributes & ImageProps supported. */
export const Image = forwardRef<HTMLImageElement | null, ImageProps>(
  (
    {
      className,
      ratio = 'aspect-video',
      width = 'w-full',
      objectFit = 'object-contain',
      objectPosition = 'object-center',
      sizes = '100vw',
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn('ImageRatioWrap', 'relative max-h-full overflow-hidden', width, ratio)}
        data-testid="ImageRatioWrap"
      >
        <NextImage
          className={cn('bg-dark-950/25', objectFit, objectPosition, className)}
          sizes={sizes}
          fill
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)

Image.displayName = 'Image'
