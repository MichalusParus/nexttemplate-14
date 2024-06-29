import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Modal from '.'

describe('Modal', () => {
  it('default', () => {
    render(
      <Modal className="className" name="test" isOpen={true} onClose={() => {}}>
        Children
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByTestId('Paper')).toHaveClass('className')
  })
})
