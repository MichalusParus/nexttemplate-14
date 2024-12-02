import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getPages } from '../../../../../.storybook/helpers'
import { MobilePagination, MobilePaginationProps } from './MobilePagination'

const meta: Meta<typeof MobilePagination> = {
  title: 'Organisms/Pagination/MobilePagination',
  component: MobilePagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pages: {
      control: false,
    },
  },
}

const PaginationWithHooks = (args: MobilePaginationProps) => {
  const [selectedPage, setSelectedPage] = useState(1)
  return (
    <MobilePagination {...args} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
  )
}

export default meta
type Story = StoryObj<typeof MobilePagination>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    pages: getPages(5),
    selectedPage: 1,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    loadMoreCount: 0,
    buttonProps: {},
    setSelectedPage: () => {},
  },
  render: args => <PaginationWithHooks {...args} />,
}
