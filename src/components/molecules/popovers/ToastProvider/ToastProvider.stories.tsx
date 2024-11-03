import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/atoms/common/Button'

import { ToastProvider, useToast } from './ToastProvider'

const meta: Meta<typeof ToastProvider> = {
  title: 'Molecules/Popovers/Toast(Provider)',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

const ToastProviderWithHooks = () => {
  const { addToast } = useToast()
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <Button onClick={() => addToast('success', 'success message', 'Success title')}>
        success
      </Button>
      <Button onClick={() => addToast('info', 'info message', 'Info title')}>info</Button>
      <Button onClick={() => addToast('warning', 'warning message', 'Warning title')}>
        Warning
      </Button>
      <Button color="error" onClick={() => addToast('error', 'error message', 'Error title')}>
        error
      </Button>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof ToastProvider>

export const Default: Story = {
  render: () => <ToastProviderWithHooks />,
}
