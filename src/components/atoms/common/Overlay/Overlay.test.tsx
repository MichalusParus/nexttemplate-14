import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { Overlay } from '.'

describe('Overlay', () => {
  it('default', () => {
    render(<Overlay isOpen={false} onClose={() => {}} className="className" />)
    expect(screen.getByRole('button')).toBeTruthy()
    expect(screen.getByRole('button')).toHaveClass('className')
  })

  it('onClose', () => {
    const spy = jest.fn()
    render(<Overlay isOpen={false} onClose={spy} />)
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
