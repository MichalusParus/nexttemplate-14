import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef, useState } from 'react'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { ImageViewer } from '.'

expect.extend(toHaveNoViolations)

describe('ImageViewer', () => {
  describe('Semantics', () => {
    it('renders trigger button', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(
        <ImageViewer className="custom" name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toHaveClass('custom')
    })

    it('aria-label from label prop', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toHaveAttribute('aria-label', 'Image')
    })

    it('aria-label falls back to i18n', () => {
      render(
        <ImageViewer name="viewerTest">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toHaveAttribute('aria-label', 'Image Viewer')
    })

    it('aria-haspopup dialog', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('aria-expanded false when closed', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-controls links to dialog id', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toHaveAttribute('aria-controls', 'viewerTest')
    })

    it('dialog has role and aria-modal', () => {
      render(
        <ImageViewer name="viewerTest" label="Image" isOpen setIsOpen={() => {}}>
          Image
        </ImageViewer>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('dialog has aria-label', () => {
      render(
        <ImageViewer name="viewerTest" label="Image" isOpen setIsOpen={() => {}}>
          Image
        </ImageViewer>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-label', 'Image')
    })

    it('dialog id set from name', () => {
      render(
        <ImageViewer name="viewerTest" label="Image" isOpen setIsOpen={() => {}}>
          Image
        </ImageViewer>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('id', 'viewerTest')
    })

    it('closed state renders no dialog', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )

      expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('children render in trigger when closed', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(trigger).toHaveTextContent('Image')
    })

    it('renders in portal container', () => {
      const portalContainer = document.createElement('div')
      portalContainer.setAttribute('id', 'portalContainer')
      document.body.appendChild(portalContainer)

      render(
        <ImageViewer
          name="viewerTest"
          label="Image"
          isOpen
          setIsOpen={() => {}}
          portalContainerId="portalContainer"
        >
          Image
        </ImageViewer>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog.parentElement).toBe(portalContainer)
    })

    it('renders Overlay when open', () => {
      render(
        <ImageViewer name="viewerTest" label="Image" isOpen setIsOpen={() => {}}>
          Image
        </ImageViewer>,
      )

      expect(screen.getByTestId('Overlay')).toBeInTheDocument()
    })
  })

  describe('Keyboard', () => {
    const ImageViewerWithItems = () => {
      const [isOpen, setIsOpen] = useState(false)
      return (
        <ImageViewer name="viewerTest" label="Image" isOpen={isOpen} setIsOpen={setIsOpen}>
          <button data-testid="item1">Item 1</button>
          <button data-testid="item2">Item 2</button>
          <button data-testid="item3">Item 3</button>
        </ImageViewer>
      )
    }

    // ImageViewer containerRef is null (like Dialog).
    // Focusable list is portal-only: [item1, item2, item3, closeButton].
    // focusIndex starts at 0. First ArrowDown moves from index 0 → 1 (item1 → item2).

    const openViewer = async () => {
      const trigger = screen.getByTestId('ImageViewer')

      await act(async () => {
        fireEvent.click(trigger)
      })

      // Flush scope registration + keydown listener + focusable element discovery
      await act(async () => {})
      await act(async () => {})

      return trigger
    }

    it('ArrowDown moves to next item', async () => {
      render(<ImageViewerWithItems />)
      await openViewer()

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
      render(<ImageViewerWithItems />)
      await openViewer()

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
      render(<ImageViewerWithItems />)
      await openViewer()

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

      // Tab forward — focus stays within dialog (trap)
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'Tab', code: 'Tab' })
      })

      // Focus moved forward within dialog, not outside
      expect(dialog.contains(document.activeElement)).toBe(true)
      expect(document.activeElement).not.toBe(items[1])
    })

    it('Shift+Tab cycles backward (focus trap)', async () => {
      render(<ImageViewerWithItems />)
      await openViewer()

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
    })

    it('Escape closes viewer', async () => {
      render(<ImageViewerWithItems />)
      await openViewer()

      const dialog = screen.getByRole('dialog')

      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })
      })

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('Home jumps to first item', async () => {
      render(<ImageViewerWithItems />)
      await openViewer()

      const dialog = screen.getByRole('dialog')
      const items = [
        screen.getByTestId('item1'),
        screen.getByTestId('item2'),
        screen.getByTestId('item3'),
      ]

      // Navigate to item2
      await act(async () => {
        fireEvent.keyDown(dialog, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(items[1])

      // Home jumps to first
      await act(async () => {
        fireEvent.keyDown(items[1], { key: 'Home', code: 'Home' })
      })

      expect(document.activeElement).toBe(items[0])
    })
  })

  describe('Interaction', () => {
    it('click opens dialog', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      expect(screen.queryByRole('dialog')).toBeNull()

      fireEvent.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('close button closes dialog', () => {
      render(
        <ImageViewer name="viewerTest" label="Image">
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      fireEvent.click(trigger)
      expect(screen.getByRole('dialog')).toBeInTheDocument()

      fireEvent.click(screen.getByTestId('ImageViewerCloseButton'))

      waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull()
      })
    })

    it('controlled mode calls setIsOpen on open', () => {
      const setIsOpen = jest.fn()
      render(
        <ImageViewer name="viewerTest" label="Image" isOpen={false} setIsOpen={setIsOpen}>
          Image
        </ImageViewer>,
      )
      const trigger = screen.getByTestId('ImageViewer')

      fireEvent.click(trigger)
      expect(setIsOpen).toHaveBeenCalledTimes(1)
    })

    it('controlled mode calls setIsOpen on close', () => {
      const setIsOpen = jest.fn()
      render(
        <ImageViewer name="viewerTest" label="Image" isOpen={true} setIsOpen={setIsOpen}>
          Image
        </ImageViewer>,
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()

      fireEvent.click(screen.getByTestId('ImageViewerCloseButton'))
      expect(setIsOpen).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref', () => {
    it('exposes DOM element via ref', () => {
      const ref = createRef<HTMLButtonElement>()
      render(
        <ImageViewer name="viewerTest" label="Image" ref={ref}>
          Image
        </ImageViewer>,
      )

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <ImageViewer name="viewerTest" label="Image" isOpen setIsOpen={() => {}}>
          Image
        </ImageViewer>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
