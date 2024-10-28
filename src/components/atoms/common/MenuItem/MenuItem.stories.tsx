import type { Meta, StoryObj } from '@storybook/react'

import { MenuItem } from '.'

const meta: Meta<typeof MenuItem> = {
  title: 'Atoms/Common/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="border" role="menu">
        Menu Title
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuItem>

export const ButtonMenuItem: Story = {
  args: {
    buttonProps: { children: 'Button Menu Item' },
    linkProps: undefined,
  },
}

export const LinkMenuItem: Story = {
  args: {
    buttonProps: undefined,
    linkProps: { href: '#', children: 'Link Menu Item' },
  },
}

export const ButtonMenuItemGroup: Story = {
  args: {
    buttonProps: { children: 'Button Menu Item' },
    linkProps: undefined,
  },
  render: args => {
    return (
      <>
        <MenuItem {...args} />
        <MenuItem {...args} />
        <MenuItem {...args} />
      </>
    )
  },
}

export const LinkMenuItemGroup: Story = {
  args: {
    buttonProps: undefined,
    linkProps: { href: '#', children: 'Link Menu Item' },
  },
  render: args => {
    return (
      <>
        <MenuItem {...args} />
        <MenuItem {...args} />
        <MenuItem {...args} />
      </>
    )
  },
}
