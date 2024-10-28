import type { Meta, StoryObj } from '@storybook/react'

import { routerMock } from '../../../../../.storybook/helpers'
import { ColumnHead } from '.'

const meta: Meta<typeof ColumnHead> = {
  title: 'Organisms/DataGrid/ColumnHead',
  component: ColumnHead,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...routerMock,
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

export const PrimaryDefault: Story = {
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
    handleAll: undefined,
    handleSorting: undefined,
    setFilter: undefined,
  },
}

export const IsInteractive: Story = {
  parameters: { ...routerMock },
  args: {
    ...PrimaryDefault.args,
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
  },
}

export const SelectAll: Story = {
  args: {
    ...PrimaryDefault.args,
    handleAll: () => console.log('all'),
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
  },
}
