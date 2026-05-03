import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { CardGrid } from '.'

expect.extend(toHaveNoViolations)

type Item = { id: string; name: string }
const items: Item[] = [
  { id: '1', name: 'Alpha' },
  { id: '2', name: 'Bravo' },
  { id: '3', name: 'Charlie' },
]
const getKey = (item: Item) => item.id
const renderItem = (item: Item) => <div data-testid={`item-${item.id}`}>{item.name}</div>
const renderGhost = () => <div data-testid="ghost">Loading...</div>

describe('CardGrid', () => {
  describe('Semantics', () => {
    it('renders items', () => {
      render(
        <CardGrid
          items={items}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )
      const grid = screen.getByTestId('CardGrid')

      expect(grid).toBeInTheDocument()
      expect(screen.getByTestId('item-1')).toHaveTextContent('Alpha')
      expect(screen.getByTestId('item-2')).toHaveTextContent('Bravo')
      expect(screen.getByTestId('item-3')).toHaveTextContent('Charlie')
    })

    it('forwards className to grid container', () => {
      render(
        <CardGrid
          className="custom-class"
          items={items}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )
      const gridInner = screen.getByTestId('CardGrid')

      expect(gridInner).toHaveClass('custom-class')
    })

    it('does not set aria-busy when not loading', () => {
      render(
        <CardGrid
          items={items}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )
      const gridInner = screen.getByTestId('CardGrid')

      expect(gridInner).not.toHaveAttribute('aria-busy')
    })
  })

  describe('Loading', () => {
    it('renders default 3 ghost items when loading without ghostCount', () => {
      render(
        <CardGrid
          items={[]}
          isLoading
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )
      const ghosts = screen.getAllByTestId('ghost')

      expect(ghosts).toHaveLength(3)
    })

    it('renders ghostCount ghost items when loading', () => {
      render(
        <CardGrid
          items={[]}
          isLoading
          ghostCount={5}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )
      const ghosts = screen.getAllByTestId('ghost')

      expect(ghosts).toHaveLength(5)
    })

    it('sets aria-busy when loading', () => {
      render(
        <CardGrid
          items={[]}
          isLoading
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )
      const gridInner = screen.getByTestId('CardGrid')

      expect(gridInner).toHaveAttribute('aria-busy', 'true')
    })

    it('does not render items when loading', () => {
      render(
        <CardGrid
          items={items}
          isLoading
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )

      expect(screen.queryByTestId('item-1')).not.toBeInTheDocument()
    })
  })

  describe('Empty state', () => {
    it('renders emptyState inside grid when items is empty and not loading', () => {
      render(
        <CardGrid
          items={[]}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
          emptyState={<p data-testid="empty">No items</p>}
        />,
      )
      const grid = screen.getByTestId('CardGrid')

      expect(grid).toBeInTheDocument()
      expect(screen.getByTestId('empty')).toHaveTextContent('No items')
    })

    it('renders empty grid when items is empty and no emptyState provided', () => {
      render(
        <CardGrid items={[]} getKey={getKey} renderItem={renderItem} renderGhost={renderGhost} />,
      )
      const grid = screen.getByTestId('CardGrid')

      expect(grid).toBeInTheDocument()
      expect(grid.children).toHaveLength(0)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <CardGrid
          ref={ref}
          items={items}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <CardGrid
          items={items}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('no axe violations when loading', async () => {
      const { container } = render(
        <CardGrid
          items={[]}
          isLoading
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
        />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('no axe violations with empty state', async () => {
      const { container } = render(
        <CardGrid
          items={[]}
          getKey={getKey}
          renderItem={renderItem}
          renderGhost={renderGhost}
          emptyState={<p>No items</p>}
        />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
