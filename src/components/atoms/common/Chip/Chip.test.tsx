import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Chip } from '.'

expect.extend(toHaveNoViolations)

describe('Chip', () => {
  describe('Semantics', () => {
    it('renders as div', () => {
      render(<Chip>Chip</Chip>)
      const chip = screen.getByTestId('Chip')

      expect(chip).toBeInTheDocument()
      expect(chip).toHaveTextContent('Chip')
    })

    it('forwards className', () => {
      render(<Chip className="className">Chip</Chip>)
      const chip = screen.getByTestId('Chip')

      expect(chip).toHaveClass('className')
    })

    it('no role attribute', () => {
      render(<Chip>Chip</Chip>)
      const chip = screen.getByTestId('Chip')

      expect(chip).not.toHaveAttribute('role')
    })

    it('renders title and children', () => {
      render(<Chip title="Chip title">Chip info</Chip>)
      const title = screen.getByText('Chip title')
      const info = screen.getByText('Chip info')

      expect(title).toBeInTheDocument()
      expect(info).toBeInTheDocument()
    })

    it('renders title only', () => {
      render(<Chip title="Chip title" />)
      const title = screen.getByText('Chip title')

      expect(title).toBeInTheDocument()
    })

    it('startIcon renders', () => {
      render(
        <Chip startIcon={<svg role="img" />}>Chip</Chip>,
      )
      const icon = screen.getByRole('img')

      expect(icon).toBeInTheDocument()
    })

    it('endIcon renders', () => {
      render(
        <Chip endIcon={<svg role="img" />}>Chip</Chip>,
      )
      const icon = screen.getByRole('img')

      expect(icon).toBeInTheDocument()
    })

    it('startIcon and endIcon render together', () => {
      render(
        <Chip
          startIcon={<svg data-testid="startIcon" />}
          endIcon={<svg data-testid="endIcon" />}
        >
          Chip
        </Chip>,
      )
      const startIcon = screen.getByTestId('startIcon')
      const endIcon = screen.getByTestId('endIcon')

      expect(startIcon).toBeInTheDocument()
      expect(endIcon).toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Chip ref={ref}>Chip</Chip>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Chip>Chip</Chip>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
