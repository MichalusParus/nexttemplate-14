import type { Meta, StoryObj } from '@storybook/react'

import { ProfileIcon } from '../../icons'
import { Link } from '.'

const meta: Meta<typeof Link> = {
  title: 'Atoms/Common/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    startIcon: { control: false },
    endIcon: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    startIcon: undefined,
    endIcon: undefined,
    hideShadow: false,
    disableUpperCase: false,
    href: '#',
    children: 'Link',
  },
}

export const IconOnly: Story = {
  args: {
    ...PrimaryDefault.args,
    startIcon: <ProfileIcon />,
    children: undefined,
  },
}

export const StartIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    startIcon: <ProfileIcon />,
  },
}

export const EndIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    endIcon: <ProfileIcon />,
  },
}

export const FullWidth: Story = {
  args: { ...PrimaryDefault.args, className: 'w-full' },
  parameters: {
    layout: 'padded',
  },
}

export const Inline: Story = {
  args: {
    ...PrimaryDefault.args,
    variant: 'text',
    size: 'inline',
    disableUpperCase: true,
    children: 'inline link',
  },
  render: args => (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit
      <Link {...args} />. Obcaecati provident alias incidunt earum facilis, placeat aperiam nam enim
      explicabo ad fuga <Link {...args} startIcon={<ProfileIcon />} /> molestiae ullam unde expedita
      ut hic porro, perspiciatis ex officiis nesciunt sit ea harum tempore? Eius, harum sit dolore
      ducimus odio modi delectus rerum commodi fugit, aliquid inventore officiis.
    </p>
  ),
}
