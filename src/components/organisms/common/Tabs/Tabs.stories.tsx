import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { PlusIcon } from '@/components/atoms/icons'

import { tabsOptions, textContent } from '../../../../../.storybook/helpers'
import { Tabs } from '.'
import { TabsProps } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    tabs: { control: false },
    tabButtonProps: { control: false },
    selectProps: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Tabs<string>>

const TabsWithHooks = (args: TabsProps<string>) => {
  const [param, setParam] = useState<string>('label1')
  return (
    <div>
      <Tabs<string>
        {...args}
        name="tabs"
        selectedValue={param}
        tabs={args.tabs}
        onTabChange={setParam}
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
    selectedValue: '',
    tabs: tabsOptions,
    fullWidth: false,
    variant: 'text',
    color: 'primary',
    size: 'md',
    tabButtonProps: {},
    selectProps: {},
    children: undefined,
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

export const Content: Story = {
  args: {
    ...PrimaryDefault.args,
    tabs: tabsOptions.map(tab => ({
      ...tab,
      content: (
        <div className="flex gap-2">
          <PlusIcon />
          {tab.label}
        </div>
      ),
    })),
  },
  render: args => <TabsWithHooks {...args} />,
}

export const OptionalChildren: Story = {
  args: {
    ...PrimaryDefault.args,
    children: (
      <Button startIcon={<PlusIcon />} variant="text" color="error" size="sm" hideShadow>
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
        value: 'hidden',
        label: 'Hidden',
        isHidden: true,
        component: (
          <div className="flex h-96 flex-col items-center justify-start">
            <h2 className="text-2xl">Hidden content</h2>
            <p>{textContent.slice(0, 800)}</p>
          </div>
        ),
      },
    ],
  },
  render: args => <TabsWithHooks {...args} />,
}
