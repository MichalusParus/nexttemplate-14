import type { Meta, StoryObj } from '@storybook/nextjs'
import { useCallback, useRef, useState } from 'react'

import { Paper } from '@/components/atoms/containers/Paper'
import { P } from '@/components/atoms/typography/P'

import { InfiniteScroll, InfiniteScrollProps } from '.'

const meta: Meta<InfiniteScrollProps> = {
  title: 'Organisms/Collections/InfiniteScroll',
  component: InfiniteScroll,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<InfiniteScrollProps>

const Item = ({ children }: { children: React.ReactNode }) => (
  <Paper className="p-4">
    <P>{children}</P>
  </Paper>
)

const DefaultExample = () => {
  const [items, setItems] = useState(() => Array.from({ length: 40 }, (_, i) => i + 1))
  const [isLoading, setIsLoading] = useState(false)
  const [has, setHas] = useState(true)

  const onLoad = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setItems(prev => {
        const next = Array.from({ length: 40 }, (_, i) => prev.length + i + 1)
        const all = [...prev, ...next]
        if (all.length >= 200) setHas(false)
        return all
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="h-160 overflow-auto">
      <InfiniteScroll bottom={{ has, onLoad, isLoading, generation: items.length }}>
        <div className="flex flex-col gap-2">
          {items.map(n => (
            <Item key={n}>Item {n}</Item>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export const Default: Story = {
  render: () => <DefaultExample />,
}

const BidirectionalExample = () => {
  const [range, setRange] = useState({ start: -20, end: 20 })
  const [isLoadingBottom, setIsLoadingBottom] = useState(false)
  const [isLoadingTop, setIsLoadingTop] = useState(false)

  const hasScrolled = useRef(false)
  const middleRef = useCallback((node: HTMLDivElement | null) => {
    if (node && !hasScrolled.current) {
      hasScrolled.current = true
      node.scrollIntoView({ block: 'center', behavior: 'instant' })
    }
  }, [])

  const loadBottom = useCallback(() => {
    setIsLoadingBottom(true)
    setTimeout(() => {
      setRange(prev => ({ ...prev, start: prev.start - 40 }))
      setIsLoadingBottom(false)
    }, 800)
  }, [])

  const loadTop = useCallback(() => {
    setIsLoadingTop(true)
    setTimeout(() => {
      setRange(prev => ({ ...prev, end: prev.end + 40 }))
      setIsLoadingTop(false)
    }, 800)
  }, [])

  const items = Array.from({ length: range.end - range.start }, (_, i) => range.start + i).reverse()

  return (
    <div className="h-160 overflow-auto">
      <InfiniteScroll
        top={{ has: true, onLoad: loadTop, isLoading: isLoadingTop, generation: range.end }}
        bottom={{
          has: true,
          onLoad: loadBottom,
          isLoading: isLoadingBottom,
          generation: range.start,
        }}
      >
        <div className="flex flex-col gap-2">
          {items.map(n => (
            <div key={n} ref={n === 0 ? middleRef : undefined}>
              <Item>Item {n}</Item>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export const Bidirectional: Story = {
  render: () => <BidirectionalExample />,
}

export const Loading: Story = {
  render: () => (
    <InfiniteScroll bottom={{ has: true, onLoad: () => {}, isLoading: true, generation: 0 }}>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <Item key={i}>Item {i + 1}</Item>
        ))}
      </div>
    </InfiniteScroll>
  ),
}

export const WithError: Story = {
  render: () => (
    <InfiniteScroll bottom={{ has: true, onLoad: () => {}, isError: true, generation: 0 }}>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <Item key={i}>Item {i + 1}</Item>
        ))}
      </div>
    </InfiniteScroll>
  ),
}
