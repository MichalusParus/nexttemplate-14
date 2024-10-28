import type { Meta, StoryObj } from '@storybook/react'

import { gridColsDef, gridDoubleColsDef, routerMock } from '../../../../../.storybook/helpers'
import { GridHeader } from '.'

const meta: Meta<typeof GridHeader> = {
  title: 'Organisms/DataGrid/GridHeader',
  component: GridHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    ...routerMock,
  },
  argTypes: {
    columns: { control: false },
    sorting: { control: false },
    filter: { control: false },
  },
  decorators: [
    Story => (
      <div className="h-36">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GridHeader>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'columnHeadStory',
    columns: gridColsDef,
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

export const IsInteractive: Story = {
  args: {
    ...PrimaryDefault.args,
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
  },
}

export const DoubleCols: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridDoubleColsDef,
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
  },
}

export const MultiSelect: Story = {
  args: {
    ...PrimaryDefault.args,
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
    handleAll: () => console.log('selecting'),
  },
}

export const DoubleMultiSelect: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridDoubleColsDef,
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
    handleAll: () => console.log('selecting'),
  },
}
