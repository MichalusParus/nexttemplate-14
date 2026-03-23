import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { render, screen } from '../../../../../../.jest/customRender'
import { CarouselItem } from '.'

expect.extend(toHaveNoViolations)

describe('CarouselItem', () => {
  describe('Semantics', () => {
    it('role group with slide roledescription', () => {
      render(
        <CarouselItem>
          <div data-testid="panel" />
        </CarouselItem>,
      )
      const carouselItem = screen.getByTestId('CarouselItem')

      expect(carouselItem).toHaveAttribute('role', 'group')
      expect(carouselItem).toHaveAttribute('aria-roledescription', 'slide')
    })

    it('forwards className', () => {
      render(
        <CarouselItem className="className">
          <div data-testid="panel" />
        </CarouselItem>,
      )
      const carouselItem = screen.getByTestId('CarouselItem')

      expect(carouselItem).toHaveClass('className')
    })

    it('isActive defaults to true — no aria-hidden', () => {
      render(
        <CarouselItem>
          <div data-testid="panel" />
        </CarouselItem>,
      )
      const carouselItem = screen.getByTestId('CarouselItem')

      expect(carouselItem).not.toHaveAttribute('aria-hidden')
    })

    it('isActive=false sets aria-hidden', () => {
      render(
        <CarouselItem isActive={false}>
          <div data-testid="panel" />
        </CarouselItem>,
      )
      const carouselItem = screen.getByTestId('CarouselItem')

      expect(carouselItem).toHaveAttribute('aria-hidden', 'true')
    })

  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <CarouselItem>
          <div className="h-full w-full" data-testid="panel" />
          <div className="h-full w-full" data-testid="panel" />
          <div className="h-full w-full" data-testid="panel" />
        </CarouselItem>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
