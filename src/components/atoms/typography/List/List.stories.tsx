import type { Meta, StoryObj } from '@storybook/nextjs'

import { getOptions, titleSizeVariants } from '../../../../../.storybook/helpers'
import { CheckIcon } from '../../icons'
import { Li } from './Li/Li'
import { List } from './List'

const meta: Meta<typeof List> = {
  title: 'Atoms/Typography/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    content: {
      control: false,
    },

    icon: {
      control: false,
    },
  },
}

const listContent = getOptions().map(o => o.label)

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {
    className: '',
    content: listContent.slice(0, 6),
    type: 'ol',
    listStyleType: undefined,
    color: 'none',
    size: 'md',
    icon: undefined,
    isLoading: false,
    expectedLines: 3,
    ghostProps: {},
  },
}

export const Ol: Story = {
  args: { ...Default.args, listStyleType: 'list-decimal' },
}

export const Ul: Story = {
  args: { ...Default.args, type: 'ul', listStyleType: 'list-disc' },
}

export const CustomIcon: Story = {
  args: { ...Default.args, icon: <CheckIcon /> },
}

export const Children: Story = {
  args: {
    ...Default.args,
    content: [],
    listStyleType: 'list-decimal',
    isLoading: false,
    expectedLines: 0,
  },
  render: args => (
    <List {...args}>
      <Li color="primary" size="sm" isLoading={args.isLoading}>
        Small Primary Li
      </Li>
      <Li color="secondary" size="md" isLoading={args.isLoading}>
        Medium Secondary Li
      </Li>
      <Li color="terciary" size="lg" isLoading={args.isLoading}>
        Large Terciary Li
      </Li>
    </List>
  ),
}

export const AllSizesAndLoading: Story = {
  args: Default.args,
  render: args => (
    <div className="flex flex-col gap-10">
      {titleSizeVariants.slice(0, 3).map(variant => (
        <div key={variant} className="flex w-96 *:basis-1/2">
          <div>
            <List {...args} size={variant as 'sm' | 'md' | 'lg'} />
          </div>
          <div>
            <List {...args} isLoading size={variant as 'sm' | 'md' | 'lg'} />
          </div>
        </div>
      ))}
    </div>
  ),
}
