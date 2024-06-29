import type { Meta, StoryObj } from '@storybook/react'

import { options, textContent, titleSizeVariants } from '../../../../../.storybook/helpers'
import { Li, List } from './List'

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
    titleProps: {
      control: false,
    },
  },
}

const listContent = options.map(o => o.label)

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {
    className: '',
    listStyleType: undefined,
    color: 'none',
    size: 'md',
    content: listContent,
    title: undefined,
    titleProps: { variant: 'h3' },
    isLoading: false,
    expectedLines: 6,
  },
}

export const Ul: Story = {
  args: { ...Default.args, listStyleType: 'list-disc' },
}

export const Title: Story = {
  args: { ...Default.args, title: 'List Title' },
}

export const Description: Story = {
  args: {
    ...Default.args,
    title: 'List Title',
    children: textContent.slice(0, 57),
  },
}

export const Children: Story = {
  args: {
    ...Default.args,
    content: undefined,
    title: 'Pass Li as Children and customize each one.',
  },
  render: args => (
    <List {...args}>
      <Li color="primary" size="sm">
        Small Primary Li
      </Li>
      <Li color="secondary" size="md">
        Medium Secondary Li
      </Li>
      <Li color="terciary" size="lg">
        Large Terciary Li
      </Li>
    </List>
  ),
}

export const AllSizesAndLoading: Story = {
  args: { ...Default.args, title: 'List title' },
  render: args => (
    <div className="flex flex-col gap-10">
      {titleSizeVariants.slice(0, 3).map(variant => (
        <div key={variant} className="flex w-96 [&>*]:basis-1/2">
          <List {...args} size={variant as 'sm' | 'md' | 'lg'} />
          <List
            {...args}
            titleProps={{ variant: 'h3', isLoading: true }}
            isLoading
            size={variant as 'sm' | 'md' | 'lg'}
          />
        </div>
      ))}
    </div>
  ),
}
