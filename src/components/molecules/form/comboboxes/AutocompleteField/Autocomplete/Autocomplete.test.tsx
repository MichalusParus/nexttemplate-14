import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { Autocomplete } from './Autocomplete'

expect.extend(toHaveNoViolations)

const options = getOptions('autocompleteTest', 5)

describe('Autocomplete', () => {
  it('default', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        placeholder="placeholder"
        value={undefined}
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const autocompleteTestId = screen.getByTestId('Autocomplete')
    const comboboxRole = screen.getByRole('combobox')
    const textboxRole = screen.getByRole('textbox')

    expect(autocompleteTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveAttribute('id', 'autocompleteTest-combobox')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'listbox')
    expect(textboxRole).toHaveAttribute('id', 'autocompleteTest')
    expect(textboxRole).toHaveAttribute('placeholder', 'placeholder')
    expect(textboxRole).toHaveAttribute('name', 'autocompleteTest')

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
      <Autocomplete
        name="autocompleteTest"
        value={options[0].value}
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    const textboxRole = screen.getByRole('textbox')

    expect(textboxRole).toHaveValue(options[0].label)

    fireEvent.click(comboboxRole)
    const optionRoles = screen.getAllByRole('option')

    expect(optionRoles[0]).toHaveClass('selected')
    expect(optionRoles[1]).not.toHaveClass('selected')
  })

  it('displayChips', () => {
    render(
      <Autocomplete
        name="autocompleteTest"
        value="value"
        multiValue={options.map(v => v.value)}
        selectedOptions={options}
        options={options}
        displayChips
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(chipTestIds).toHaveLength(5)
    expect(chipTestIds[0]).toHaveTextContent(options[0].label)
  })

  it('error', () => {
    render(
      <Autocomplete
        name="autocompleteTest"
        value="value"
        options={options}
        error="error"
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/listboxProps/chipProps/inputProps', () => {
    render(
      <Autocomplete
        name="autocompleteTest"
        value="value"
        multiValue={options.map(v => v.value)}
        options={options}
        selectedOptions={options}
        displayChips
        onInputChange={() => {}}
        onChange={() => {}}
        chipProps={{ className: 'chipClass' }}
        inputProps={{ className: 'inputClass' }}
        dropdownProps={{ className: 'dropdownClass' }}
        listboxProps={{ className: 'listboxClass' }}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    const dropdownTestId = screen.getByTestId('Dropdown')
    const listboxTestId = screen.getByTestId('ListBox')
    const chipTestIds = screen.getAllByTestId('Chip')
    const inputTestId = screen.getByTestId('InputWrap')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(listboxTestId).toHaveClass('listboxClass')
    expect(chipTestIds[0]).toHaveClass('chipClass')
    expect(inputTestId).toHaveClass('inputClass')
  })

  it('onOpen/onClose', () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    render(
      <Autocomplete
        name="autocompleteTest"
        value="value"
        options={options}
        onOpen={spyOpen}
        onClose={spyClose}
        onInputChange={() => {}}
        onChange={() => {}}
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

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        value="value1"
        options={options}
        onInputChange={spy}
        onChange={() => {}}
      />,
    )
    const textboxRole = screen.getByRole('textbox')

    fireEvent.change(textboxRole, {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <Autocomplete
        name="autocompleteTest"
        value={options[0].value}
        options={options}
        onInputChange={() => {}}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    const optionRoles = screen.getAllByRole('option')

    fireEvent.click(optionRoles[4])

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(options[4].value)
  })

  it('children', () => {
    render(
      <Autocomplete
        name="autocompleteTest"
        value="value"
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      >
        <div data-testid="test">test</div>
      </Autocomplete>,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    const testId = screen.getByTestId('test')

    expect(testId).toBeInTheDocument()
  })

  it('disabled', () => {
    render(
      <Autocomplete
        name="autocompleteTest"
        value="value"
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
        disabled
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    const textboxRole = screen.getByRole('textbox')

    expect(textboxRole).toHaveAttribute('disabled')
    expect(comboboxRole).toHaveAttribute('aria-disabled', 'true')
    expect(comboboxRole).toHaveAttribute('tabindex', '-1')
    expect(comboboxRole).toHaveClass('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Autocomplete
        name="autocompleteTest"
        value="value"
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
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
      <label htmlFor="autocompleteTest">
        <Autocomplete
          name="autocompleteTest"
          value="value"
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </label>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
