import type { Meta, StoryObj } from '@storybook/nextjs'

import { LoginForm } from '.'

const meta: Meta<typeof LoginForm> = {
  title: 'Pages/Login/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}
