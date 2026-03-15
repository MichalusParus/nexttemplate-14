import type { Meta, StoryObj } from '@storybook/nextjs'

import { textContent } from '../../../../../.storybook/helpers'
import { ScrollShadow } from '.'

const meta: Meta<typeof ScrollShadow> = {
  title: 'Atoms/Containers/ScrollShadow',
  component: ScrollShadow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof ScrollShadow>

export const Default: Story = {
  args: {
    className: '',
    height: 'max-h-96',
    color: 'from-bg',
    padding: undefined,
    gutter: false,
    disableHorizontal: false,
    children: textContent,
  },
}

export const Horizontal: Story = {
  args: {
    ...Default.args,
    className: 'max-w-full',
    children: <div className="w-[400%]">{textContent}</div>,
  },
}

export const FullScroll: Story = {
  args: {
    ...Default.args,
    className: 'w-full',
    height: 'h-56',
    children: <div className="w-[150%]">{textContent}</div>,
  },
}
