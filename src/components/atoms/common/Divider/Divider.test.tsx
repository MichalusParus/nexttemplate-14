import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Divider } from '.'

expect.extend(toHaveNoViolations)

describe('Divider', () => {
  describe('Semantics', () => {
    it('renders as separator', () => {
      render(<Divider />)
      const divider = screen.getByRole('separator')

      expect(divider).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<Divider className="className" />)
      const divider = screen.getByRole('separator')

      expect(divider).toHaveClass('className')
    })

    it('forwards native props', () => {
      render(<Divider data-custom="test" />)
      const divider = screen.getByRole('separator')

      expect(divider).toHaveAttribute('data-custom', 'test')
    })

    it('horizontal by default', () => {
      render(<Divider />)
      const divider = screen.getByRole('separator')

      expect(divider).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('vertical orientation', () => {
      render(<Divider vertical />)
      const divider = screen.getByRole('separator')

      expect(divider).toHaveAttribute('aria-orientation', 'vertical')
    })

    it('custom width', () => {
      render(<Divider width="5px" />)
      const line = screen.getByTestId('Divider')

      expect(line).toHaveStyle({ height: '5px' })
    })

    it('renders one line without label', () => {
      render(<Divider />)
      const lines = screen.getAllByTestId('Divider')

      expect(lines).toHaveLength(1)
    })

    it('renders label with two lines', () => {
      render(<Divider label="label" />)
      const label = screen.getByText('label')
      const lines = screen.getAllByTestId('Divider')

      expect(label).toBeInTheDocument()
      expect(lines).toHaveLength(2)
    })

    it('decorative renders role none', () => {
      render(<Divider decorative />)
      const divider = screen.getByRole('none')

      expect(divider).toBeInTheDocument()
      expect(divider).not.toHaveAttribute('aria-orientation')
    })

    it('spanProps forwarded to label', () => {
      render(<Divider label="label" spanProps={{ className: 'spanClass' }} />)
      const span = screen.getByTestId('DividerSpan')

      expect(span).toHaveClass('spanClass')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Divider ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Divider />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
