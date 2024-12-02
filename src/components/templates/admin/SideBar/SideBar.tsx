import { useTranslations } from 'next-intl'

import { Paper } from '@/components/atoms/containers/Paper'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { ADMINROUTES, PRIVATEROUTES, PUBLICROUTES } from '@/utils/routes'
import { cn } from '@/utils/utils'

import { Logo } from '../../common/Logo'
import { Nav } from '../../common/Nav'

export type HeaderProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Drawer Sidebar for admin layout. */
export const SideBar = ({ className }: HeaderProps) => {
  const t = useTranslations('Navigation')

  const navLinks = [
    {
      slug: PRIVATEROUTES.home,
      title: t('home'),
    },
    {
      slug: PUBLICROUTES.login,
      title: t('login'),
    },
    {
      slug: PUBLICROUTES.register,
      title: t('register'),
    },
    {
      slug: ADMINROUTES.dashboard,
      title: t('dashboard'),
    },
  ]

  return (
    <aside
      className={cn(
        'SideBar',
        'absolute bottom-0 left-0 top-0 w-smSideBarWidth md:w-sideBarWidth',
        className,
      )}
      aria-label="sideBar"
      data-testid="SideBar"
    >
      <Paper
        className="relative h-full"
        variant="contained"
        color="primary"
        padding="p-0"
        rounded="rounded-r-md"
      >
        <ScrollShadow disableHorizontal>
          <div className="flex flex-col gap-6 pt-4">
            <Logo
              className="mx-auto px-2 [&>.LogoTitle]:hidden md:[&>.LogoTitle]:block"
              url={ADMINROUTES.dashboard}
            />
            <Nav navLinks={navLinks} menu linkProps={{ variant: 'contained' }} />
          </div>
        </ScrollShadow>
      </Paper>
    </aside>
  )
}

SideBar.displayName = 'SideBar'
