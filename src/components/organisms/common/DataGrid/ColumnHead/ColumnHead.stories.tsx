import type { Meta, StoryObj } from '@storybook/react'

import { routerMock } from '../../../../../../.storybook/helpers'
import ColumnHead from '.'

const meta: Meta<typeof ColumnHead> = {
  title: 'Organisms/Common/DataGrid/ColumnHead',
  component: ColumnHead,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    column: { control: false },
    sorting: { control: false },
    filter: { control: false },
  },
  decorators: [
    Story => (
      <div className="relative">
        <Story />
      </div>
    ),
  ],
}

const col = {
  label: 'Label 1',
  name: 'name1',
  width: 'basis-40',
}

export default meta
type Story = StoryObj<typeof ColumnHead>

export const Default: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadDefaultStory',
    column: col,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    allSelected: false,
    sorting: { key: 'asc' },
    filter: {},
    handleSorting: undefined,
    setFilter: undefined,
    handleAll: undefined,
  },
}

export const SubcolumnHead: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadSubcolumnHeadStory',
    column: col,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    allSelected: false,
    sorting: { key: 'asc' },
    filter: {},
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
    handleAll: undefined,
  },
}

export const SelectAllHead: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadSelectAllHeadStory',
    column: col,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    allSelected: false,
    sorting: { key: 'asc' },
    filter: {},
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
    handleAll: () => console.log('selecting'),
  },
}
