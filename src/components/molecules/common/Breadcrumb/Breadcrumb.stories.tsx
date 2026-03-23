import type { Meta, StoryObj } from '@storybook/nextjs'

import { breadcrumbOptions } from '../../../../../.storybook/helpers'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Common/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    className: 'className',
    options: breadcrumbOptions,
    color: 'none',
  },
}
