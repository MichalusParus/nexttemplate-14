import type { Meta, StoryObj } from '@storybook/nextjs'

import { titleSizeVariants } from '../../../../../.storybook/helpers'
import { Title } from '.'

const meta: Meta<typeof Title> = {
  title: 'Atoms/Typography/Title',
  component: Title,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Title>

export const Default: Story = {
  args: {
    className: '',
    variant: 'h3',
    align: 'text-left',
    color: 'none',
    size: 'lg',
    isLoading: false,
    ghostProps: {},
    children: 'Title',
  },
}

export const Center: Story = {
  args: { ...Default.args, align: 'text-center' },
}

export const Right: Story = {
  args: { ...Default.args, align: 'text-right' },
}

export const IsLoading: Story = {
  args: { ...Default.args, isLoading: true },
}

export const AllSizesAndLoading: Story = {
  render: () => (
    <>
      {titleSizeVariants.map(variant => (
        <div key={variant} className="flex items-start">
          <Title variant="h1" align="text-right" size={variant}>
            {`${variant.toUpperCase()} Title`}
          </Title>
          <Title variant="h1" isLoading align="text-left" size={variant}>
            {`${variant.toUpperCase()} Title`}
          </Title>
        </div>
      ))}
    </>
  ),
}
