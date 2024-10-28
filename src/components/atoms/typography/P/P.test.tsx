import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { P } from '.'

describe('P', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <P className="className">Paragraph text</P>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('P')).toBeTruthy()
    expect(screen.getByTestId('P')).toHaveClass('className')
    expect(screen.getByTestId('P')).toHaveTextContent('Paragraph text')
  })
})
