import type { Meta, StoryObj } from '@storybook/react'

import Tabs from '.'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreened',
  },
}

const tabs = [
  { label: 'Label 1', slug: 'label1', component: <>Content 1</> },
  { label: 'Label 2', slug: 'label2', component: <>Content 2</> },
  { label: 'Label 3', slug: 'label3', component: <>Content 3</> },
]

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/?tab=label2',
      },
    },
  },
  args: { className: 'className', name: 'tabsStory', tabs: tabs },
}
