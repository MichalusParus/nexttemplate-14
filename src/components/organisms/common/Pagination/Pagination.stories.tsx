import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState, useTransition } from 'react'

import { Ghost } from '@/components/atoms/loaders/Ghost'
import { usePagination } from '@/utils/hooks/usePagination'

import { MobilePagination } from './MobilePagination'
import { Pagination, PaginationProps } from './Pagination'
import { ScreenPagination } from './ScreenPagination'

const tileData = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  name: `Title ${i}`,
}))

const meta: Meta<typeof Pagination> = {
  title: 'Organisms/Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

const MockedPageContent = ({
  data,
  isLoading,
}: {
  data: { id?: number; name: string; url?: string }[]
  isLoading: boolean
}) => {
  return (
    <div className="grid min-h-40 grid-cols-5 gap-2 pb-6">
      {isLoading || !data.length
        ? Array.from({ length: 10 }, (_, i) => i + 1).map(item => (
            <Ghost key={item} className="h-12 w-full" />
          ))
        : data.map(item => (
            <div key={item.id} className="flex h-12 w-full flex-col gap-2 border p-2">
              {item.name}
            </div>
          ))}
    </div>
  )
}

const PaginationWithFetch = (args: PaginationProps) => {
  const [pending, startTransition] = useTransition()
  const [res, setRes] = useState<{ count: number; results: { name: string; url: string }[] }>()
  const [offset, setOffset] = useState(0)
  const limit = 10

  useEffect(() => {
    startTransition(async () => {
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setRes(res)
        })
    })
  }, [limit, offset])

  return (
    <div className="flex flex-col items-center gap-4">
      <MockedPageContent data={res?.results || []} isLoading={pending} />
      <Pagination
        {...args}
        count={Math.ceil((res?.count || 20) / limit)}
        page={offset / limit + 1}
        onChange={page => setOffset(page * limit - limit)}
      />
    </div>
  )
}

const PaginationWithHooks = (args: PaginationProps) => {
  const { pagedData, pages, page, onLoadMore, onChange, loadMoreCount } = usePagination(
    tileData,
    10,
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <MockedPageContent data={pagedData} isLoading={false} />
      <Pagination
        {...args}
        count={pages.length}
        page={page}
        loadMoreCount={loadMoreCount}
        onChange={onChange}
        onLoadMore={args.onLoadMore && onLoadMore}
      />
    </div>
  )
}

const MobilePaginationWithHooks = (args: PaginationProps) => {
  const { pagedData, pages, page, onChange, loadMoreCount } = usePagination(tileData, 10)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { maxSpread, loadMoreButtonProps, onLoadMore, ...mobileArgs } = args

  return (
    <div className="flex flex-col items-center gap-4">
      <MockedPageContent data={pagedData} isLoading={false} />
      <MobilePagination
        {...mobileArgs}
        count={pages.length}
        page={page}
        loadMoreCount={loadMoreCount}
        onChange={onChange}
      />
    </div>
  )
}

const ScreenPaginationWithHooks = (args: PaginationProps) => {
  const { pagedData, pages, page, onChange, loadMoreCount, onLoadMore } = usePagination(tileData, 10)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { maxSpread, ...screenArgs } = args

  return (
    <div className="flex flex-col items-center gap-4">
      <MockedPageContent data={pagedData} isLoading={false} />
      <ScreenPagination
        {...screenArgs}
        count={pages.length}
        page={page}
        pageSpread={7}
        loadMoreCount={loadMoreCount}
        onChange={onChange}
        onLoadMore={args.onLoadMore && onLoadMore}
        loadMoreButtonProps={args.loadMoreButtonProps}
      />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Pagination>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    count: 5,
    page: 1,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    hideNav: false,
    maxSpread: 17,
    loadMoreCount: 0,
    buttonProps: {},
    loadMoreButtonProps: {},
    onChange: () => {},
    onLoadMore: undefined,
  },
  render: args => <PaginationWithFetch {...args} />,
}

export const ClientPagination: Story = {
  args: {
    ...PrimaryDefault.args,
    count: 30,
  },
  render: args => <PaginationWithHooks {...args} />,
}

export const LoadMore: Story = {
  args: {
    ...PrimaryDefault.args,
    count: 30,
    onLoadMore: () => console.log('Load More'),
  },
  render: args => <PaginationWithHooks {...args} />,
}

export const MobileVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Mobile version of pagination. Separate component MobilePagination.',
      },
    },
  },
  args: {
    ...PrimaryDefault.args,
    count: 10,
    page: 5,
  },
  render: args => <MobilePaginationWithHooks {...args} />,
}

export const ScreenVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Static version of pagination with fixed page spread. Separate component ScreenPagination.',
      },
    },
  },
  args: {
    ...PrimaryDefault.args,
    count: 20,
    page: 10,
  },
  render: args => <ScreenPaginationWithHooks {...args} />,
}
