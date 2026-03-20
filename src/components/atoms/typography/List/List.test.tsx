import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { List } from '.'
import { Li } from './Li/Li'

expect.extend(toHaveNoViolations)

describe('List', () => {
  describe('Semantics', () => {
    it('renders as ordered list with className and listStyleType', () => {
      render(<List className="className" listStyleType="list-circle" />)
      const list = screen.getByRole('list')

      expect(list).toBeInTheDocument()
      expect(list.tagName).toBe('OL')
      expect(list).toHaveClass('className')
      expect(list).toHaveClass('list-circle')
    })

    it('empty by default', () => {
      render(<List />)
      const items = screen.queryAllByRole('listitem')
      const statuses = screen.queryAllByRole('status')

      expect(items).toHaveLength(0)
      expect(statuses).toHaveLength(0)
    })

    it('ul type renders UL tag', () => {
      render(<List type="ul" listStyleType="list-decimal" />)
      const list = screen.getByRole('list')

      expect(list.tagName).toBe('UL')
      expect(list).toHaveClass('list-decimal')
    })

    it('content array renders list items with text', () => {
      render(<List content={['1', '2', '3']} />)
      const items = screen.queryAllByRole('listitem')

      expect(items).toHaveLength(3)
      expect(items[0]).toHaveTextContent('1')
      expect(items[1]).toHaveTextContent('2')
      expect(items[2]).toHaveTextContent('3')
    })

    it('children renders list items', () => {
      render(
        <List>
          {['1', '2', '3'].map(li => (
            <Li key={li}>{li}</Li>
          ))}
        </List>,
      )
      const items = screen.queryAllByRole('listitem')

      expect(items).toHaveLength(3)
      expect(items[0]).toHaveTextContent('1')
      expect(items[1]).toHaveTextContent('2')
      expect(items[2]).toHaveTextContent('3')
    })

    it('loading shows ghosts', () => {
      render(<List isLoading expectedLines={3} />)
      const statuses = screen.queryAllByRole('status')
      const items = screen.queryAllByRole('listitem')

      expect(statuses).toHaveLength(3)
      expect(items).toHaveLength(3)
    })

    it('ghostProps forwarded to ghost', () => {
      const { container } = render(<List isLoading expectedLines={1} ghostProps={{ className: 'ghostClass' }} />)
      const ghost = container.querySelector('.Ghost')

      expect(ghost).toHaveClass('ghostClass')
    })

    it('icon renders in each item', () => {
      render(<List content={['1', '2', '3']} icon={<svg data-testid="testSvg" />} />)
      const icons = screen.queryAllByTestId('testSvg')

      expect(icons).toHaveLength(3)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLOListElement>()
      render(<List ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLOListElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<List />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
