import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { getGalleryItems } from '../../../../../../.storybook/helpers'
import { GalleryControls } from '.'

expect.extend(toHaveNoViolations)


describe('GalleryControls', () => {
  const items = getGalleryItems(18)

  describe('Semantics', () => {
    it('renders GalleryControls container', () => {
      render(<GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} />)
      const controls = screen.getByTestId('GalleryControls')

      expect(controls).toBeInTheDocument()
    })

    it('renders buttons matching item count', () => {
      render(<GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} />)
      const buttons = screen.getAllByTestId('GalleryControlButton')

      expect(buttons).toHaveLength(18)
    })

    it('img alt matches item label', () => {
      render(<GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} />)
      const imgs = screen.getAllByRole('img')

      expect(imgs[0]).toHaveAttribute('alt', items[0].label)
    })

    it('selected button has selected class', () => {
      render(<GalleryControls currentPage={3} items={items} setCurrentPage={() => {}} />)
      const buttons = screen.getAllByTestId('GalleryControlButton')

      expect(buttons[2]).toHaveClass('selected')
      expect(buttons[0]).not.toHaveClass('selected')
    })

    it('all buttons have tabIndex -1', () => {
      render(<GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} />)
      const buttons = screen.getAllByRole('button')

      buttons.forEach(button => {
        expect(button).toHaveAttribute('tabIndex', '-1')
      })
    })

    it('buttons have aria-label with page number', () => {
      render(<GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-label', 'page 1')
      expect(buttons[1]).toHaveAttribute('aria-label', 'page 2')
    })

    it('isOpen adds absolute positioning class', () => {
      render(
        <GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} isOpen />,
      )
      const controls = screen.getByTestId('GalleryControls')

      expect(controls).toHaveClass('absolute')
    })
  })

  describe('Interaction', () => {
    it('click fires setCurrentPage with page number', () => {
      const setCurrentPage = jest.fn()
      render(
        <GalleryControls currentPage={1} items={items} setCurrentPage={setCurrentPage} />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(setCurrentPage).toHaveBeenCalledWith(2)
    })
  })

  describe('Ref', () => {
    it('forwards ref to HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <GalleryControls ref={ref} currentPage={1} items={items} setCurrentPage={() => {}} />,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
