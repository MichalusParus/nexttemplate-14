import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Modal } from '.'

describe('Modal', () => {
  it('default', () => {
    render(
      <Modal className="className" name="test" isOpen>
        Children
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveClass('className')
    expect(screen.getByRole('dialog')).toHaveAttribute('id', 'test')
    expect(screen.getByRole('dialog')).toHaveTextContent('Children')
    expect(screen.getAllByRole('button')[0]).toHaveTextContent('ModalButton')
  })
  it('title', () => {
    render(
      <Modal className="className" name="test" title="Title" isOpen>
        Children
      </Modal>,
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Title')
  })
  it('actions', () => {
    render(
      <Modal
        className="className"
        name="test"
        modalActions={<button data-testid="button">Action</button>}
        isOpen
      >
        Children
      </Modal>,
    )
    expect(screen.getByTestId('button')).toHaveTextContent('Action')
  })
})
