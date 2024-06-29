import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getPages } from '../../../../../../.storybook/helpers'
import MobilePagination from '.'
import { Props } from './MobilePagination'

const meta: Meta<typeof MobilePagination> = {
  title: 'Organisms/Common/Pagination/MobilePagination',
  component: MobilePagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const PaginationWithHooks = ({ args }: { args: Props }) => {
  const [selectedPage, setSelectedPage] = useState(1)
  return (
    <MobilePagination {...args} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
  )
}

export default meta
type Story = StoryObj<typeof MobilePagination>

export const Default: Story = {
  args: { className: 'className', pages: getPages(5) },
  render: args => <PaginationWithHooks args={args} />,
}
