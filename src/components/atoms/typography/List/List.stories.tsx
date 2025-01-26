import type { Meta, StoryObj } from '@storybook/react'

import { getOptions, textContent, titleSizeVariants } from '../../../../../.storybook/helpers'
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
    type: 'ol',
    listStyleType: undefined,
    color: 'none',
    size: 'md',
    content: listContent.slice(0, 6),
    title: undefined,
    description: undefined,
    icon: undefined,
    isLoading: false,
    expectedLines: 3,
    titleProps: {},
    pProps: {},
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

export const Title: Story = {
  args: { ...Default.args, listStyleType: 'list-[none]', title: 'List Title', icon: <CheckIcon /> },
}

export const Description: Story = {
  args: {
    ...Default.args,
    title: 'List Title',
    description: textContent.slice(0, 57),
    icon: <CheckIcon />,
  },
}

export const Children: Story = {
  args: {
    ...Default.args,
    content: [],
    listStyleType: 'list-decimal',
    title: 'Pass Li as Children and customize each one.',
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
  args: { ...Default.args, title: 'List title', description: 'List description' },
  render: args => (
    <div className="flex flex-col gap-10">
      {titleSizeVariants.slice(0, 3).map(variant => (
        <div key={variant} className="flex w-96 [&>*]:basis-1/2">
          <div>
            <List {...args} size={variant as 'sm' | 'md' | 'lg'} />
          </div>
          <div>
            <List
              {...args}
              titleProps={{ isLoading: true }}
              pProps={{ isLoading: true }}
              isLoading
              size={variant as 'sm' | 'md' | 'lg'}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}
