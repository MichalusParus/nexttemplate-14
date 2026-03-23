import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef, useState } from 'react'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { Dialog } from '.'

expect.extend(toHaveNoViolations)

describe('Dialog', () => {
  describe('Semantics', () => {
    it('role dialog and aria-modal', () => {
      render(
        <Dialog name="test" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('className forwarded to dialog', () => {
      render(
        <Dialog className="custom" name="test" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveClass('custom')
    })

    it('id set from name', () => {
      render(
        <Dialog name="myDialog" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('id', 'myDialog')
    })

    it('aria-label from label prop', () => {
      render(
        <Dialog name="test" label="Custom Label" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-label', 'Custom Label')
    })

    it('aria-label falls back to i18n', () => {
      render(
        <Dialog name="test" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-label', 'Dialog')
    })

    it('aria-labelledby set when title provided', () => {
      render(
        <Dialog name="test" title="Title" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-labelledby', 'test-title')
    })

    it('aria-labelledby absent when no title', () => {
      render(
        <Dialog name="test" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).not.toHaveAttribute('aria-labelledby')
    })

    it('title renders heading with correct id', () => {
      render(
        <Dialog name="test" title="My Title" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const heading = screen.getByRole('heading')

      expect(heading).toHaveTextContent('My Title')
      expect(heading).toHaveAttribute('id', 'test-title')
    })

    it('hideXButton hides X button', () => {
      render(
        <Dialog name="test" hideXButton isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )

      expect(screen.queryByTestId('XButton')).toBeNull()
    })

    it('X button visible by default', () => {
      render(
        <Dialog name="test" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )

      expect(screen.getByTestId('XButton')).toBeInTheDocument()
    })

    it('closeButton renders close button', () => {
      render(
        <Dialog name="test" closeButton isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )

      expect(screen.getByTestId('CloseButton')).toBeInTheDocument()
    })

    it('dialogActions renders custom actions', () => {
      render(
        <Dialog
          name="test"
          dialogActions={<button data-testid="action">Action</button>}
          isOpen
          setIsOpen={() => {}}
        >
          Children
        </Dialog>,
      )

      expect(screen.getByTestId('action')).toBeInTheDocument()
    })

    it('width forwarded to dialog', () => {
      render(
        <Dialog name="test" width="w-96" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveClass('w-96')
    })

    it('paddingX forwarded to content areas', () => {
      render(
        <Dialog name="test" paddingX="px-8" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('px-8')
    })

    it('paddingY forwarded to Paper', () => {
      render(
        <Dialog name="test" paddingY="py-8" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('py-8')
    })

    it('paperProps className forwarded to Paper', () => {
      render(
        <Dialog name="test" paperProps={{ className: 'paperClass' }} isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('paperClass')
    })

    it('titleProps className forwarded to heading', () => {
      render(
        <Dialog
          name="test"
          title="Title"
          titleProps={{ className: 'titleClass' }}
          isOpen
          setIsOpen={() => {}}
        >
          Children
        </Dialog>,
      )
      const heading = screen.getByRole('heading')

      expect(heading).toHaveClass('titleClass')
    })

    it('closed state returns null', () => {
      render(
        <Dialog name="test" isOpen={false} setIsOpen={() => {}}>
          Children
        </Dialog>,
      )

      expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('renders children', () => {
      render(
        <Dialog name="test" isOpen setIsOpen={() => {}}>
          Dialog Content
        </Dialog>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveTextContent('Dialog Content')
    })
  })

  describe('Keyboard', () => {
    const DialogWithTrigger = () => {
      const [isOpen, setIsOpen] = useState(false)
      return (
        <>
          <button data-testid="trigger" onClick={() => setIsOpen(true)}>
            Open
          </button>
          <Dialog name="test" hideXButton isOpen={isOpen} setIsOpen={setIsOpen}>
            <button data-testid="item1">Item 1</button>
            <button data-testid="item2">Item 2</button>
            <button data-testid="item3">Item 3</button>
          </Dialog>
        </>
      )
    }

    const openDialog = async () => {
      const trigger = screen.getByTestId('trigger')

      await act(async () => {
        fireEvent.click(trigger)
      })

      // Flush scope registration + keydown listener + focusable element discovery
      await act(async () => {})
      await act(async () => {})

      return trigger
    }

    // Dialog has no trigger in focusable list (containerRef is null).
    // Focusable list is [item1, item2, item3]. focusIndex starts at 0.
    // First ArrowDown on portal moves from index 0 → 1 (item1 → item2).

    it('ArrowDown moves to next item', async () => {
      render(<DialogWithTrigger />)
      await openDialog()

      const dialog = screen.getByRole('dialog')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // First ArrowDown moves from index 0 to 1
      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // Next ArrowDown moves to index 2
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[2])
    })

    it('ArrowUp moves to previous item', async () => {
      render(<DialogWithTrigger />)
      await openDialog()

      const dialog = screen.getByRole('dialog')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Navigate down to item2
      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // ArrowUp moves back to item1
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'ArrowUp', code: 'ArrowUp' })
      })

      expect(document.activeElement).toBe(items[0])
    })

    it('Tab cycles forward (focus trap)', async () => {
      render(<DialogWithTrigger />)
      await openDialog()

      const dialog = screen.getByRole('dialog')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Initialize focus to item2 via ArrowDown
      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // Tab forward
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'Tab', code: 'Tab' })
      })

      expect(document.activeElement).toBe(items[2])

      // Tab wraps to first item (trap)
      await act(async () => {
        fireEvent.keyDown(items[2], { key: 'Tab', code: 'Tab' })
      })

      expect(document.activeElement).toBe(items[0])
    })

    it('Shift+Tab cycles backward (focus trap)', async () => {
      render(<DialogWithTrigger />)
      await openDialog()

      const dialog = screen.getByRole('dialog')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Initialize focus to item2 via ArrowDown
      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // Shift+Tab backward to item1
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'Tab', code: 'Tab', shiftKey: true })
      })

      expect(document.activeElement).toBe(items[0])

      // Shift+Tab wraps to last item (trap)
      await act(async () => {
        fireEvent.keyDown(items[0], { key: 'Tab', code: 'Tab', shiftKey: true })
      })

      expect(document.activeElement).toBe(items[2])
    })

    it('Escape closes dialog', async () => {
      render(<DialogWithTrigger />)
      await openDialog()

      const dialog = screen.getByRole('dialog')

      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })
      })

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('Home jumps to first item', async () => {
      render(<DialogWithTrigger />)
      await openDialog()

      const dialog = screen.getByRole('dialog')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Navigate down twice to item3
      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[2])

      // Home jumps to first
      await act(async () => {
        fireEvent.keyDown(items[2], { key: 'Home', code: 'Home' })
      })

      expect(document.activeElement).toBe(items[0])
    })
  })

  describe('Interaction', () => {
    it('X button click calls setIsOpen', () => {
      const setIsOpen = jest.fn()
      render(
        <Dialog name="test" isOpen setIsOpen={setIsOpen}>
          Children
        </Dialog>,
      )

      fireEvent.click(screen.getByTestId('XButton'))
      expect(setIsOpen).toHaveBeenCalledWith(false)
    })

    it('close button click calls setIsOpen', () => {
      const setIsOpen = jest.fn()
      render(
        <Dialog name="test" closeButton isOpen setIsOpen={setIsOpen}>
          Children
        </Dialog>,
      )

      fireEvent.click(screen.getByTestId('CloseButton'))
      expect(setIsOpen).toHaveBeenCalledWith(false)
    })

    it('Overlay click calls setIsOpen', () => {
      const setIsOpen = jest.fn()
      render(
        <Dialog name="test" isOpen setIsOpen={setIsOpen}>
          Children
        </Dialog>,
      )

      fireEvent.click(screen.getByTestId('Overlay'))
      expect(setIsOpen).toHaveBeenCalledWith(false)
    })
  })

  describe('Ref', () => {
    it('exposes DOM element via ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Dialog name="test" isOpen setIsOpen={() => {}} ref={ref}>
          Children
        </Dialog>,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <Dialog name="test" isOpen setIsOpen={() => {}}>
          Children
        </Dialog>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
