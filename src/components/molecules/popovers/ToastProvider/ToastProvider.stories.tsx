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
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          className="bg-success-800 text-success-50"
          color="none"
          onClick={() => addToast('success', 'success message', 'Success title')}
        >
          Success Toast
        </Button>
        <Button
          className="bg-info-800 text-info-50"
          color="none"
          onClick={() => addToast('info', 'info message', 'Info title')}
        >
          Info Toast
        </Button>
        <Button
          className="bg-warning-800 text-warning-50"
          color="none"
          onClick={() => addToast('warning', 'warning message', 'Warning title')}
        >
          Warning Toast
        </Button>
        <Button color="error" onClick={() => addToast('error', 'error message', 'Error title')}>
          Error Toast
        </Button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          className="bg-success-800 text-success-50"
          color="none"
          onClick={() =>
            addToast('success', 'success message', 'Success title', { isPersistent: true })
          }
        >
          Persistent Success
        </Button>
        <Button
          className="bg-info-800 text-info-50"
          color="none"
          onClick={() => addToast('info', 'info message', 'Info title', { isPersistent: true })}
        >
          Persistent Info
        </Button>
        <Button
          className="bg-warning-800 text-warning-50"
          color="none"
          onClick={() =>
            addToast('warning', 'warning message', 'Warning title', { isPersistent: true })
          }
        >
          Persistent Warning
        </Button>
        <Button
          color="error"
          onClick={() => addToast('error', 'error message', 'Error title', { isPersistent: true })}
        >
          Persistent Error
        </Button>
      </div>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof ToastProvider>

export const Default: Story = {
  render: () => <ToastProviderWithHooks />,
}
