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
      | 'object-left-top'
      | 'object-right-bottom'
      | 'object-left-bottom'
      | 'object-right-top'
    /** rounded tailwind class */
    rounded?: string
  }

/** Next Image component with ratio wrap. Default ImgHTMLAttributes & ImageProps supported. */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      ratio = 'aspect-w-16 aspect-h-9',
      width = 'w-full',
      objectFit = 'object-contain',
      objectPosition = 'object-center',
      rounded = 'rounded-md',
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'ImageRatioWrap',
          'relative overflow-hidden bg-dark-950/25',
          width,
          ratio,
          rounded,
          className,
        )}
      >
        <NextImage
          className={cn(objectFit, objectPosition, className)}
          sizes="100%"
          fill
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)

Image.displayName = 'Image'
