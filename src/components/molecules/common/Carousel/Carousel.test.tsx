import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Carousel } from '.'

describe('Carousel', () => {
  it('default', () => {
    render(
      <Carousel pages={3} className="className">
        <div className="h-full w-full" data-testid="panel" />
        <div className="h-full w-full" data-testid="panel" />
        <div className="h-full w-full" data-testid="panel" />
      </Carousel>,
    )
    expect(screen.getByTestId('Carousel')).toBeInTheDocument()
    expect(screen.getByTestId('Carousel')).toHaveClass('className')
    expect(screen.getAllByTestId('panel')).toHaveLength(3)
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })
})
