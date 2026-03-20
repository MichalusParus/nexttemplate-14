import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { ProgressBar } from '.'

expect.extend(toHaveNoViolations)

describe('ProgressBar', () => {
  describe('Semantics', () => {
    it('renders with role progressbar', () => {
      render(<ProgressBar />)
      const bar = screen.getByRole('progressbar')

      expect(bar).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<ProgressBar className="className" />)
      const bar = screen.getByRole('progressbar')

      expect(bar).toHaveClass('className')
    })

    it('aria-label is translated loading text', () => {
      render(<ProgressBar />)
      const bar = screen.getByRole('progressbar')

      expect(bar).toHaveAttribute('aria-label', 'loading')
    })

    it('default renders indeterminate without aria value attributes', () => {
      render(<ProgressBar />)
      const bar = screen.getByRole('progressbar')

      expect(bar).not.toHaveAttribute('aria-valuenow')
      expect(bar).not.toHaveAttribute('aria-valuemin')
      expect(bar).not.toHaveAttribute('aria-valuemax')
    })

    it('progress 0 renders determinate with zero width', () => {
      render(<ProgressBar progress={0} />)
      const bar = screen.getByRole('progressbar')
      const inner = bar.querySelector('.Progress')!

      expect(bar).toHaveAttribute('aria-valuenow', '0')
      expect(bar).toHaveAttribute('aria-valuemin', '0')
      expect(bar).toHaveAttribute('aria-valuemax', '100')
      expect(inner).toHaveStyle({ width: '0%' })
      expect(inner).not.toHaveClass('animate-progress-bar')
    })

    it('aria-valuenow reflects progress', () => {
      render(<ProgressBar progress={42} />)
      const bar = screen.getByRole('progressbar')

      expect(bar).toHaveAttribute('aria-valuenow', '42')
    })

    it('aria-valuemin is 0', () => {
      render(<ProgressBar progress={50} />)
      const bar = screen.getByRole('progressbar')

      expect(bar).toHaveAttribute('aria-valuemin', '0')
    })

    it('aria-valuemax is 100', () => {
      render(<ProgressBar progress={50} />)
      const bar = screen.getByRole('progressbar')

      expect(bar).toHaveAttribute('aria-valuemax', '100')
    })

    it('progress sets inner bar width', () => {
      render(<ProgressBar progress={42} />)
      const inner = screen.getByRole('progressbar').querySelector('.Progress')!

      expect(inner).toHaveStyle({ width: '42%' })
    })

    it('progress clamps above 100', () => {
      render(<ProgressBar progress={150} />)
      const bar = screen.getByRole('progressbar')
      const inner = bar.querySelector('.Progress')!

      expect(bar).toHaveAttribute('aria-valuenow', '100')
      expect(inner).toHaveStyle({ width: '100%' })
    })

    it('progress clamps below 0', () => {
      render(<ProgressBar progress={-10} />)
      const bar = screen.getByRole('progressbar')
      const inner = bar.querySelector('.Progress')!

      expect(bar).toHaveAttribute('aria-valuenow', '0')
      expect(inner).toHaveStyle({ width: '0%' })
    })

    it('determinate inner bar has transition style', () => {
      render(<ProgressBar progress={50} />)
      const inner = screen.getByRole('progressbar').querySelector('.Progress')!

      expect(inner).toHaveStyle({ transition: '200ms width linear' })
    })

    it('aria-valuetext supported via rest props', () => {
      render(<ProgressBar progress={42} aria-valuetext="42 of 100 files" />)
      const bar = screen.getByRole('progressbar')

      expect(bar).toHaveAttribute('aria-valuetext', '42 of 100 files')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<ProgressBar ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations determinate', async () => {
      const { container } = render(<ProgressBar progress={50} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('no axe violations indeterminate', async () => {
      const { container } = render(<ProgressBar />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
