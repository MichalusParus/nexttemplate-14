import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import Button from '.'

describe('Button', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Button className="className">button</Button>
      </JestMockProvider>,
    )
    expect(screen.getByRole('button')).toBeVisible()
    expect(screen.getByRole('button')).toHaveClass('className')
    expect(screen.getByRole('button')).toHaveTextContent('button')
  })

  it('iconOnly', () => {
    render(
      <JestMockProvider>
        <Button startIcon={<svg role="img" />} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('')
  })

  it('startIcon', () => {
    render(
      <JestMockProvider>
        <Button startIcon={<svg role="img" />}>button</Button>
      </JestMockProvider>,
    )
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('button')
  })

  it('endIcon', () => {
    render(
      <JestMockProvider>
        <Button endIcon={<svg role="img" />}>button</Button>
      </JestMockProvider>,
    )
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('button')
  })

  it('isLoading', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Button isLoading={true}>button</Button>
      </JestMockProvider>,
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeVisible()
    fireEvent.click(screen.getByRole('button'))
    expect(spy).not.toHaveBeenCalled()
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Button onClick={spy} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })

  it('submit', () => {
    render(
      <JestMockProvider>
        <Button type="submit" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('disabled', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Button onClick={spy} disabled />
      </JestMockProvider>,
    )
    expect(screen.getByRole('button')).toBeDisabled()
    fireEvent.click(screen.getByRole('button'))
    expect(spy).not.toHaveBeenCalled()
  })
})
