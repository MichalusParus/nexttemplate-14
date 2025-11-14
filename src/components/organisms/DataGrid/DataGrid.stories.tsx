import type { Meta, StoryObj } from '@storybook/react'

import {
  gridCleanColsDef,
  gridColsDef,
  gridData,
  gridMultiColsDef,
} from '../../../../.storybook/helpers'
import { DataGrid } from '.'

const routerMock = {
  nextjs: {
    appDirectory: true,
    router: {
      navigation: {
        basePath: '/',
      },
    },
  },
}

const meta: Meta<typeof DataGrid> = {
  title: 'Organisms/Common/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    ...routerMock,
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
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
    defaultSelectedRows: undefined,
    getRowId: undefined,
    onSelectionChange: undefined,
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

export const MultiHeader: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridMultiColsDef,
    rows: gridData,
  },
}

export const OnRowClick: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridMultiColsDef,
    rows: gridData,
    onRowClick: (row: Record<string, unknown>) => console.log(row),
  },
}

export const MultiSelect: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridMultiColsDef,
    rows: gridData,
    onSelectionChange: (rows: Record<string, unknown>[]) => console.log('Selected:', rows),
  },
}
