import type { Meta, StoryObj } from '@storybook/nextjs'
import { ReactNode } from 'react'

import { Alert } from '@/components/atoms/common/Alert'
import { Button } from '@/components/atoms/common/Button'
import { PlusIcon } from '@/components/atoms/icons'

import { Tooltip } from '.'

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Popovers/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    className: '',
    title: 'tooltip',
    placement: 'top',
    offset: undefined,
    delay: 500,
    touchDelay: 500,
    hidePointer: false,
    portalContainerId: undefined,
    children: <Button startIcon={<PlusIcon />} />,
  },
}

export const HidePointer: Story = {
  args: {
    ...Default.args,
    hidePointer: true,
  },
}

export const Element: Story = {
  args: {
    ...Default.args,
    className: 'p-0!',
    title: (
      <Alert status="info" variant="contained">
        info
      </Alert>
    ) as ReactNode,
  },
}

export const Lazy: Story = {
  args: {
    ...Default.args,
    lazy: true,
    title: 'Lazy tooltip — no wrapper div',
    children: <Button startIcon={<PlusIcon />} />,
  },
}
