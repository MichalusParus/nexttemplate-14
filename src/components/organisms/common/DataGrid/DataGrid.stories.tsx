import type { Meta, StoryObj } from '@storybook/react'

import {
  gridCleanColsDef,
  gridColsDef,
  gridData,
  gridDoubleColsDef,
  routerMock,
} from '../../../../../.storybook/helpers'
import DataGrid from '.'

const meta: Meta<typeof DataGrid> = {
  title: 'Organisms/Common/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
    multiselectButtonProps: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DataGrid>

const onRowClick = (row: object | object[]) => {
  console.log(row)
}

export const Default: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
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
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'dataGridCleanTableStory',
    columns: gridCleanColsDef,
    rows: gridData.slice(0, 10),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    rowsPerPage: 20,
    maxHeight: 'max-h-[80vh]',
    hideShadow: false,
    hideExport: true,
    multiselectButtonProps: undefined,
    onMultiselectSubmit: undefined,
    onRowClick: undefined,
  },
}

export const DoubleHeader: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'dataGridDoubleHeaderStory',
    columns: gridDoubleColsDef,
    rows: gridData,
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

export const OnRowClick: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'dataGridOnRowClickStory',
    columns: gridDoubleColsDef,
    rows: gridData,
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
    onRowClick: onRowClick,
  },
}

export const MultiSelect: Story = {
  parameters: { ...routerMock },
  args: {
    className: 'className',
    name: 'dataGridMultiSelectStory',
    columns: gridDoubleColsDef,
    rows: gridData,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    rowsPerPage: 20,
    maxHeight: 'max-h-[80vh]',
    hideShadow: false,
    hideExport: false,
    multiselectButtonProps: undefined,
    onMultiselectSubmit: value => onRowClick(value),
    onRowClick: undefined,
  },
}
