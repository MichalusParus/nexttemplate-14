import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getPages } from '../../../../../../.storybook/helpers'
import ScreenPagination from '.'
import { Props } from './ScreenPagination'

const meta: Meta<typeof ScreenPagination> = {
  title: 'Organisms/Common/Pagination/ScreenPagination',
  component: ScreenPagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const PaginationWithHooks = ({ args }: { args: Props }) => {
  const [selectedPage, setSelectedPage] = useState(1)
  return (
    <ScreenPagination {...args} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
  )
}

export default meta
type Story = StoryObj<typeof ScreenPagination>

export const Default: Story = {
  args: { className: 'className', pages: getPages(5), pageSpread: 13 },
  render: args => <PaginationWithHooks args={args} />,
}

export const CollapsedPages: Story = {
  args: { className: 'className', pages: getPages(30), pageSpread: 13 },
  render: args => <PaginationWithHooks args={args} />,
}
