import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../../.storybook/helpers'
import { AutocompleteCombobox } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('autocompleteComboboxTest', 2)

describe('AutocompleteCombobox', () => {
  it('default', () => {
    render(
      <AutocompleteCombobox
        className="className"
        name="autocompleteComboboxTest"
        isOpen={false}
        value={undefined}
        placeholder="placeholder"
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    const textboxRole = screen.getByRole('textbox')

    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveAttribute('id', 'autocompleteComboboxTest-combobox')
    expect(comboboxRole).toHaveAttribute('tabindex', '0')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'listbox')
    expect(comboboxRole).toHaveAttribute('aria-controls', 'autocompleteComboboxTest-listbox')
    expect(comboboxRole).toHaveAttribute('aria-owns', 'autocompleteComboboxTest-listbox')
    expect(textboxRole).toHaveAttribute('id', 'autocompleteComboboxTest')
    expect(textboxRole).toHaveAttribute('name', 'autocompleteComboboxTest')
    expect(textboxRole).toHaveAttribute('type', 'text')
    expect(textboxRole).toHaveAttribute('placeholder', 'placeholder')
    expect(textboxRole).toHaveAttribute('aria-autocomplete', 'list')
    expect(textboxRole).toHaveAttribute('autoComplete', 'off')
    comboboxRole.focus()
    expect(document.activeElement).toBe(textboxRole)
  })

  it('open', () => {
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('aria-expanded', 'true')
    expect(comboboxRole).toHaveClass('selected')
  })

  it('inputValue', () => {
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        inputValue="test"
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const textboxRole = screen.getByRole('textbox')

    expect(textboxRole).toHaveValue('test')
  })

  it('selectedOptions', () => {
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        multiValue={options.map(v => v.value)}
        selectedOptions={options}
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    const ellipsisTestId = screen.getByTestId('Ellipsis')

    expect(ellipsisTestId).toBeInTheDocument()
    expect(comboboxRole).toHaveTextContent(options.map(v => v.label).join(', '))
  })

  it('displayChips', () => {
    const spy = jest.fn()
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        multiValue={options.map(v => v.value)}
        selectedOptions={options}
        displayChips
        handleOpen={() => {}}
        handleOnChange={spy}
        onInputChange={() => {}}
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
    expect(spy).toHaveBeenCalledWith(options[0].value)
  })

  it('error', () => {
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        error="error"
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('chipProps/inputProps', () => {
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        multiValue={options.map(v => v.value)}
        selectedOptions={options}
        displayChips
        inputProps={{ className: 'inputClass' }}
        chipProps={{ className: 'chipClass' }}
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')
    const inputTestId = screen.getByTestId('InputWrap')

    expect(inputTestId).toHaveClass('inputClass')
    expect(chipTestIds[0]).toHaveClass('chipClass')
  })

  it('onClear', () => {
    const spy = jest.fn()
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value="value"
        onClear={spy}
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const clearTestId = screen.getByTestId('ClearAllButton')

    expect(clearTestId).toBeInTheDocument()

    fireEvent.click(clearTestId)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('handleOpen', () => {
    const spy = jest.fn()
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        handleOpen={spy}
        handleOnChange={() => {}}
        onInputChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={spy}
      />,
    )
    const textboxRole = screen.getByRole('textbox')

    fireEvent.change(textboxRole, { target: { value: 'test' } })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('test')
  })

  it('disabled', () => {
    render(
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        disabled
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
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
      <AutocompleteCombobox
        name="autocompleteComboboxTest"
        isOpen={true}
        value=""
        handleOpen={() => {}}
        handleOnChange={() => {}}
        onInputChange={() => {}}
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
      <label htmlFor="autocompleteComboboxTest">
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          handleOpen={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />
        <ul
          id="autocompleteComboboxTest-listbox"
          role="listbox"
          aria-labelledby="autocompleteComboboxTest-combobox"
        ></ul>
      </label>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
