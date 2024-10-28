import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { PlusIcon } from '@/components/atoms/icons'

import { tabs, textContent } from '../../../../../.storybook/helpers'
import { Tabs } from '.'
import { TabsProps } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    tabs: { control: false },
    buttonProps: { control: false },
    linkProps: { control: false },
    menuProps: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const TabsWithHooks = (args: TabsProps) => {
  const [param, setParam] = useState('label1')
  return (
    <div>
      <Tabs
        {...args}
        name="tabs"
        param={param}
        tabs={args.tabs}
        onTabClick={tab => setParam(tab.slug)}
      />
      {args.tabs.length === 4 && (
        <button onClick={() => setParam('hidden')}>Click to show hidden tab</button>
      )}
    </div>
  )
}

export const PrimaryDefault: Story = {
  args: {
    className: 'className',
    name: 'tabsStory',
    param: '',
    tabs: tabs,
    variant: 'text',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    buttonProps: {},
    linkProps: {},
    menuProps: {},
    onTabClick: undefined,
    children: undefined,
  },
  render: args => <TabsWithHooks {...args} />,
}

export const OptionalChildren: Story = {
  args: {
    ...PrimaryDefault.args,
    children: (
      <Button
        startIcon={<PlusIcon />}
        variant="text"
        color="error"
        size="sm"
        disableUpperCase
        hideShadow
      >
        Custom Button
      </Button>
    ),
  },
  render: args => <TabsWithHooks {...args} />,
}

export const HiddenTab: Story = {
  args: {
    ...PrimaryDefault.args,
    tabs: [
      ...(PrimaryDefault?.args?.tabs || []),
      {
        slug: 'hidden',
        label: 'Hidden',
        isHidden: true,
        component: (
          <div className="flex h-96 flex-col items-center justify-center">
            <h2 className="text-2xl">Hidden content</h2>
            <p>{textContent.slice(0, 800)}</p>
          </div>
        ),
      },
    ],
  },
  render: args => <TabsWithHooks {...args} />,
}

export const FullWidth: Story = {
  args: {
    ...PrimaryDefault.args,
    fullWidth: true,
  },
  render: args => <TabsWithHooks {...args} />,
}
