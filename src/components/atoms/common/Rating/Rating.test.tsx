import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Rating } from '.'

expect.extend(toHaveNoViolations)

const fillOf = (i: number) =>
  Number(screen.getByTestId(`RatingStar-${i}`).getAttribute('data-fill'))

describe('Rating', () => {
  describe('Semantics', () => {
    it('renders as div with role img', () => {
      render(<Rating value={3} />)
      const rating = screen.getByTestId('Rating')
      expect(rating).toBeInTheDocument()
      expect(rating).toHaveAttribute('role', 'img')
    })

    it('forwards className', () => {
      render(<Rating value={3} className="custom" />)
      expect(screen.getByTestId('Rating')).toHaveClass('custom')
    })

    it('renders custom aria-label when provided', () => {
      render(<Rating value={3} aria-label="My rating: 3 of 5" />)
      expect(screen.getByLabelText('My rating: 3 of 5')).toBeInTheDocument()
    })
  })

  describe('Fill', () => {
    it('renders default 5 stars', () => {
      render(<Rating value={3} />)
      expect(screen.getAllByTestId(/^RatingStar-/)).toHaveLength(5)
    })

    it('respects custom max', () => {
      render(<Rating value={4} max={10} />)
      expect(screen.getAllByTestId(/^RatingStar-/)).toHaveLength(10)
    })

    it('fills integer values fully', () => {
      render(<Rating value={3} />)
      expect(fillOf(0)).toBe(1)
      expect(fillOf(1)).toBe(1)
      expect(fillOf(2)).toBe(1)
      expect(fillOf(3)).toBe(0)
      expect(fillOf(4)).toBe(0)
    })

    it('supports fractional fill on the active star', () => {
      render(<Rating value={2.5} />)
      expect(fillOf(0)).toBe(1)
      expect(fillOf(1)).toBe(1)
      expect(fillOf(2)).toBe(0.5)
      expect(fillOf(3)).toBe(0)
    })

    it('clamps value above max', () => {
      render(<Rating value={99} max={5} />)
      expect(fillOf(4)).toBe(1)
    })

    it('clamps negative value', () => {
      render(<Rating value={-1} />)
      expect(fillOf(0)).toBe(0)
    })

    it('treats NaN as 0 and avoids "NaN" in the aria-label', () => {
      render(<Rating value={NaN} />)
      expect(fillOf(0)).toBe(0)
      expect(fillOf(4)).toBe(0)
      expect(screen.getByTestId('Rating')).toHaveAttribute('aria-label', 'Rating: 0 of 5')
    })

    it('treats Infinity as 0 (non-finite guard)', () => {
      render(<Rating value={Infinity} />)
      expect(fillOf(0)).toBe(0)
    })
  })

  describe('Custom icon', () => {
    it('renders custom icon nodes', () => {
      render(<Rating value={2} icon={<svg data-testid="customIcon" />} />)
      expect(screen.getAllByTestId('customIcon')).toHaveLength(10)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Rating ref={ref} value={3} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Compact mode', () => {
    it('renders exactly one icon and a superscript number, no star spans', () => {
      render(<Rating compact value={3} />)
      expect(screen.getByTestId('RatingCompactIcon')).toBeInTheDocument()
      expect(screen.getByTestId('RatingCompactSup')).toHaveTextContent('3')
      expect(screen.queryAllByTestId(/^RatingStar-/)).toHaveLength(0)
    })

    it('rounds fractional value for the superscript', () => {
      render(<Rating compact value={3.6} />)
      expect(screen.getByTestId('RatingCompactSup')).toHaveTextContent('4')
    })

    it('opacity is 1 at value=max', () => {
      render(<Rating compact value={5} max={5} />)
      expect(screen.getByTestId('RatingCompactIcon')).toHaveStyle({ opacity: '1' })
    })

    it('opacity is value/max for lower values', () => {
      render(<Rating compact value={1} max={5} />)
      expect(screen.getByTestId('RatingCompactIcon')).toHaveStyle({ opacity: '0.2' })
    })

    it('clamps value below 1 to 1', () => {
      render(<Rating compact value={0} max={5} />)
      expect(screen.getByTestId('RatingCompactSup')).toHaveTextContent('1')
    })

    it('clamps value above max to max', () => {
      render(<Rating compact value={99} max={5} />)
      expect(screen.getByTestId('RatingCompactSup')).toHaveTextContent('5')
    })

    it('default aria-label says "Level"', () => {
      render(<Rating compact value={3} max={5} />)
      expect(screen.getByTestId('Rating')).toHaveAttribute('aria-label', 'Level: 3 of 5')
    })

    it('custom aria-label still wins', () => {
      render(<Rating compact value={3} aria-label="Difficulty: hard" />)
      expect(screen.getByTestId('Rating')).toHaveAttribute('aria-label', 'Difficulty: hard')
    })

    it('no axe violations (compact)', async () => {
      const { container } = render(<Rating compact value={3} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Rating value={3} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
