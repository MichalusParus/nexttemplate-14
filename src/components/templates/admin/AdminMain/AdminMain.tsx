import { PropsWithChildren } from 'react'

import { cn } from '@/utils/utils'

export type MainProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** AdminMain component for admin Layout, semantic with layout container and basic styling. */
export const AdminMain = ({ className, children }: PropsWithChildren<MainProps>) => {
  return (
    <main
      className={cn(
        'AdminMain',
        'ml-smSideBarWidth flex-1 px-8 py-5 md:ml-sideBarWidth',
        className,
      )}
      data-testid="AdminMain"
    >
      {children}
    </main>
  )
}

AdminMain.displayName = 'AdminMain'
