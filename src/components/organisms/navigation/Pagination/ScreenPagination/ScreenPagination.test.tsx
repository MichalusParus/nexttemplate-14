import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { act, fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { ScreenPagination } from '.'

expect.extend(toHaveNoViolations)

describe('ScreenPagination', () => {
  describe('Semantics', () => {
    it('renders wrapper and nav with className', () => {
      render(
        <ScreenPagination
          className="className"
          count={5}
          page={3}
          pageSpread={11}
          onChange={() => {}}
        />,
      )
      const wrap = screen.getByTestId('ScreenPaginationWrap')
      const pagination = screen.getByTestId('ScreenPagination')

      expect(wrap).toBeInTheDocument()
      expect(wrap).toHaveClass('className')
      expect(pagination).toBeInTheDocument()
    })

    it('renders all page buttons plus chevrons', () => {
      render(
        <ScreenPagination count={5} page={3} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(7)
    })

    it('hideNav replaces nav with div', () => {
      const { container } = render(
        <ScreenPagination count={5} page={1} pageSpread={11} onChange={() => {}} hideNav />,
      )
      const nav = container.querySelector('nav')
      const div = container.querySelector('div[data-testid="ScreenPagination"]')

      expect(nav).toBeNull()
      expect(div).toBeInTheDocument()
    })

    it('nav has aria-label', () => {
      render(
        <ScreenPagination count={5} page={3} pageSpread={11} onChange={() => {}} />,
      )
      const nav = screen.getByRole('navigation')

      expect(nav).toHaveAttribute('aria-label')
    })

    it('current page has aria-current="page"', () => {
      render(
        <ScreenPagination count={5} page={3} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))
      const currentPage = pageButtons.find(btn => btn.getAttribute('aria-current') === 'page')

      expect(currentPage).toBeDefined()
      expect(currentPage).toHaveAttribute('aria-label', expect.stringContaining('3'))
    })

    it('loadMoreCount highlights range of pages as selected', () => {
      render(
        <ScreenPagination
          count={10}
          page={3}
          pageSpread={11}
          loadMoreCount={2}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))

      expect(pageButtons[2]).toHaveAttribute('data-selected')
      expect(pageButtons[3]).toHaveAttribute('data-selected')
      expect(pageButtons[4]).toHaveAttribute('data-selected')
    })

    it('renders ellipsis dots with role="presentation"', () => {
      render(<ScreenPagination count={20} page={10} pageSpread={11} onChange={() => {}} />)
      const dots = screen.queryAllByTestId('DotWrap')

      expect(dots).toHaveLength(2)
      dots.forEach(dot => {
        expect(dot).toHaveAttribute('role', 'presentation')
        expect(dot).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('pageSpread controls total button count with ellipsis', () => {
      render(<ScreenPagination count={20} page={10} pageSpread={11} onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(11)
    })

    it('isLoading disables all buttons', () => {
      render(<ScreenPagination count={5} page={3} pageSpread={11} isLoading onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('buttonProps className and props forward to page buttons', () => {
      render(
        <ScreenPagination
          count={5}
          page={3}
          pageSpread={11}
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

    it('loadMoreButtonProps forward to Load More button', () => {
      const onLoadMore = jest.fn()
      render(
        <ScreenPagination
          count={10}
          page={3}
          pageSpread={11}
          onChange={() => {}}
          onLoadMore={onLoadMore}
          buttonProps={{ className: 'customButtonClass', disabled: true }}
          loadMoreButtonProps={{ className: 'customLoadMoreClass', disabled: true }}
        />,
      )
      const loadMoreButton = screen.getByTestId('LoadMoreButton')
      const buttons = screen.getAllByRole('button')

      expect(loadMoreButton).toBeInTheDocument()
      expect(loadMoreButton).toHaveClass('customLoadMoreClass')
      expect(loadMoreButton).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[1]).toHaveClass('customButtonClass')
      expect(buttons[1]).toHaveAttribute('aria-disabled', 'true')
    })

    it('chevron buttons have tabIndex={-1}', () => {
      render(
        <ScreenPagination count={5} page={3} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const leftChevron = buttons.find(btn => btn.classList.contains('LeftChevronButton'))
      const rightChevron = buttons.find(btn => btn.classList.contains('RightChevronButton'))

      expect(leftChevron).toHaveAttribute('tabindex', '-1')
      expect(rightChevron).toHaveAttribute('tabindex', '-1')
    })

    it('selected page has tabIndex={0}, others have tabIndex={-1}', () => {
      render(
        <ScreenPagination count={5} page={3} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))

      const selectedButton = pageButtons.find(btn => btn.hasAttribute('data-selected'))
      const unselectedButtons = pageButtons.filter(btn => !btn.hasAttribute('data-selected'))

      expect(selectedButton).toHaveAttribute('tabindex', '0')
      unselectedButtons.forEach(btn => {
        expect(btn).toHaveAttribute('tabindex', '-1')
      })
    })
  })

  describe('Keyboard', () => {
    it('ArrowDown navigates to next page button', async () => {
      render(
        <ScreenPagination count={5} page={1} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))

      pageButtons[0].focus()

      await act(async () => {
        fireEvent.keyDown(pageButtons[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(pageButtons[1])
    })

    it('ArrowUp navigates to previous page button', async () => {
      render(
        <ScreenPagination count={5} page={1} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))

      pageButtons[2].focus()

      await act(async () => {
        fireEvent.keyDown(pageButtons[2], { key: 'ArrowUp', code: 'ArrowUp' })
      })

      expect(document.activeElement).toBe(pageButtons[1])
    })

    it('ArrowDown wraps from last to first', async () => {
      render(
        <ScreenPagination count={3} page={1} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))

      pageButtons[pageButtons.length - 1].focus()

      await act(async () => {
        fireEvent.keyDown(pageButtons[pageButtons.length - 1], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(pageButtons[0])
    })

    it('Home jumps to first page button', async () => {
      render(
        <ScreenPagination count={5} page={1} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))

      pageButtons[3].focus()

      await act(async () => {
        fireEvent.keyDown(pageButtons[3], { key: 'Home', code: 'Home' })
      })

      expect(document.activeElement).toBe(pageButtons[0])
    })

    it('End jumps to last page button', async () => {
      render(
        <ScreenPagination count={5} page={1} pageSpread={11} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')
      const pageButtons = buttons.filter(btn => btn.classList.contains('PageButton'))

      pageButtons[0].focus()

      await act(async () => {
        fireEvent.keyDown(pageButtons[0], { key: 'End', code: 'End' })
      })

      expect(document.activeElement).toBe(pageButtons[pageButtons.length - 1])
    })
  })

  describe('Interaction', () => {
    it('left chevron fires onChange with page - 1', () => {
      const onChange = jest.fn()
      render(<ScreenPagination count={5} page={3} pageSpread={11} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith(2)
    })

    it('right chevron fires onChange with page + 1', () => {
      const onChange = jest.fn()
      render(<ScreenPagination count={5} page={3} pageSpread={11} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[buttons.length - 1])
      expect(onChange).toHaveBeenCalledWith(4)
    })

    it('onLoadMore fires on Load More button click', () => {
      const onLoadMore = jest.fn()
      render(
        <ScreenPagination
          count={10}
          page={3}
          pageSpread={11}
          loadMoreCount={2}
          onChange={() => {}}
          onLoadMore={onLoadMore}
        />,
      )
      const loadMoreButton = screen.getByTestId('LoadMoreButton')

      fireEvent.click(loadMoreButton)
      expect(onLoadMore).toHaveBeenCalled()
    })

    it('hides Load More button when reaching end', () => {
      render(
        <ScreenPagination
          count={5}
          page={4}
          pageSpread={11}
          loadMoreCount={1}
          onChange={() => {}}
          onLoadMore={() => {}}
        />,
      )
      const loadMoreButton = screen.queryByTestId('LoadMoreButton')

      expect(loadMoreButton).toBeNull()
    })

    it('shows Load More button when not at end', () => {
      render(
        <ScreenPagination
          count={10}
          page={3}
          pageSpread={11}
          loadMoreCount={2}
          onChange={() => {}}
          onLoadMore={() => {}}
        />,
      )
      const loadMoreButton = screen.queryByTestId('LoadMoreButton')

      expect(loadMoreButton).toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('forwards ref to HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(<ScreenPagination ref={ref} count={5} page={3} pageSpread={11} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <ScreenPagination count={5} page={3} pageSpread={11} onChange={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
