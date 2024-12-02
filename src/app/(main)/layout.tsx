import { PropsWithChildren } from 'react'

import { Footer } from '@/components/templates/main/Footer'
import { Header } from '@/components/templates/main/Header'
import { Main } from '@/components/templates/main/Main'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
