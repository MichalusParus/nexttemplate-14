import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import Carousel from '.'

describe('Carousel', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Carousel pages={3} className="className">
          <div className="h-full w-full" data-testid="panel" />
          <div className="h-full w-full" data-testid="panel" />
          <div className="h-full w-full" data-testid="panel" />
        </Carousel>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Carousel')).toBeTruthy()
    expect(screen.getByTestId('Carousel')).toHaveClass('className')
    expect(screen.getAllByTestId('panel')).toHaveLength(3)
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })
})
