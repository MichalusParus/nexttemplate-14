import type { Meta, StoryObj } from '@storybook/react'

import {
  gridCleanColsDef,
  gridColsDef,
  gridData,
  gridDoubleColsDef,
  routerMock,
} from '../../../../.storybook/helpers'
import DataGrid from '.'

const meta: Meta<typeof DataGrid> = {
  title: 'Organisms/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    ...routerMock,
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
    multiselectButtonProps: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DataGrid>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'dataGridDefaultStory',
    columns: gridColsDef,
    rows: gridData.slice(0, 10),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    rowsPerPage: 20,
    maxHeight: 'max-h-[80vh]',
    hideShadow: false,
    hideExport: false,
    multiselectButtonProps: undefined,
    onMultiselectSubmit: undefined,
    onRowClick: undefined,
  },
}

export const CleanTable: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridCleanColsDef,
    hideExport: true,
  },
}

export const Pages: Story = {
  args: {
    ...PrimaryDefault.args,
    rows: gridData,
  },
}

export const IsLoading: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
  },
}

export const DoubleHeader: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridDoubleColsDef,
    rows: gridData,
  },
}

export const OnRowClick: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridDoubleColsDef,
    rows: gridData,
    onRowClick: (row: object) => console.log(row),
  },
}

export const MultiSelect: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridDoubleColsDef,
    rows: gridData,
    onMultiselectSubmit: (row: object[]) => console.log(row),
  },
}
