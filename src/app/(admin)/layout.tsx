import { PropsWithChildren } from 'react'

import { AdminMain } from '@/components/templates/admin/AdminMain'
import { SideBar } from '@/components/templates/admin/SideBar'
import { cn } from '@/utils/utils'

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div
      id="sideBarContainer"
      className={cn('AdminLayout', 'relative mx-auto h-screen w-full max-w-[1920px]')}
    >
      <SideBar />
      <AdminMain>{children}</AdminMain>
    </div>
  )
}
