import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Title } from '.'

expect.extend(toHaveNoViolations)

describe('Title', () => {
  describe('Semantics', () => {
    it('renders as heading with correct text', () => {
      render(<Title variant="h1">Title</Title>)
      const heading = screen.getByRole('heading')

      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Title')
      expect(heading.tagName).toBe('H1')
    })

    it('renders correct tagname for variant', () => {
      render(<Title variant="h2">Title</Title>)
      const heading = screen.getByRole('heading')

      expect(heading.tagName).toBe('H2')
    })

    it('forwards className', () => {
      render(
        <Title variant="h1" className="className">
          Title
        </Title>,
      )
      const heading = screen.getByRole('heading')

      expect(heading).toHaveClass('className')
    })

    it('align class applied', () => {
      render(
        <Title variant="h1" align="text-center">
          Title
        </Title>,
      )
      const heading = screen.getByRole('heading')

      expect(heading).toHaveClass('text-center')
    })

    it('w-full and font-semibold base classes', () => {
      render(<Title variant="h1">Title</Title>)
      const heading = screen.getByRole('heading')

      expect(heading).toHaveClass('w-full')
      expect(heading).toHaveClass('font-semibold')
    })

    it('loading shows ghost', () => {
      render(
        <Title variant="h1" isLoading>
          Title
        </Title>,
      )
      const statusQuery = screen.queryAllByRole('status')

      expect(statusQuery).toHaveLength(1)
    })

    it('ghostProps forwarded to ghost', () => {
      const { container } = render(
        <Title variant="h1" isLoading ghostProps={{ className: 'w-20' }}>
          Title
        </Title>,
      )
      const ghost = container.querySelector('.Ghost')

      expect(ghost).toHaveClass('w-20')
    })

    it('loading hides children', () => {
      render(
        <Title variant="h1" isLoading>
          Title
        </Title>,
      )
      const textQuery = screen.queryByText('Title')

      expect(textQuery).toBeNull()
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLHeadingElement>()
      render(
        <Title variant="h1" ref={ref}>
          Title
        </Title>,
      )

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Title variant="h1">Title</Title>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
