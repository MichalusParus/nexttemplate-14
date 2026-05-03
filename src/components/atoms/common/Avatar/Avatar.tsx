'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useState } from 'react'

import { baseVariant, childrenIconSize, textVariant } from '@/components/utils/common.style'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { ProfileIcon } from '../../icons'
import { Image } from '../Image'
import { avatarClass, avatarSize, hueVariantClass } from './Avatar.style'
import { getHueStyle } from './utils'

export type AvatarProps = NativeDivProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** source for profile picture, without src displays user initials  */
    src?: string
    /** username for avatar initials, without username displays profile icon  */
    username?: string
    /** oklch hue angle (0-360) — overrides color prop with dynamic oklch color */
    hue?: number
  }

/** Avatar component for displaying user initials. By default shows profile icon. Native HTMLAttributes props supported. USE CLIENT */
export const Avatar = forwardRef<HTMLDivElement | null, AvatarProps>(
  (
    {
      className,
      src,
      username,
      hue,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      style,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const [imgError, setImgError] = useState(false)
    const userInitials = username
      ?.split(' ')
      .filter(name => name)
      .reduce<string[]>((initials, name, index, arr) => {
        if (arr.length === 1 || index === 0 || index === arr.length - 1) {
          initials.push(name.charAt(0).toUpperCase())
        }
        return initials
      }, [])
      .join('')

    const renderAvatarContent = () => {
      if (src && !imgError) {
        return (
          <Image
            className="min-h-full min-w-full"
            src={src}
            alt={username ? `${t('profile')} ${username}` : t('profile')}
            ratio="aspect-square"
            objectFit="object-cover"
            onError={() => setImgError(true)}
          />
        )
      } else if (userInitials) {
        return (
          <>
            <span className="sr-only">{`${t('initials')} ${userInitials}`}</span>
            <span aria-hidden="true">{userInitials}</span>
          </>
        )
      } else {
        return (
          <div className={childrenIconSize[size]} role="img" aria-label={t('profile')}>
            <ProfileIcon aria-hidden="true" />
          </div>
        )
      }
    }

    const useHue = hue !== undefined
    const hueStyle = useHue ? getHueStyle(variant, hue) : undefined

    return (
      <div
        className={cn(
          'Avatar',
          avatarClass,
          useHue
            ? hueVariantClass[variant]
            : [baseVariant[variant][color], textVariant[variant][color]],
          avatarSize[size],
          className,
        )}
        ref={ref}
        data-testid="Avatar"
        style={useHue ? { ...hueStyle, ...style } : style}
        {...rest}
      >
        {renderAvatarContent()}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
