import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../../../.storybook/helpers'
import { OptionItem } from '.'

expect.extend(toHaveNoViolations)

describe('OptionItem', () => {
  const options = getOptions('optionItemTest', 1)
  it('default', () => {
    render(<OptionItem label={options[0].label} value={''} isSelected={false} onClick={() => {}} />)
    const optionRole = screen.getByRole('option')
    const checkIconTestId = screen.getByTestId('CheckIcon')

    expect(optionRole).toBeInTheDocument()
    expect(optionRole).toHaveTextContent(options[0].label)
    expect(optionRole).toHaveAttribute('tabIndex', '-1')
    expect(optionRole).toHaveAttribute('aria-selected', 'false')
    expect(optionRole).not.toHaveClass('selected')
    expect(checkIconTestId).toBeInTheDocument()
  })

  it('isSelected', () => {
    render(<OptionItem label={options[0].label} value={''} isSelected={true} onClick={() => {}} />)
    const optionRole = screen.getByRole('option')

    expect(optionRole).toHaveAttribute('aria-selected', 'true')
    expect(optionRole).toHaveClass('selected')
  })

  it('hideCheckbox', () => {
    render(
      <OptionItem
        label={options[0].label}
        value={''}
        isSelected={false}
        hideCheckbox
        onClick={() => {}}
      />,
    )
    const checkIconQuery = screen.queryByTestId('CheckIcon')

    expect(checkIconQuery).not.toBeInTheDocument()
  })

  it('onClick', async () => {
    const spy = jest.fn()
    render(
      <OptionItem
        label={options[0].label}
        value={options[0].value}
        isSelected={false}
        hideCheckbox
        onClick={spy}
      />,
    )
    const optionRole = screen.getByRole('option')

    await act(async () => {
      fireEvent.click(optionRole)
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(options[0].value)
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <OptionItem
        label={options[0].label}
        value={''}
        isSelected={false}
        onClick={() => {}}
        ref={ref}
      />,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <ul role="listbox" aria-label="label">
        <OptionItem label={options[0].label} value={''} isSelected={false} onClick={() => {}} />
      </ul>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
