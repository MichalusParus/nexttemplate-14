import type { Meta, StoryObj } from '@storybook/nextjs'

import { textContent, titleSizeVariants } from '../../../../../.storybook/helpers'
import { P } from '.'

const meta: Meta<typeof P> = {
  title: 'Atoms/Typography/P',
  component: P,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof P>

export const Default: Story = {
  args: {
    className: '',
    color: 'none',
    size: 'md',
    align: 'text-left',
    isLoading: false,
    expectedLines: 4,
    children: textContent.slice(0, 420),
  },
}

export const Center: Story = {
  args: { ...Default.args, align: 'text-center' },
}

export const Right: Story = {
  args: { ...Default.args, align: 'text-right' },
}

export const IsLoading: Story = {
  args: { ...Default.args, isLoading: true, expectedLines: 4 },
}

export const AllSizesAndLoading: Story = {
  args: { ...Default.args, expectedLines: 7 },
  render: args => (
    <div className="flex flex-col gap-10">
      {titleSizeVariants.slice(0, 3).map(variant => (
        <div key={variant} className="flex *:basis-1/2">
          <P {...args} size={variant} />
          <P {...args} isLoading size={variant} />
        </div>
      ))}
    </div>
  ),
}
