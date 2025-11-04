import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { MobilePagination } from '.'

expect.extend(toHaveNoViolations)

describe('MobilePagination', () => {
  it('default', () => {
    render(<MobilePagination className="className" count={5} page={3} onChange={() => {}} />)
    const mobilePaginationTestId = screen.getByTestId('MobilePagination')
    const buttonRoles = screen.getAllByRole('button')
    const selectedOutOffTestId = screen.getByTestId('SelectedOutOff')

    expect(mobilePaginationTestId).toBeInTheDocument()
    expect(mobilePaginationTestId).toHaveClass('className')
    expect(buttonRoles).toHaveLength(2)
    expect(selectedOutOffTestId).toHaveTextContent('3 / 5')
  })

  it('isLoading', () => {
    render(<MobilePagination count={5} page={3} isLoading onChange={() => {}} />)
    const buttonRoles = screen.getAllByRole('button')
    const statusRole = screen.getByRole('status')

    expect(buttonRoles).toHaveLength(2)
    buttonRoles.forEach(button => {
      expect(button).toBeDisabled()
    })
    expect(statusRole).toBeInTheDocument()
  })

  it('hideNav', () => {
    const { container } = render(
      <MobilePagination count={3} page={1} onChange={() => {}} hideNav />,
    )
    const navQuery = container.querySelector('nav')
    const divElement = container.querySelector('div[data-testid="MobilePagination"]')

    expect(navQuery).toBeNull()
    expect(divElement).toBeInTheDocument()
  })

  it('loadMoreCount', () => {
    render(<MobilePagination count={10} page={1} loadMoreCount={2} onChange={() => {}} />)
    const selectedOutOffTestId = screen.getByTestId('SelectedOutOff')

    expect(selectedOutOffTestId).toHaveTextContent('1-3 / 10')
  })

  it('buttonProps', () => {
    render(
      <MobilePagination
        count={5}
        page={3}
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

  it('onChange', () => {
    const onChangeMock = jest.fn()
    render(<MobilePagination count={5} page={3} onChange={onChangeMock} />)
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[0])
    expect(onChangeMock).toHaveBeenCalledWith(2)

    fireEvent.click(buttonRoles[1])
    expect(onChangeMock).toHaveBeenCalledWith(4)
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<MobilePagination ref={ref} count={5} page={3} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<MobilePagination count={5} page={3} onChange={() => {}} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
