import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getPages } from '../../../../../.storybook/helpers'
import { ScreenPagination } from '.'
import { ScreenPaginationProps } from './ScreenPagination'

const meta: Meta<typeof ScreenPagination> = {
  title: 'Organisms/Pagination/ScreenPagination',
  component: ScreenPagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pages: {
      control: false,
    },
    buttonProps: {
      control: false,
    },
  },
}

const PaginationWithHooks = (args: ScreenPaginationProps) => {
  const [selectedPage, setSelectedPage] = useState(1)
  return (
    <ScreenPagination {...args} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
  )
}

export default meta
type Story = StoryObj<typeof ScreenPagination>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'screenPaginationStory',
    pages: getPages(5),
    selectedPage: 1,
    pageSpread: 13,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    loadMoreCount: 0,
    buttonProps: {},
    setSelectedPage: () => {},
  },
  render: args => <PaginationWithHooks {...args} />,
}

export const CollapsedPages: Story = {
  args: { ...PrimaryDefault.args, pages: getPages(30) },
  render: args => <PaginationWithHooks {...args} />,
}
