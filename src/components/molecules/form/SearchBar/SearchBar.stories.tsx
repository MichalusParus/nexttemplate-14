import type { Meta, StoryObj } from '@storybook/react'

import SearchBar from '.'

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/Form/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      router: {
        navigation: {
          basePath: '/',
        },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'searchStory',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placeholder: '',
    width: 'w-full',
    url: 'search?search=',
    onSubmit: undefined,
    onChange: undefined,
  },
}

export const OnChange: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'searchStory2',
    onChange: value => {
      console.log(value)
    },
  },
}

export const OnSubmit: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'searchStory3',
    onSubmit: v => {
      console.log(v)
    },
  },
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'searchStory4',
    disabled: true,
  },
}
