import type { Meta, StoryObj } from '@storybook/react'

import { gridColsDef, gridDoubleColsDef, routerMock } from '../../../../../../.storybook/helpers'
import GridHeader from '.'

const meta: Meta<typeof GridHeader> = {
  title: 'Organisms/Common/DataGrid/GridHeader',
  component: GridHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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

export const Default: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadDefaultStory',
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

export const SubcolumnHeader: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadSubcolumnHeaderStory',
    columns: gridColsDef,
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

export const DoubleColsHeader: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadDoubleColsHeaderStory',
    columns: gridDoubleColsDef,
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

export const MultiSelectHeader: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadMultiSelectHeaderStory',
    columns: gridColsDef,
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

export const DoubleMultiSelectHeader: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'columnHeadDoubleMultiSelectHeaderStory',
    columns: gridDoubleColsDef,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    allSelected: false,
    sorting: { key: 'asc' },
    filter: {},
    handleAll: () => console.log('selecting'),
    handleSorting: () => console.log('sorting'),
    setFilter: () => console.log('filtering'),
  },
}
