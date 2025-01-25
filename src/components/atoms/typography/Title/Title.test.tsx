import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Title } from '.'

describe('Title', () => {
  it('default', () => {
    render(
      <Title variant="h1" className="className">
        Title
      </Title>,
    )
    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveClass('className')
    expect(screen.getByRole('heading')).toHaveTextContent('Title')
  })
  it('isLoading', () => {
    render(
      <Title variant="h1" isLoading className="className">
        Title
      </Title>,
    )
    expect(screen.getByRole('heading')).not.toHaveTextContent('Title')
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
