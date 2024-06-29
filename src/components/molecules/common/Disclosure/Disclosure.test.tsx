import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Disclosure from '.'

describe('Disclosure', () => {
  it('default', () => {
    render(
      <Disclosure className="className" title="Disclosure">
        Children
      </Disclosure>,
    )
    expect(screen.getByTestId('Disclosure')).toBeTruthy()
    expect(screen.getByTestId('Disclosure')).toHaveClass('className')
  })
})
