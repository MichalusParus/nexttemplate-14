import type { Meta, StoryObj } from '@storybook/nextjs'

import { ResetPasswordForm } from '.'

const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Pages/ResetPassword/ResetPasswordForm',
  component: ResetPasswordForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ResetPasswordForm>

export const Default: Story = {}
