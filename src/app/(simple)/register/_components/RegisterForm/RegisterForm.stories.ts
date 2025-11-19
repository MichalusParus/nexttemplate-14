import type { Meta, StoryObj } from '@storybook/nextjs'

import { RegisterForm } from '.'

const meta: Meta<typeof RegisterForm> = {
  title: 'Pages/Register/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {}
