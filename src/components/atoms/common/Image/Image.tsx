import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { forwardRef, ImgHTMLAttributes } from 'react'

import { RatioWrap, RatioWrapProps } from '../../containers/RatioWrap/RatioWrap'
import Ghost from '../../loaders/Ghost'

export type ImageProps = RatioWrapProps &
  ImgHTMLAttributes<HTMLImageElement> &
  Omit<NextImageProps, 'width'> & {
    /** rounded tailwind class */
    rounded?: string
  }

/** Next Image component with ratio wrap and client side loading ghost. Default ImgHTMLAttributes & ImageProps supported. */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className = '', ratio, width = '100%', rounded = 'rounded-md', ...rest }, ref) => {
    return (
      <RatioWrap width={width} ratio={ratio}>
        <div className="absolute top-0 h-full w-full">
          <Ghost className="h-full w-full" />
        </div>
        <NextImage className={`${className} ${rounded}`} sizes="100%" fill ref={ref} {...rest} />
      </RatioWrap>
    )
  },
)

Image.displayName = 'Image'
