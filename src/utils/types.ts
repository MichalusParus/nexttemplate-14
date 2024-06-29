// PagePropsTypes

export type LayoutProps = {
  children: React.ReactNode
}

export type PageProps = {
  params: {
    params?: string
    locale?: string
    rest?: string[]
  }
  searchParams: {
    id?: string
    tab?: string
    search?: string
  }
}

export type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}
