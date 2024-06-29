import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Chip from '.'

describe('Chip', () => {
  it('default', () => {
    render(<Chip className="className">Chip</Chip>)
    expect(screen.getByTestId('Chip')).toBeTruthy()
    expect(screen.getByTestId('Chip')).toHaveClass('className')
  })

  it('title', () => {
    render(<Chip title="Chip title">Chip info</Chip>)
    expect(screen.getAllByTestId('Span')[0]).toHaveTextContent('Chip title')
    expect(screen.getAllByTestId('Span')[1]).toHaveTextContent('Chip info')
  })

  it('startIcon', () => {
    render(<Chip startIcon={<svg data-testid="testSvg" />}>Chip</Chip>)
    expect(screen.getByTestId('testSvg')).toBeVisible()
    expect(screen.getByTestId('Chip')).toHaveTextContent('Chip')
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(<Chip onClick={spy} />)
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })

  it('buttonIcon', () => {
    const spy = jest.fn()
    render(<Chip onClick={spy} buttonIcon={<svg data-testid="testSvg" />} />)
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
    expect(screen.getByTestId('testSvg')).toBeVisible()
  })
})
