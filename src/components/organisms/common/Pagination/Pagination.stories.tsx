import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState, useTransition } from 'react'

import { usePagination } from '@/utils/hooks/usePagination'

import { tileData } from '../../../../../.storybook/helpers'
import { Pagination, PaginationProps } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Organisms/Common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    loadMoreButtonProps: {
      control: false,
    },
  },
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
    <div>
      <div className="grid min-h-40 grid-cols-5 gap-2 pb-6">
        {pending
          ? 'loading'
          : res?.results.map(item => (
              <div key={item.name} className="h-20 w-full gap-2 border p-2">
                <div className="text-md">{item.name}</div>
              </div>
            ))}
      </div>
      <Pagination
        {...args}
        count={Math.ceil((res?.count || 20) / limit)}
        selectedPage={offset / limit + 1}
        setSelectedPage={page => setOffset(page * limit - limit)}
      />
    </div>
  )
}

const PaginationWithHooks = (args: PaginationProps) => {
  const { pagedData, pages, selectedPage, onLoadMore, setSelectedPage, loadMoreCount } =
    usePagination(tileData, 10)

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 pb-6">
        {pagedData.map(item => (
          <div key={item.id} className="flex h-12 w-full flex-col gap-2 border p-2">
            <div className="text-xl">{item.title}</div>
          </div>
        ))}
      </div>
      <Pagination
        {...args}
        count={pages.length}
        selectedPage={selectedPage}
        loadMoreCount={loadMoreCount}
        setSelectedPage={setSelectedPage}
        onLoadMore={args.onLoadMore && onLoadMore}
      />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Pagination>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'paginationStory',
    count: 5,
    selectedPage: 1,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    maxSpread: 17,
    loadMoreCount: 0,
    buttonProps: {},
    loadMoreButtonProps: {},
    setSelectedPage: () => {},
    onLoadMore: undefined,
  },
  render: args => <PaginationWithFetch {...args} />,
}

export const ClientPagination: Story = {
  args: {
    ...PrimaryDefault.args,
    count: 30,
    onLoadMore: () => console.log('Load More'),
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
