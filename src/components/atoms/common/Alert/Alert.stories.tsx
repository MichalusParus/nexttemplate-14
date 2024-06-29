import type { Meta, StoryObj } from '@storybook/react'

import Alert from '.'

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Common/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const SuccessDefault: Story = {
  args: {
    className: '',
    variant: 'outlined',
    status: 'success',
    size: 'md',
    title: '',
    icon: undefined,
    children: 'Success alert',
  },
}

export const Info: Story = {
  args: { ...SuccessDefault.args, status: 'info', children: 'Info alert' },
}

export const Warning: Story = {
  args: {
    ...SuccessDefault.args,
    status: 'warning',
    children: 'Warning alert',
  },
}

export const Error: Story = {
  args: { ...SuccessDefault.args, status: 'error', children: 'Error alert' },
}

export const Title: Story = {
  args: {
    ...SuccessDefault.args,
    title: 'Alert Title',
    children: 'Alert information about thing that just happend.',
  },
}

export const TitleOnly: Story = {
  args: {
    ...SuccessDefault.args,
    title: 'Title only alert',
    children: undefined,
  },
}

export const TitleLongText: Story = {
  args: {
    ...SuccessDefault.args,
    className: 'max-w-96',
    title: 'Alert Title',
    children:
      'Very long alert information about important thing that just happend. Alert will grow with text, so it is usefull to set max-width via className for smaller alerts.',
  },
}
