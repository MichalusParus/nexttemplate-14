import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Carousel from '.'

describe('Carousel', () => {
  it('default', () => {
    render(
      <Carousel pages={3} ratio={100} className="className">
        <div />
      </Carousel>,
    )
    expect(screen.getByTestId('Carousel')).toBeTruthy()
    expect(screen.getByTestId('Carousel')).toHaveClass('className')
  })
})
