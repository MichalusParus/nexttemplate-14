import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import Modal from '.'

describe('Modal', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Modal className="className" name="test" isOpen>
          Children
        </Modal>
      </JestMockProvider>,
    )
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByRole('dialog')).toHaveClass('className')
    expect(screen.getByRole('dialog')).toHaveAttribute('id', 'test')
    expect(screen.getByRole('dialog')).toHaveTextContent('Children')
    expect(screen.getByRole('combobox')).toHaveTextContent('ModalCombobox')
  })
  it('title', () => {
    render(
      <JestMockProvider>
        <Modal className="className" name="test" title="Title" isOpen>
          Children
        </Modal>
      </JestMockProvider>,
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Title')
  })
  it('actions', () => {
    render(
      <JestMockProvider>
        <Modal
          className="className"
          name="test"
          modalActions={<button data-testid="button">Action</button>}
          isOpen
        >
          Children
        </Modal>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('button')).toHaveTextContent('Action')
  })
  it('closebutton', () => {
    render(
      <JestMockProvider>
        <Modal className="className" name="test" isOpen closeButton>
          Children
        </Modal>
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('Close')
  })
})
