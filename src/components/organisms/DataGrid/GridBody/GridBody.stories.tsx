import type { Meta, StoryObj } from '@storybook/react'

import { gridColsDef, gridData, routerMock } from '../../../../../.storybook/helpers'
import { GridBody } from '.'

const meta: Meta<typeof GridBody> = {
  title: 'Organisms/DataGrid/GridBody',
  component: GridBody,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: { control: false },
    pagedData: { control: false },
    selectedRows: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof GridBody>

export const PrimaryDefault: Story = {
  parameters: { ...routerMock },
  args: {
    columns: gridColsDef,
    pagedData: gridData.slice(0, 10),
    selectedRows: [],
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    rowsPerPage: 20,
    maxHeight: 'max-h-[80vh]',
    multiselect: false,
    handleRowClick: undefined,
  },
}

export const IsLoading: Story = {
  parameters: { ...routerMock },
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
  },
}

export const OnRowClick: Story = {
  parameters: { ...routerMock },
  args: {
    ...PrimaryDefault.args,
    handleRowClick: v => console.log(v),
  },
}

export const MultiSelect: Story = {
  parameters: { ...routerMock },
  args: {
    ...PrimaryDefault.args,
    multiselect: true,
  },
}
