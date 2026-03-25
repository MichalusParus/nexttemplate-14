import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { MobilePagination } from '.'

expect.extend(toHaveNoViolations)

describe('MobilePagination', () => {
  describe('Semantics', () => {
    it('renders nav with page display', () => {
      render(<MobilePagination className="className" count={5} page={3} onChange={() => {}} />)
      const mobilePagination = screen.getByTestId('MobilePagination')
      const selectedOutOff = screen.getByTestId('SelectedOutOff')

      expect(mobilePagination).toBeInTheDocument()
      expect(mobilePagination).toHaveClass('className')
      expect(selectedOutOff).toHaveTextContent('3 / 5')
    })

    it('renders both chevron buttons in middle page', () => {
      render(<MobilePagination count={5} page={3} onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(2)
    })

    it('hideNav replaces nav with div', () => {
      const { container } = render(
        <MobilePagination count={3} page={1} onChange={() => {}} hideNav />,
      )
      const nav = container.querySelector('nav')
      const div = container.querySelector('div[data-testid="MobilePagination"]')

      expect(nav).toBeNull()
      expect(div).toBeInTheDocument()
    })

    it('loadMoreCount shows range format', () => {
      render(<MobilePagination count={10} page={1} loadMoreCount={2} onChange={() => {}} />)
      const selectedOutOff = screen.getByTestId('SelectedOutOff')

      expect(selectedOutOff).toHaveTextContent('1-3 / 10')
    })

    it('isLoading disables all buttons', () => {
      render(<MobilePagination count={5} page={3} isLoading onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(2)
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('buttonProps className and props forward to chevrons', () => {
      render(
        <MobilePagination
          count={5}
          page={3}
          onChange={() => {}}
          buttonProps={{ className: 'customButtonClass', disabled: true }}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveClass('customButtonClass')
      expect(buttons[1]).toHaveClass('customButtonClass')
      expect(buttons[0]).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[1]).toHaveAttribute('aria-disabled', 'true')
    })

    it('hides previous chevron on first page', () => {
      render(<MobilePagination count={5} page={1} onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveAttribute('aria-label', expect.stringContaining('next'))
    })

    it('hides next chevron on last page', () => {
      render(<MobilePagination count={5} page={5} onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveAttribute('aria-label', expect.stringContaining('previous'))
    })

    it('invisible when count <= 1', () => {
      render(<MobilePagination count={1} page={1} onChange={() => {}} />)
      const mobilePagination = screen.getByTestId('MobilePagination')

      expect(mobilePagination).toHaveClass('invisible')
    })
  })

  describe('Interaction', () => {
    it('previous button fires onChange with page - 1', () => {
      const onChange = jest.fn()
      render(<MobilePagination count={5} page={3} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith(2)
    })

    it('next button fires onChange with page + 1', () => {
      const onChange = jest.fn()
      render(<MobilePagination count={5} page={3} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledWith(4)
    })

    it('next button accounts for loadMoreCount', () => {
      const onChange = jest.fn()
      render(<MobilePagination count={10} page={3} loadMoreCount={2} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledWith(6)
    })
  })

  describe('Ref', () => {
    it('forwards ref to HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(<MobilePagination ref={ref} count={5} page={3} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(<MobilePagination count={5} page={3} onChange={() => {}} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
