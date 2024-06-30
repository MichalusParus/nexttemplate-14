import { forwardRef, HTMLAttributes } from 'react'

import ProfileIcon from '../../icons/ProfileIcon'
import Image from '../Image'
import { avatarClass, avatarSize, avatarVariant } from './Avatar.style'
import { cn } from '@/utils/utils'

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** source for profile picture, without src displays user initials  */
  src?: string
  /** username for avatar initials, without username displays profile icon  */
  username?: string
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
}

/** Avatar component for displaying user initials. By default shows profile icon. Default HTMLAttributes props supported. */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className = '',
      src,
      username,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      ...rest
    },
    ref,
  ) => {
    const userInitials = username?.split(' ').map(name => name.slice(0, 1).toUpperCase())

    const AvatarType = () => {
      if (src) {
        return <Image className="min-h-full min-w-full" src={src} alt="test" ratio={100} />
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
        aria-label="profile"
        {...rest}
      >
        <AvatarType />
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
