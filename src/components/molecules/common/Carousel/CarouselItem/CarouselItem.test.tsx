import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { render, screen } from '../../../../../../.jest/customRender'
import { CarouselItem } from '.'

expect.extend(toHaveNoViolations)

describe('CarouselItem', () => {
  it('default', () => {
    render(
      <CarouselItem className="className" selectedPage={1} pages={3}>
        <div className="h-full w-full" data-testid="panel" />
        <div className="h-full w-full" data-testid="panel" />
        <div className="h-full w-full" data-testid="panel" />
      </CarouselItem>,
    )
    const carouselItemTestId = screen.getByTestId('CarouselItem')
    const panelTestIds = screen.getAllByTestId('panel')
    const srOnlyTestId = screen.getByTestId('CarouselItemSrOnly')

    expect(carouselItemTestId).toBeInTheDocument()
    expect(carouselItemTestId).toHaveClass('className')
    expect(panelTestIds).toHaveLength(3)
    expect(carouselItemTestId).toHaveAttribute('role', 'group')
    expect(carouselItemTestId).toHaveAttribute('aria-roledescription', 'slide')
    expect(srOnlyTestId).toBeInTheDocument()
    expect(srOnlyTestId).toHaveClass('sr-only')
    expect(srOnlyTestId).toHaveTextContent('Slide 1 of 3')
    expect(srOnlyTestId).toHaveAttribute('aria-live', 'polite')
  })

  it('axe', async () => {
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
