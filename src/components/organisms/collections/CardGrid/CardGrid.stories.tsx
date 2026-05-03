import type { Meta, StoryObj } from '@storybook/nextjs'

import { Paper } from '@/components/atoms/containers/Paper'
import { Ghost } from '@/components/atoms/loaders/Ghost'
import { P } from '@/components/atoms/typography/P'

import { CardGrid, CardGridProps } from '.'

type Item = { id: string; title: string }

const sampleItems: Item[] = Array.from({ length: 5 }, (_, i) => ({
  id: String(i + 1),
  title: `Item ${i + 1}`,
}))

const renderItem = (item: Item) => (
  <Paper className="w-full p-4 md:w-48">
    <P>{item.title}</P>
  </Paper>
)

const renderGhost = () => (
  <Paper className="w-full md:w-48">
    <Ghost className="h-16 w-full" />
  </Paper>
)

const getKey = (item: Item) => item.id

const meta: Meta<CardGridProps<Item>> = {
  title: 'Organisms/Collections/CardGrid',
  component: CardGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<CardGridProps<Item>>

export const Default: Story = {
  args: {
    items: sampleItems,
    isLoading: false,
    renderItem,
    renderGhost,
    getKey,
    emptyState: undefined,
    ghostCount: undefined,
  },
}

export const Empty: Story = {
  args: {
    items: [],
    renderItem,
    renderGhost,
    getKey,
    emptyState: <P color="secondary">No items found</P>,
  },
}

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
    ghostCount: 6,
    renderItem,
    renderGhost,
    getKey,
  },
}
