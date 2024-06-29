import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Carousel from '.'

describe('Carousel', () => {
  it('default', () => {
    render(
      <Carousel pages={3} ratio={100} className="className">
        <div className="h-full w-full" data-testid="panel" />
        <div className="h-full w-full" data-testid="panel" />
        <div className="h-full w-full" data-testid="panel" />
      </Carousel>,
    )
    expect(screen.getByTestId('Carousel')).toBeTruthy()
    expect(screen.getByTestId('Carousel')).toHaveClass('className')
    expect(screen.getAllByTestId('panel')).toHaveLength(3)
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })
})
