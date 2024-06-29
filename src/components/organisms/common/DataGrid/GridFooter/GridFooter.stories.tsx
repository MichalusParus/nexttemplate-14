import type { Meta, StoryObj } from '@storybook/react'

import { routerMock } from '../../../../../../.storybook/helpers'
import GridFooter from '.'

const meta: Meta<typeof GridFooter> = {
  title: 'Organisms/Common/DataGrid/GridFooter',
  component: GridFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    filteredData: { control: false },
    pages: { control: false },
  },
  decorators: [
    Story => (
      <div className="pt-56">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GridFooter>

export const Default: Story = {
  parameters: { ...routerMock },
  args: {
    filteredData: [],
    selectedRowsPerPage: 20,
    pages: [1, 2, 3],
    selectedPage: 1,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    hideExport: false,
    setSelectedPage: () => {},
    setSelectedRowsPerPage: () => {},
  },
}
