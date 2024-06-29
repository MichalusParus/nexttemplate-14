import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
  it('default', () => {
    render(<Button className="className">button</Button>)
    expect(screen.getByRole('button')).toBeVisible()
    expect(screen.getByRole('button')).toHaveClass('className')
    expect(screen.getByRole('button')).toHaveTextContent('button')
  })

  it('iconOnly', () => {
    render(<Button startIcon={<svg role="img" />} />)
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('')
  })

  it('startIcon', () => {
    render(<Button startIcon={<svg role="img" />}>button</Button>)
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('button')
  })

  it('endIcon', () => {
    render(<Button endIcon={<svg role="img" />}>button</Button>)
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('button')).toHaveTextContent('button')
  })

  it('isLoading', () => {
    const spy = jest.fn()
    render(<Button isLoading={true}>button</Button>)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeVisible()
    fireEvent.click(screen.getByRole('button'))
    expect(spy).not.toHaveBeenCalled()
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(<Button onClick={spy} />)
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })

  it('submit', () => {
    render(<Button type="submit" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('disabled', () => {
    const spy = jest.fn()
    render(<Button onClick={spy} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
    fireEvent.click(screen.getByRole('button'))
    expect(spy).not.toHaveBeenCalled()
  })
})
