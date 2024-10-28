import { useTranslations } from 'next-intl'
import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import ProfileIcon from '../../icons/ProfileIcon'
import Image from '../Image'
import { avatarClass, avatarSize, avatarVariant } from './Avatar.style'

type NativeAvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'>

export type AvatarProps = NativeAvatarProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** source for profile picture, without src displays user initials  */
    src?: string
    /** username for avatar initials, without username displays profile icon  */
    username?: string
  }

/** Avatar component for displaying user initials. By default shows profile icon. Default HTMLAttributes props supported. */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, src, username, variant = 'outlined', color = 'primary', size = 'md', ...rest },
    ref,
  ) => {
    const t = useTranslations('Components')
    const userInitials = username?.split(' ').map(name => name.slice(0, 1).toUpperCase())

    const AvatarType = () => {
      if (src) {
        return (
          <Image
            className="min-h-full min-w-full"
            src={src}
            alt={t('profile')}
            ratio="aspect-w-4 aspect-h-4"
          />
        )
      } else if (userInitials) {
        return <span>{userInitials}</span>
      } else {
        return <ProfileIcon className="min-h-full min-w-full p-0.5" />
      }
    }

    return (
      <div
        className={cn(
          'Avatar',
          avatarClass,
          avatarVariant[variant][color],
          avatarSize[size],
          className,
        )}
        role="img"
        ref={ref}
        aria-label={t('profile')}
        {...rest}
      >
        <AvatarType />
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
