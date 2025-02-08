import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { getOptions } from '../../../../../.storybook/helpers'
import { ListBox } from '.'

expect.extend(toHaveNoViolations)

describe('ListBox', () => {
  const options = getOptions('listboxTest', 20)
  it('default', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
      />,
    )
    const listboxRole = screen.getByRole('listbox')
    const optionRoles = screen.getAllByRole('option')
    const checkIconTestIds = screen.getAllByTestId('CheckIcon')

    expect(listboxRole).toBeInTheDocument()
    expect(listboxRole).toHaveClass('className')
    expect(listboxRole).toHaveAttribute('id', 'listboxTest')
    expect(listboxRole).toHaveAttribute('aria-labelledby', 'listboxTest-label')
    expect(optionRoles).toHaveLength(options.length)
    expect(optionRoles[0]).toHaveTextContent(options[0].label)
    expect(checkIconTestIds).toHaveLength(options.length)
  })

  it('noOptions', () => {
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={[]}
        noOptionLabel="noOptions"
        onClick={() => {}}
      />,
    )
    const optionsQuery = screen.queryAllByRole('option')
    const noOptionText = screen.getByText('noOptions')

    expect(optionsQuery).toHaveLength(0)
    expect(noOptionText).toBeInTheDocument()
  })

  it('value', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={['value1listboxTest']}
        options={options}
        onClick={() => {}}
      />,
    )
    const optionRoles = screen.getAllByRole('option')
    const checkIconTestIds = screen.getAllByTestId('CheckIcon')

    expect(optionRoles[0]).toHaveAttribute('aria-selected', 'true')
    expect(optionRoles[0]).toHaveClass('selected')
    expect(optionRoles[1]).not.toHaveClass('selected')
    expect(checkIconTestIds[0]).toHaveClass('opacity-100')
    expect(checkIconTestIds[1]).toHaveClass('opacity-0')
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        onClick={spy}
      />,
    )
    const optionRoles = screen.getAllByRole('option')

    fireEvent.click(optionRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('value1listboxTest')
  })

  it('isLoading', () => {
    const spy = jest.fn()
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        isLoading
        onClick={spy}
      />,
    )
    const optionRoles = screen.getAllByRole('option')

    fireEvent.keyDown(optionRoles[0], { code: 'Space' })
    fireEvent.click(optionRoles[0])
    expect(spy).toHaveBeenCalledTimes(0)
    expect(spy).not.toHaveBeenCalledWith('value1listboxTest')
    expect(optionRoles[0]).toHaveAttribute('aria-disabled', 'true')
  })

  it('hideCheckbox', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
        hideCheckbox
      />,
    )
    const checkIconTestIds = screen.queryAllByTestId('CheckIcon')

    expect(checkIconTestIds).toHaveLength(0)
  })

  it('buttonProps/checkboxProps', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        buttonProps={{ className: 'buttonClass' }}
        checkboxProps={{ className: 'checkboxClass' }}
        onClick={() => {}}
      />,
    )
    const checkboxTestIds = screen.getAllByTestId('Checkbox')
    const optionRoles = screen.getAllByRole('option')

    expect(checkboxTestIds[0]).toHaveClass('checkboxClass')
    expect(optionRoles[0]).toHaveClass('buttonClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLUListElement>()
    render(<ListBox ref={ref} name="listboxTest" value={[]} options={options} onClick={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <>
        <div id="listboxTest-label">Label</div>
        <ListBox name="listboxTest" value={[]} options={options} onClick={() => {}} />
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
