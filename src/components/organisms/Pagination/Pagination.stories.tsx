import type { Meta, StoryObj } from '@storybook/react'

import { usePagination } from '@/utils/hooks/usePagination'

import { getPages, tileData } from '../../../../.storybook/helpers'
import { Pagination, PaginationProps } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Organisms/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pages: {
      control: false,
    },

    loadMoreButtonProps: {
      control: false,
    },
  },
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
        pages={pages}
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
    pages: getPages(5),
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
  render: args => <PaginationWithHooks {...args} />,
}

export const LoadMore: Story = {
  args: {
    ...PrimaryDefault.args,
    pages: getPages(30),
    onLoadMore: () => console.log('Load More'),
  },
  render: args => <PaginationWithHooks {...args} />,
}
