import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { forwardRef, ImgHTMLAttributes } from 'react'

import { cn } from '@/utils/utils'

import { RatioWrap, RatioWrapProps } from '../../containers/RatioWrap/RatioWrap'

export type ImageProps = RatioWrapProps &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> &
  Omit<NextImageProps, 'width' | 'objectFit' | 'objectPosition'> & {
    /** src of image */
    src: string
    /** alt text for image */
    alt: string
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
      className = '',
      ratio,
      width = '100%',
      objectFit = 'object-contain',
      objectPosition = 'object-center',
      rounded = 'rounded-md',
      ...rest
    },
    ref,
  ) => {
    return (
      <RatioWrap className={`overflow-hidden bg-overlay ${rounded}`} width={width} ratio={ratio}>
        <NextImage
          className={cn(objectFit, objectPosition, className)}
          sizes="100%"
          fill
          ref={ref}
          {...rest}
        />
      </RatioWrap>
    )
  },
)

Image.displayName = 'Image'
