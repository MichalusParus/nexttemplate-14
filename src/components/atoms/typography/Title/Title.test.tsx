import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Title } from '.'

describe('Title', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Title variant="h1" className="className">
          Title
        </Title>
      </JestMockProvider>,
    )
    expect(screen.getByRole('heading')).toBeTruthy()
    expect(screen.getByRole('heading')).toHaveClass('className')
    expect(screen.getByRole('heading')).toHaveTextContent('Title')
  })
  it('isLoading', () => {
    render(
      <JestMockProvider>
        <Title variant="h1" isLoading className="className">
          Title
        </Title>
      </JestMockProvider>,
    )
    expect(screen.getByRole('heading')).not.toHaveTextContent('Title')
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
