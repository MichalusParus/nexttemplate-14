import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { MultiSelect } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('multiSelectTest', 5)

describe('MultiSelect', () => {
  it('default', () => {
    render(
      <MultiSelect
        className="className"
        name="multiSelectTest"
        placeholder="placeholder"
        value={[]}
        options={options}
        onChange={() => {}}
      />,
    )
    const multiSelectTestId = screen.getByTestId('Select')
    const comboboxRole = screen.getByRole('combobox')

    expect(multiSelectTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveTextContent('placeholder')
    expect(comboboxRole).toHaveAttribute('id', 'multiSelectTest')
    expect(comboboxRole).toHaveAttribute('name', 'multiSelectTest')
    expect(comboboxRole).toHaveAttribute('type', 'button')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'listbox')

    fireEvent.click(comboboxRole)
    const dropdownTestId = screen.getByTestId('Dropdown')
    const listboxTestId = screen.getByTestId('ListBox')
    const optionRoles = screen.getAllByRole('option')

    expect(comboboxRole).toHaveAttribute('aria-controls', listboxTestId.getAttribute('id'))
    expect(comboboxRole).toHaveAttribute('aria-owns', listboxTestId.getAttribute('id'))
    expect(dropdownTestId).toBeInTheDocument()
    expect(listboxTestId).toBeInTheDocument()
    expect(listboxTestId).toHaveAttribute('id', comboboxRole.getAttribute('aria-controls'))
    expect(listboxTestId).toHaveAttribute('aria-hidden')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'true')
    expect(listboxTestId).toHaveAttribute('aria-hidden', 'false')
    expect(optionRoles).toHaveLength(options.length)
    comboboxRole.focus()
    expect(document.activeElement).toBe(comboboxRole)
  })

  it('value', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        value={[options[0].value, options[1].value]}
        options={options}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)
    fireEvent.click(comboboxRole)
    const optionRoles = screen.getAllByRole('option')
    expect(optionRoles[0]).toHaveClass('selected')
    expect(optionRoles[1]).toHaveClass('selected')
    expect(optionRoles[2]).not.toHaveClass('selected')
  })

  it('displayChips', () => {
    const spy = jest.fn()
    render(
      <MultiSelect
        name="multiSelectTest"
        value={[options[0].value, options[1].value]}
        options={options}
        displayChips
        onChange={spy}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')
    const clearTestIds = screen.getAllByTestId('ClearButton')

    expect(chipTestIds).toHaveLength(2)
    expect(chipTestIds[0]).toHaveTextContent(options[0].label)
    expect(chipTestIds[1]).toHaveTextContent(options[1].label)
    expect(clearTestIds).toHaveLength(2)

    fireEvent.click(clearTestIds[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([options[1].value])
  })

  it('error', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        value={[]}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/listboxProps/chipProps', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        value={[options[0].value]}
        options={options}
        displayChips
        onChange={() => {}}
        dropdownProps={{ className: 'dropdownClass' }}
        listboxProps={{ className: 'listboxClass' }}
        chipProps={{ className: 'chipClass' }}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    fireEvent.click(comboboxRole)
    const dropdownTestId = screen.getByTestId('Dropdown')
    const listboxTestId = screen.getByTestId('ListBox')
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(listboxTestId).toHaveClass('listboxClass')
    expect(chipTestIds[0]).toHaveClass('chipClass')
  })

  it('onClear', () => {
    const spy = jest.fn()
    render(
      <MultiSelect
        name="multiSelectTest"
        value={[options[0].value, options[1].value]}
        options={options}
        onChange={spy}
      />,
    )
    const clearTestId = screen.getByTestId('ClearAllButton')

    expect(clearTestId).toBeInTheDocument()
    fireEvent.click(clearTestId)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([])
  })

  it('onOpen/onClose', () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    render(
      <MultiSelect
        name="multiSelectTest"
        value={[]}
        options={options}
        onChange={() => {}}
        onOpen={spyOpen}
        onClose={spyClose}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)

    expect(spyOpen).toHaveBeenCalledTimes(1)
    expect(spyClose).toHaveBeenCalledTimes(0)

    spyOpen.mockClear()

    fireEvent.click(comboboxRole)
    expect(spyClose).toHaveBeenCalledTimes(1)
    expect(spyOpen).toHaveBeenCalledTimes(0)
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <MultiSelect
        name="multiSelectTest"
        value={[options[0].value]}
        options={options}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)
    fireEvent.click(comboboxRole)
    const optionRoles = screen.getAllByRole('option')
    fireEvent.click(optionRoles[4])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([options[0].value, options[4].value])
    fireEvent.click(optionRoles[0])
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenNthCalledWith(2, [])
  })

  it('disabled', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        value={[]}
        options={options}
        disabled
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('disabled')
  })

  it('children', () => {
    render(
      <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}}>
        <div data-testid="test">test</div>
      </MultiSelect>,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    const testId = screen.getByTestId('test')

    expect(testId).toBeInTheDocument()
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <MultiSelect
        ref={ref}
        name="multiSelectTest"
        value={[]}
        options={options}
        onChange={() => {}}
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
      <MultiSelect
        name="multiSelectTest"
        value={[]}
        options={options}
        onChange={() => {}}
        title="title"
      />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
