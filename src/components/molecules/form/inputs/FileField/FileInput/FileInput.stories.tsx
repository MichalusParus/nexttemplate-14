import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { ToastProvider } from '@/components/molecules/popovers/ToastProvider'

import { FileInput, FileInputProps } from '.'

const meta: Meta<typeof FileInput> = {
  title: 'Molecules/Form/inputs/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

const InputWithHooks = (args: FileInputProps) => {
  const [value, setValue] = useState<File[]>([])

  const mockDrop = async (file: File): Promise<File> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setValue(prev => [...prev, file])
        resolve(file)
      }, 2000)
    })
  }

  const mockDelete = async (file: File) => {
    await new Promise((resolve: (value?: unknown) => void) => {
      setTimeout(() => {
        setValue(prev => prev.filter(p => p.name !== file.name))
        resolve()
      }, 2000)
    })
    return
  }

  return <FileInput {...args} value={value} onDrop={mockDrop} onDelete={mockDelete} />
}

export default meta
type Story = StoryObj<typeof FileInput>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'inputStory',
    value: [],
    allowedFileTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileCount: 5,
    maxFileSize: 5 * 1024 * 1024,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    onDrop: async v => v,
    onDelete: async v => console.log('delete' + v),
    onDropAccepted: v => console.log('accepted' + v),
    onDropRejected: v => console.log('rejected' + v),
  },
  render: args => <InputWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory4',
    error: 'error',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory5',
    disabled: true,
  },
}
