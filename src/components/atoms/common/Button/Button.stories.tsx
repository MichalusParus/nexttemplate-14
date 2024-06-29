import type { Meta, StoryObj } from '@storybook/react'

import ProfileIcon from '../../icons/ProfileIcon'
import Button from '.'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Common/Button',
  component: Button,
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
type Story = StoryObj<typeof Button>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    startIcon: undefined,
    endIcon: undefined,
    isLoading: false,
    fullWidth: false,
    hideShadow: false,
    disableUpperCase: false,
    onClick: () => console.log('Click'),
    children: 'Button',
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
  args: { ...PrimaryDefault.args, startIcon: <ProfileIcon /> },
}

export const EndIcon: Story = {
  args: { ...PrimaryDefault.args, endIcon: <ProfileIcon /> },
}

export const IsLoading: Story = {
  args: { ...PrimaryDefault.args, startIcon: <ProfileIcon />, isLoading: true },
}

export const FullWidth: Story = {
  args: { ...PrimaryDefault.args, fullWidth: true },
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
    children: 'inline button',
  },
  render: args => (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit
      <Button {...args} />. Obcaecati provident alias incidunt earum facilis, placeat aperiam nam
      enim explicabo ad fuga <Button {...args} startIcon={<ProfileIcon />} /> molestiae ullam unde
      expedita ut hic porro, perspiciatis ex officiis nesciunt sit ea harum tempore? Eius, harum sit
      dolore ducimus odio modi delectus rerum commodi fugit, aliquid inventore officiis.
    </p>
  ),
}

export const Disabled: Story = {
  args: { ...PrimaryDefault.args, disabled: true },
}
