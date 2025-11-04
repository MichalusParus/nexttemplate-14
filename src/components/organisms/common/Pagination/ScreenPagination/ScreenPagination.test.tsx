import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { ScreenPagination } from '.'

expect.extend(toHaveNoViolations)

describe('ScreenPagination', () => {
  it('default', () => {
    render(
      <ScreenPagination
        className="className"
        count={5}
        page={3}
        pageSpread={11}
        onChange={() => {}}
      />,
    )
    const screenPaginationWrap = screen.getByTestId('ScreenPaginationWrap')
    const screenPaginationTestId = screen.getByTestId('ScreenPagination')
    const buttonRoles = screen.getAllByRole('button')

    expect(screenPaginationWrap).toBeInTheDocument()
    expect(screenPaginationWrap).toHaveClass('className')
    expect(screenPaginationTestId).toBeInTheDocument()
    expect(buttonRoles).toHaveLength(7)
  })

  it('isLoading', () => {
    render(<ScreenPagination count={5} page={3} pageSpread={11} isLoading onChange={() => {}} />)
    const buttonRoles = screen.getAllByRole('button')

    buttonRoles.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('hideNav', () => {
    const { container } = render(
      <ScreenPagination count={5} page={1} pageSpread={11} onChange={() => {}} hideNav />,
    )
    const navQuery = container.querySelector('nav')
    const divElement = container.querySelector('div[data-testid="ScreenPagination"]')

    expect(navQuery).toBeNull()
    expect(divElement).toBeInTheDocument()
  })

  it('loadMoreCount', () => {
    render(
      <ScreenPagination
        count={10}
        page={3}
        pageSpread={11}
        loadMoreCount={2}
        onChange={() => {}}
      />,
    )
    const buttonRoles = screen.getAllByRole('button')
    const pageButtons = buttonRoles.filter(btn => btn.classList.contains('PageButton'))

    expect(pageButtons[2]).toHaveClass('selected')
    expect(pageButtons[3]).toHaveClass('selected')
    expect(pageButtons[4]).toHaveClass('selected')
  })

  it('pageSpread', () => {
    render(<ScreenPagination count={20} page={10} pageSpread={11} onChange={() => {}} />)
    const buttonRoles = screen.getAllByRole('button')
    const dottWrapQuery = screen.queryAllByTestId('DottWrap')

    expect(buttonRoles).toHaveLength(11)
    expect(dottWrapQuery).toHaveLength(2)
  })

  it('buttonProps', () => {
    render(
      <ScreenPagination
        count={5}
        page={3}
        pageSpread={11}
        onChange={() => {}}
        buttonProps={{ className: 'customButtonClass', disabled: true }}
      />,
    )
    const buttonRoles = screen.getAllByRole('button')

    expect(buttonRoles[0]).toHaveClass('customButtonClass')
    expect(buttonRoles[1]).toHaveClass('customButtonClass')
    expect(buttonRoles[0]).toBeDisabled()
    expect(buttonRoles[1]).toBeDisabled()
  })

  it('buttonProps/loadMoreButtonProps', () => {
    const onLoadMoreMock = jest.fn()
    render(
      <ScreenPagination
        count={10}
        page={3}
        pageSpread={11}
        onChange={() => {}}
        onLoadMore={onLoadMoreMock}
        buttonProps={{ className: 'customButtonClass', disabled: true }}
        loadMoreButtonProps={{ className: 'customLoadMoreClass', disabled: true }}
      />,
    )
    const loadMoreButton = screen.getByTestId('LoadMoreButton')
    const buttonRoles = screen.getAllByRole('button')

    expect(loadMoreButton).toBeInTheDocument()
    expect(loadMoreButton).toHaveClass('customLoadMoreClass')
    expect(loadMoreButton).toBeDisabled()
    expect(buttonRoles[1]).toHaveClass('customButtonClass')
    expect(buttonRoles[1]).toBeDisabled()
  })

  it('onLoadMore', () => {
    const onLoadMoreMock = jest.fn()
    render(
      <ScreenPagination
        count={10}
        page={3}
        pageSpread={11}
        loadMoreCount={2}
        onChange={() => {}}
        onLoadMore={onLoadMoreMock}
      />,
    )
    const loadMoreButton = screen.getByTestId('LoadMoreButton')

    fireEvent.click(loadMoreButton)
    expect(onLoadMoreMock).toHaveBeenCalled()
  })

  it('hides load more button when reaching end', () => {
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

  it('shows load more button when not at end', () => {
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

  it('onChange', () => {
    const onChangeMock = jest.fn()
    render(<ScreenPagination count={5} page={3} pageSpread={11} onChange={onChangeMock} />)
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[0])
    expect(onChangeMock).toHaveBeenCalledWith(2)

    fireEvent.click(buttonRoles[buttonRoles.length - 1])
    expect(onChangeMock).toHaveBeenCalledWith(4)
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ScreenPagination ref={ref} count={5} page={3} pageSpread={11} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <ScreenPagination count={5} page={3} pageSpread={11} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
