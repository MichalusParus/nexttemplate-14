import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getPages } from '../../../../../.storybook/helpers'
import Pagination from '.'
import { Props } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Organisms/Common/Pagination/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const PaginationWithHooks = ({ args }: { args: Props }) => {
  const [selectedPage, setSelectedPage] = useState(1)
  return <Pagination {...args} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: { className: 'className', pages: getPages(5) },
  render: args => <PaginationWithHooks args={args} />,
}

export const CollapsedPages: Story = {
  args: { className: 'className', pages: getPages(30) },
  render: args => <PaginationWithHooks args={args} />,
}
