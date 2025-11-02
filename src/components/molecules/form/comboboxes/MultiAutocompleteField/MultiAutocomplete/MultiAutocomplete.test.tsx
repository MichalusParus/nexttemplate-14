import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { getGroupedOptions, getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen, waitFor } from '.././../../../../../../.jest/customRender'
import { MultiAutocomplete } from './MultiAutocomplete'

expect.extend(toHaveNoViolations)

const options = getOptions('multiAutocompleteTest', 5)

describe('MultiAutocomplete', () => {
  it('default', async () => {
    render(
      <MultiAutocomplete
        className="className"
        name="multiAutocompleteTest"
        placeholder="placeholder"
        value={[options[0].value]}
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const multiAutocompleteTestId = screen.getByTestId('Autocomplete')
    const comboboxRole = screen.getByRole('combobox')
    const textboxRole = screen.getByRole('textbox')

    expect(multiAutocompleteTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveAttribute('id', 'multiAutocompleteTest-combobox')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'listbox')
    expect(textboxRole).toHaveAttribute('id', 'multiAutocompleteTest')
    expect(textboxRole).toHaveAttribute('name', 'multiAutocompleteTest')
    expect(textboxRole).toHaveAttribute('placeholder', 'placeholder')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

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

  it('value', async () => {
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={options.map(v => v.value).slice(0, 2)}
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const optionRoles = screen.getAllByRole('option')
    expect(optionRoles[0]).toHaveClass('selected')
    expect(optionRoles[1]).toHaveClass('selected')
    expect(optionRoles[2]).not.toHaveClass('selected')
  })

  it('displayChips', async () => {
    const spy = jest.fn()
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={options.map(v => v.value).slice(0, 2)}
        displayChips
        options={options}
        onInputChange={() => {}}
        onChange={spy}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')
    const clearTestIds = screen.getAllByTestId('ClearButton')

    expect(chipTestIds).toHaveLength(2)
    expect(chipTestIds[0]).toHaveTextContent(options[0].label)
    expect(chipTestIds[1]).toHaveTextContent(options[1].label)
    expect(clearTestIds).toHaveLength(2)

    await act(async () => {
      fireEvent.click(clearTestIds[0])
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([options[1].value])
  })

  it('groupedOptions', async () => {
    const groupedOptions = getGroupedOptions('selectTest')
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={options.map(v => v.value).slice(0, 2)}
        displayChips
        options={groupedOptions}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const groupLabelTestIds = screen.getAllByTestId('GroupLabel')
    const optionRoles = screen.getAllByRole('option')

    expect(groupLabelTestIds).toHaveLength(groupedOptions.length)
    expect(optionRoles).toHaveLength(groupedOptions.flatMap(group => group.groupedOptions).length)
  })

  it('error', () => {
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        error="error"
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/listboxProps/chipProps/inputProps', async () => {
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        displayChips
        dropdownProps={{ className: 'dropdownClass' }}
        listboxProps={{ className: 'listboxClass' }}
        chipProps={{ className: 'chipClass' }}
        inputProps={{ className: 'inputClass' }}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const dropdownTestId = screen.getByTestId('Dropdown')
    const listboxTestId = screen.getByTestId('ListBox')
    const chipTestIds = screen.getAllByTestId('Chip')
    const inputTestId = screen.getByTestId('InputWrap')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(listboxTestId).toHaveClass('listboxClass')
    expect(chipTestIds[0]).toHaveClass('chipClass')
    expect(inputTestId).toHaveClass('inputClass')
  })

  it('onClear', async () => {
    const spy = jest.fn()
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        onInputChange={() => {}}
        onChange={spy}
      />,
    )
    const clearTestId = screen.getByTestId('ClearAllButton')

    expect(clearTestId).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(clearTestId)
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([])
  })

  it('onOpen/onClose', async () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        onOpen={spyOpen}
        onClose={spyClose}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    expect(spyOpen).toHaveBeenCalledTimes(1)
    expect(spyClose).toHaveBeenCalledTimes(0)

    spyOpen.mockClear()

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    expect(spyClose).toHaveBeenCalledTimes(1)
    expect(spyOpen).toHaveBeenCalledTimes(0)
  })

  it('onInputChange', async () => {
    const spy = jest.fn()
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        onInputChange={spy}
        onChange={() => {}}
      />,
    )
    const textboxRole = screen.getByRole('textbox')

    await act(async () => {
      fireEvent.change(textboxRole, {
        target: {
          value: 'newvalue',
        },
      })
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('onChange', async () => {
    const spy = jest.fn()
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        onInputChange={() => {}}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const optionRoles = screen.getAllByRole('option')

    await act(async () => {
      fireEvent.click(optionRoles[4])
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([options[0].value, options[4].value])

    await act(async () => {
      fireEvent.click(optionRoles[0])
    })

    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenNthCalledWith(2, [])
  })

  it('objValueonChange', async () => {
    const spy = jest.fn()
    const objValueOptions = options.map(o => ({ ...o, value: { key1: o.label, key2: o.value } }))
    render(
      <MultiAutocomplete<{ key1: string; key2: string }>
        name="multiSelectTest"
        value={[objValueOptions[1].value]}
        options={objValueOptions}
        onInputChange={() => {}}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(objValueOptions[1].label)

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const optionRoles = screen.getAllByRole('option')

    expect(optionRoles[1]).toHaveClass('selected')
    expect(optionRoles[2]).not.toHaveClass('selected')

    await act(async () => {
      fireEvent.click(optionRoles[2])
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith([objValueOptions[1].value, objValueOptions[2].value])

    waitFor(() => {
      expect(optionRoles[2]).toHaveClass('selected')
      expect(optionRoles[3]).not.toHaveClass('selected')
    })
  })

  it('disabled', () => {
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        disabled
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    const textboxRole = screen.getByRole('textbox')

    expect(textboxRole).toHaveAttribute('disabled')
    expect(comboboxRole).toHaveAttribute('aria-disabled', 'true')
    expect(comboboxRole).toHaveAttribute('tabindex', '-1')
    expect(comboboxRole).toHaveClass('disabled')
  })

  it('children', async () => {
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      >
        <div data-testid="test">test</div>
      </MultiAutocomplete>,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const testId = screen.getByTestId('test')

    expect(testId).toBeInTheDocument()
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <MultiAutocomplete
        name="MultiAutocompleteTest"
        value={[options[0].value]}
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
      <label htmlFor="MultiAutocompleteTest">
        <MultiAutocomplete
          name="MultiAutocompleteTest"
          value={[options[0].value]}
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
