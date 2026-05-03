import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { InfiniteScroll } from '.'

expect.extend(toHaveNoViolations)

// --- IntersectionObserver mock ---
type IntersectionCallback = (entries: Partial<IntersectionObserverEntry>[]) => void

type ObserverInstance = {
  callback: IntersectionCallback
  options?: IntersectionObserverInit
  elements: Element[]
  disconnect: () => void
}

let observerInstances: ObserverInstance[] = []

const triggerIntersection = (element: Element, isIntersecting: boolean) => {
  for (const instance of observerInstances) {
    if (instance.elements.includes(element)) {
      instance.callback([{ isIntersecting, target: element }])
    }
  }
}

let originalIntersectionObserver: typeof IntersectionObserver | undefined

beforeEach(() => {
  observerInstances = []

  class MockIntersectionObserver {
    private instance: ObserverInstance

    constructor(callback: IntersectionCallback, options?: IntersectionObserverInit) {
      this.instance = {
        callback,
        options,
        elements: [],
        disconnect: jest.fn(),
      }
      observerInstances.push(this.instance)
    }

    observe(el: Element) {
      this.instance.elements.push(el)
    }

    unobserve() {}

    disconnect() {
      this.instance.disconnect()
    }

    takeRecords() {
      return []
    }
  }

  originalIntersectionObserver = global.IntersectionObserver
  ;(global as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    MockIntersectionObserver
})

afterEach(() => {
  ;(global as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    originalIntersectionObserver
  jest.restoreAllMocks()
})

describe('InfiniteScroll', () => {
  describe('Semantics', () => {
    it('renders children', () => {
      render(
        <InfiniteScroll>
          <div data-testid="child">Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByTestId('child')).toHaveTextContent('Content')
    })

    it('forwards className', () => {
      render(
        <InfiniteScroll className="custom-class">
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByTestId('InfiniteScroll')).toHaveClass('custom-class')
    })

    it('renders bottom sentinel when bottom is provided', () => {
      render(
        <InfiniteScroll bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByTestId('InfiniteScroll-BottomSentinel')).toBeInTheDocument()
      expect(screen.queryByTestId('InfiniteScroll-TopSentinel')).not.toBeInTheDocument()
    })

    it('renders top sentinel when top is provided', () => {
      render(
        <InfiniteScroll top={{ has: true, onLoad: jest.fn(), generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByTestId('InfiniteScroll-TopSentinel')).toBeInTheDocument()
      expect(screen.queryByTestId('InfiniteScroll-BottomSentinel')).not.toBeInTheDocument()
    })

    it('renders both sentinels when top and bottom are provided', () => {
      render(
        <InfiniteScroll
          top={{ has: true, onLoad: jest.fn(), generation: 0 }}
          bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}
        >
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByTestId('InfiniteScroll-TopSentinel')).toBeInTheDocument()
      expect(screen.getByTestId('InfiniteScroll-BottomSentinel')).toBeInTheDocument()
    })

    it('renders no sentinels when neither top nor bottom is provided', () => {
      render(
        <InfiniteScroll>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.queryByTestId('InfiniteScroll-TopSentinel')).not.toBeInTheDocument()
      expect(screen.queryByTestId('InfiniteScroll-BottomSentinel')).not.toBeInTheDocument()
    })

    it('sentinels are aria-hidden', () => {
      render(
        <InfiniteScroll
          top={{ has: true, onLoad: jest.fn(), generation: 0 }}
          bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}
        >
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByTestId('InfiniteScroll-TopSentinel')).toHaveAttribute('aria-hidden')
      expect(screen.getByTestId('InfiniteScroll-BottomSentinel')).toHaveAttribute('aria-hidden')
    })
  })

  describe('Built-in UI', () => {
    it('renders loading indicator when bottom.isLoading', () => {
      render(
        <InfiniteScroll bottom={{ has: true, onLoad: jest.fn(), isLoading: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('does not render loading indicator when not loading', () => {
      render(
        <InfiniteScroll bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    it('renders loading indicator when top.isLoading', () => {
      render(
        <InfiniteScroll top={{ has: true, onLoad: jest.fn(), isLoading: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders end reached text when bottom.has=false', () => {
      render(
        <InfiniteScroll bottom={{ has: false, onLoad: jest.fn(), generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByText('No more items')).toBeInTheDocument()
    })

    it('does not render end reached when bottom.has=true', () => {
      render(
        <InfiniteScroll bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.queryByText('No more items')).not.toBeInTheDocument()
    })

    it('does not render end reached when loading', () => {
      render(
        <InfiniteScroll bottom={{ has: false, onLoad: jest.fn(), isLoading: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.queryByText('No more items')).not.toBeInTheDocument()
    })

    it('does not render end reached when error', () => {
      render(
        <InfiniteScroll bottom={{ has: false, onLoad: jest.fn(), isError: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.queryByText('No more items')).not.toBeInTheDocument()
    })

    it('renders end reached text when top.has=false', () => {
      render(
        <InfiniteScroll top={{ has: false, onLoad: jest.fn(), generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByText('No more items')).toBeInTheDocument()
    })

    it('renders error with retry button when bottom.isError', () => {
      render(
        <InfiniteScroll bottom={{ has: true, onLoad: jest.fn(), isError: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByText('Failed to load more items')).toBeInTheDocument()
      expect(screen.getByText('Retry')).toBeInTheDocument()
    })

    it('retry button calls bottom.onLoad', () => {
      const onLoad = jest.fn()
      render(
        <InfiniteScroll bottom={{ has: true, onLoad, isError: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      screen.getByText('Retry').click()
      expect(onLoad).toHaveBeenCalledTimes(1)
    })

    it('does not render error when not in error state', () => {
      render(
        <InfiniteScroll bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.queryByText('Failed to load more items')).not.toBeInTheDocument()
    })

    it('renders error for top direction', () => {
      render(
        <InfiniteScroll top={{ has: true, onLoad: jest.fn(), isError: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(screen.getByText('Failed to load more items')).toBeInTheDocument()
      expect(screen.getByText('Retry')).toBeInTheDocument()
    })
  })

  describe('Observer behavior', () => {
    it('calls bottom.onLoad when bottom sentinel intersects', () => {
      const onLoad = jest.fn()
      render(
        <InfiniteScroll bottom={{ has: true, onLoad, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-BottomSentinel')
      triggerIntersection(sentinel, true)

      expect(onLoad).toHaveBeenCalledTimes(1)
    })

    it('does not call bottom.onLoad when bottom.isLoading=true', () => {
      const onLoad = jest.fn()
      render(
        <InfiniteScroll bottom={{ has: true, onLoad, isLoading: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-BottomSentinel')
      triggerIntersection(sentinel, true)

      expect(onLoad).not.toHaveBeenCalled()
    })

    it('does not call bottom.onLoad when bottom.isError=true', () => {
      const onLoad = jest.fn()
      render(
        <InfiniteScroll bottom={{ has: true, onLoad, isError: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-BottomSentinel')
      triggerIntersection(sentinel, true)

      expect(onLoad).not.toHaveBeenCalled()
    })

    it('does not call bottom.onLoad when bottom.has=false', () => {
      const onLoad = jest.fn()
      render(
        <InfiniteScroll bottom={{ has: false, onLoad, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-BottomSentinel')
      triggerIntersection(sentinel, true)

      expect(onLoad).not.toHaveBeenCalled()
    })

    it('calls top.onLoad when top sentinel intersects', () => {
      const onLoad = jest.fn()
      render(
        <InfiniteScroll
          top={{ has: true, onLoad, generation: 0 }}
          bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}
        >
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-TopSentinel')
      triggerIntersection(sentinel, true)

      expect(onLoad).toHaveBeenCalledTimes(1)
    })

    it('does not fire on non-intersecting entries', () => {
      const onLoad = jest.fn()
      render(
        <InfiniteScroll bottom={{ has: true, onLoad, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-BottomSentinel')
      triggerIntersection(sentinel, false)

      expect(onLoad).not.toHaveBeenCalled()
    })

    it('fires at most once per generation; re-arms when generation bumps', () => {
      const onLoad = jest.fn()
      const { rerender } = render(
        <InfiniteScroll bottom={{ has: true, onLoad, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-BottomSentinel')

      // First intersection — fires
      triggerIntersection(sentinel, true)
      expect(onLoad).toHaveBeenCalledTimes(1)

      // Repeated intersections with same generation — must NOT fire again
      triggerIntersection(sentinel, true)
      triggerIntersection(sentinel, false)
      triggerIntersection(sentinel, true)
      expect(onLoad).toHaveBeenCalledTimes(1)

      // Consumer commits new data → bumps generation → re-arm reads geometry
      // (jsdom rects evaluate as in-zone) and fires for the new generation.
      rerender(
        <InfiniteScroll bottom={{ has: true, onLoad, generation: 1 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )
      expect(onLoad).toHaveBeenCalledTimes(2)

      // Same generation again — no fire
      triggerIntersection(sentinel, true)
      expect(onLoad).toHaveBeenCalledTimes(2)
    })

    it('fires after disabled flips false even if intersection happened while disabled', () => {
      const onLoad = jest.fn()
      const { rerender } = render(
        <InfiniteScroll bottom={{ has: true, onLoad, generation: 0, isLoading: true }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const sentinel = screen.getByTestId('InfiniteScroll-BottomSentinel')

      // Sentinel comes into view while the side is disabled — must NOT fire
      triggerIntersection(sentinel, true)
      expect(onLoad).not.toHaveBeenCalled()

      // Consumer flips disabled false (loading completed) — must fire,
      // even though no fresh IO transition has occurred
      rerender(
        <InfiniteScroll bottom={{ has: true, onLoad, generation: 0, isLoading: false }}>
          <div>Content</div>
        </InfiniteScroll>,
      )
      expect(onLoad).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <InfiniteScroll ref={ref}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <InfiniteScroll>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('no axe violations with both directions', async () => {
      const { container } = render(
        <InfiniteScroll
          top={{ has: true, onLoad: jest.fn(), generation: 0 }}
          bottom={{ has: true, onLoad: jest.fn(), generation: 0 }}
        >
          <div>Content</div>
        </InfiniteScroll>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('no axe violations with error state', async () => {
      const { container } = render(
        <InfiniteScroll bottom={{ has: true, onLoad: jest.fn(), isError: true, generation: 0 }}>
          <div>Content</div>
        </InfiniteScroll>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
