import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { SimpleHeader } from '.'

describe('SimpleHeader', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <SimpleHeader className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('SimpleHeader')).toBeTruthy()
    expect(screen.getByTestId('SimpleHeader')).toHaveClass('className')
  })
})
