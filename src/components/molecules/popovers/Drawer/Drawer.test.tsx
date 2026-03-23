import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef, useRef, useState } from 'react'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { Drawer } from '.'

expect.extend(toHaveNoViolations)

describe('Drawer', () => {
  const anchorRef = createRef<HTMLButtonElement>()

  describe('Semantics', () => {
    it('renders aside element', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer.tagName).toBe('ASIDE')
    })

    it('forwards className', () => {
      render(
        <Drawer
          className="custom"
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveClass('custom')
    })

    it('id set from name', () => {
      render(
        <Drawer name="myDrawer" label="Test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveAttribute('id', 'myDrawer')
    })

    it('aria-label from label prop', () => {
      render(
        <Drawer name="test" label="Custom Label" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveAttribute('aria-label', 'Custom Label')
    })

    it('aria-label falls back to i18n', () => {
      render(
        <Drawer name="test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveAttribute('aria-label', 'Drawer')
    })

    it('non-modal has no role', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).not.toHaveAttribute('role')
    })

    it('non-modal has no aria-modal', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).not.toHaveAttribute('aria-modal')
    })

    it('modal sets role dialog', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} modal onClose={() => {}}>
          Children
        </Drawer>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toBeInTheDocument()
    })

    it('modal sets aria-modal true', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} modal onClose={() => {}}>
          Children
        </Drawer>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('non-modal does not render Overlay', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )

      expect(screen.queryByTestId('Overlay')).toBeNull()
    })

    it('modal renders Overlay', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} modal onClose={() => {}}>
          Children
        </Drawer>,
      )

      expect(screen.getByTestId('Overlay')).toBeInTheDocument()
    })

    it('left placement applies left-0 when open', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          placement="left"
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveClass('left-0')
    })

    it('right placement applies right-0 when open', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          placement="right"
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveClass('right-0')
    })

    it('width forwarded', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          width="w-1/3"
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveClass('w-1/3')
    })

    it('offsetY forwarded', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          offsetY="top-8 bottom-0"
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveClass('top-8 bottom-0')
    })

    it('paddingY forwarded to Paper', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          paddingY="p-8"
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('p-8')
    })

    it('paddingX forwarded to content wrap', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          paddingX="px-4"
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('px-4')
    })

    it('forwards paperProps className', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          paperProps={{ className: 'paperClass' }}
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('paperClass')
    })

    it('forwards scrollShadowProps className', () => {
      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          scrollShadowProps={{ className: 'scrollClass' }}
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).toHaveClass('scrollClass')
    })

    it('renders children', () => {
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Drawer Content
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer).toHaveTextContent('Drawer Content')
    })

    it('closed state returns null', () => {
      render(
        <Drawer name="test" label="Test" isOpen={false} anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )

      expect(screen.queryByTestId('Drawer')).toBeNull()
    })

    it('renders in portal container', () => {
      const portalContainer = document.createElement('div')
      portalContainer.setAttribute('id', 'portalContainer')
      document.body.appendChild(portalContainer)

      render(
        <Drawer
          name="test"
          label="Test"
          isOpen
          anchorRef={anchorRef}
          portalContainerId="portalContainer"
          onClose={() => {}}
        >
          Children
        </Drawer>,
      )
      const drawer = screen.getByTestId('Drawer')

      expect(drawer.parentElement).toBe(portalContainer)
    })
  })

  describe('Keyboard', () => {
    const DrawerWithTrigger = ({ modal = false }: { modal?: boolean }) => {
      const ref = useRef<HTMLButtonElement>(null)
      const [isOpen, setIsOpen] = useState(false)
      return (
        <>
          <button ref={ref} data-testid="trigger" onClick={() => setIsOpen(true)}>
            Open
          </button>
          <Drawer
            name="test"
            label="Test Drawer"
            isOpen={isOpen}
            anchorRef={ref}
            modal={modal}
            onClose={() => setIsOpen(false)}
          >
            <button data-testid="item1">Item 1</button>
            <button data-testid="item2">Item 2</button>
            <button data-testid="item3">Item 3</button>
          </Drawer>
        </>
      )
    }

    // Drawer passes anchorRef (not null) to useFocus.
    // Focusable list is [trigger, item1, item2, item3]. focusIndex starts at 0.
    // First ArrowDown on portal moves from index 0 (trigger) → 1 (item1).

    const openDrawer = async () => {
      const trigger = screen.getByTestId('trigger')

      await act(async () => {
        fireEvent.click(trigger)
      })

      // Flush scope registration + keydown listener + focusable element discovery
      await act(async () => {})
      await act(async () => {})

      return trigger
    }

    it('ArrowDown moves to next item', async () => {
      render(<DrawerWithTrigger modal />)
      await openDrawer()

      const drawer = screen.getByTestId('Drawer')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // First ArrowDown moves from index 0 (trigger) to 1 (item1)
      await act(async () => {
        fireEvent.keyDown(drawer, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[0])

      // Next ArrowDown moves to item2
      await act(async () => {
        fireEvent.keyDown(items[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])
    })

    it('ArrowUp moves to previous item', async () => {
      render(<DrawerWithTrigger modal />)
      await openDrawer()

      const drawer = screen.getByTestId('Drawer')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Navigate to item1
      await act(async () => {
        fireEvent.keyDown(drawer, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[0])

      // Navigate to item2
      await act(async () => {
        fireEvent.keyDown(items[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // ArrowUp moves back to item1
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'ArrowUp', code: 'ArrowUp' })
      })

      expect(document.activeElement).toBe(items[0])
    })

    it('Tab cycles forward (focus trap)', async () => {
      render(<DrawerWithTrigger modal />)
      await openDrawer()

      const drawer = screen.getByTestId('Drawer')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Initialize focus to item1 via ArrowDown
      await act(async () => {
        fireEvent.keyDown(drawer, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[0])

      // Tab forward
      await act(async () => {
        fireEvent.keyDown(items[0], { key: 'Tab', code: 'Tab' })
      })

      expect(document.activeElement).toBe(items[1])

      // Tab forward
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'Tab', code: 'Tab' })
      })

      expect(document.activeElement).toBe(items[2])
    })

    it('Shift+Tab cycles backward (focus trap)', async () => {
      render(<DrawerWithTrigger modal />)
      await openDrawer()

      const drawer = screen.getByTestId('Drawer')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Initialize focus to item1
      await act(async () => {
        fireEvent.keyDown(drawer, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[0])

      // Navigate to item2
      await act(async () => {
        fireEvent.keyDown(items[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // Shift+Tab backward to item1
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'Tab', code: 'Tab', shiftKey: true })
      })

      expect(document.activeElement).toBe(items[0])
    })

    it('Escape closes modal drawer', async () => {
      render(<DrawerWithTrigger modal />)
      await openDrawer()

      const drawer = screen.getByTestId('Drawer')

      await act(async () => {
        fireEvent.keyDown(drawer, { key: 'Escape', code: 'Escape' })
      })

      await waitFor(() => {
        expect(screen.queryByTestId('Drawer')).not.toBeInTheDocument()
      })
    })

    it('Home jumps to first focusable', async () => {
      render(<DrawerWithTrigger modal />)
      const trigger = await openDrawer()

      const drawer = screen.getByTestId('Drawer')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Navigate to item1
      await act(async () => {
        fireEvent.keyDown(drawer, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[0])

      // Navigate to item2
      await act(async () => {
        fireEvent.keyDown(items[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // Home jumps to first focusable (trigger is index 0 in focusable list)
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'Home', code: 'Home' })
      })

      expect(document.activeElement).toBe(trigger)
    })

    it('Escape closes non-modal drawer', async () => {
      render(<DrawerWithTrigger />)
      await openDrawer()

      const drawer = screen.getByTestId('Drawer')

      await act(async () => {
        fireEvent.keyDown(drawer, { key: 'Escape', code: 'Escape' })
      })

      await waitFor(() => {
        expect(screen.queryByTestId('Drawer')).not.toBeInTheDocument()
      })
    })
  })

  describe('Interaction', () => {
    it('modal Overlay click calls onClose', () => {
      const onClose = jest.fn()
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} modal onClose={onClose}>
          Children
        </Drawer>,
      )

      fireEvent.click(screen.getByTestId('Overlay'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('non-modal focus-out calls onClose', () => {
      const onClose = jest.fn()
      render(
        <>
          <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} onClose={onClose}>
            <button data-testid="option" />
          </Drawer>
          <button data-testid="outside" />
        </>,
      )
      const option = screen.getByTestId('option')
      const outside = screen.getByTestId('outside')

      option.focus()
      outside.focus()
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref', () => {
    it('exposes DOM element via ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} ref={ref} onClose={() => {}}>
          Children
        </Drawer>,
      )

      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <Drawer name="test" label="Test" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Drawer>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
