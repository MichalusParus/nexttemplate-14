import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { getGroupedOptions, getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { MultiAutocomplete } from './MultiAutocomplete'

expect.extend(toHaveNoViolations)

const options = getOptions('multiAutocompleteTest', 5)

describe('MultiAutocomplete', () => {
  describe('Semantics', () => {
    it('wrapper div', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByTestId('Autocomplete')).toBeInTheDocument()
    })

    it('className forwarded to combobox', () => {
      render(
        <MultiAutocomplete
          className="className"
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('className')
    })

    it('combobox id from name prop', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'multiAutocompleteTest-combobox')
    })

    it('input id and name from name prop', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const textbox = screen.getByRole('textbox')
      expect(textbox).toHaveAttribute('id', 'multiAutocompleteTest')
      expect(textbox).toHaveAttribute('name', 'multiAutocompleteTest')
    })

    it('placeholder on input', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          placeholder="placeholder"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'placeholder')
    })

    it('displays first selected label in combobox text', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={options.map(v => v.value).slice(0, 2)}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveTextContent(options[0].label)
    })

    it('multiple selected options have selected class', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={options.map(v => v.value).slice(0, 2)}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const optionElements = screen.getAllByRole('option')
      expect(optionElements[0]).toHaveClass('selected')
      expect(optionElements[1]).toHaveClass('selected')
      expect(optionElements[2]).not.toHaveClass('selected')
    })

    it('aria-expanded false when closed', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-haspopup="listbox"', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('aria-expanded true when open', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-controls and aria-owns link to listbox', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      const listbox = screen.getByTestId('ListBox')
      expect(combobox).toHaveAttribute('aria-controls', listbox.getAttribute('id'))
      expect(combobox).toHaveAttribute('aria-owns', listbox.getAttribute('id'))
      expect(listbox).toHaveAttribute('id', combobox.getAttribute('aria-controls'))
    })

    it('listbox aria-hidden false when open', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('ListBox')).toHaveAttribute('aria-hidden', 'false')
    })

    it('renders options', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getAllByRole('option')).toHaveLength(options.length)
    })

    it('displayChips renders chips for each value', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={options.map(v => v.value).slice(0, 2)}
          displayChips
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const chips = screen.getAllByTestId('Chip')

      expect(chips).toHaveLength(2)
      expect(chips[0]).toHaveTextContent(options[0].label)
      expect(chips[1]).toHaveTextContent(options[1].label)
    })

    it('grouped options render groups', async () => {
      const groupedOptions = getGroupedOptions('selectTest')
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={options.map(v => v.value).slice(0, 2)}
          displayChips
          options={groupedOptions}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const groupLabels = screen.getAllByTestId('GroupLabel')
      const optionElements = screen.getAllByRole('option')

      expect(groupLabels).toHaveLength(groupedOptions.length)
      expect(optionElements).toHaveLength(
        groupedOptions.flatMap(group => group.groupedOptions).length,
      )
    })

    it('error class', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          error="error"
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('error')
    })

    it('disabled sets aria-disabled and tabindex', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          disabled
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      const textbox = screen.getByRole('textbox')

      expect(textbox).toHaveAttribute('disabled')
      expect(combobox).toHaveAttribute('aria-disabled', 'true')
      expect(combobox).toHaveAttribute('tabindex', '-1')
      expect(combobox).toHaveClass('disabled')
    })

    it('dropdownProps/listboxProps/chipProps/inputProps forwarded', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
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

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('Dropdown')).toHaveClass('dropdownClass')
      expect(screen.getByTestId('ListBox')).toHaveClass('listboxClass')
      expect(screen.getAllByTestId('Chip')[0]).toHaveClass('chipClass')
      expect(screen.getByTestId('InputWrap')).toHaveClass('inputClass')
    })

    it('children rendered in dropdown', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        >
          <div data-testid="test">test</div>
        </MultiAutocomplete>,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('test')).toBeInTheDocument()
    })

    it('ClearAllButton rendered when values exist', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByTestId('ClearAllButton')).toBeInTheDocument()
    })

    it('object value displays correctly', () => {
      const objValueOptions = options.map(o => ({
        ...o,
        value: { key1: o.label, key2: o.value },
      }))
      render(
        <MultiAutocomplete<{ key1: string; key2: string }>
          name="multiAutocompleteTest"
          value={[objValueOptions[1].value]}
          options={objValueOptions}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveTextContent(objValueOptions[1].label)
    })

    it('combobox focus redirects to input', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      const textbox = screen.getByRole('textbox')

      combobox.focus()
      expect(document.activeElement).toBe(textbox)
    })
  })

  describe('Keyboard', () => {
    // Arrow key navigation within the open dropdown is handled by useFocus with
    // FOCUS_SELECTORS.autocomplete (tested in useFocus's own suite).

    it('input is focusable', () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const textbox = screen.getByRole('textbox')
      textbox.focus()
      expect(document.activeElement).toBe(textbox)
    })

    it('ArrowDown on closed input opens dropdown', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      const textbox = screen.getByRole('textbox')

      await act(async () => { textbox.focus() })
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(textbox, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('Escape closes dropdown', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })
      await act(async () => {})
      await act(async () => {})

      expect(combobox).toHaveAttribute('aria-expanded', 'true')

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'Escape', code: 'Escape' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('selecting option does not close dropdown', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })

      const optionElements = screen.getAllByRole('option')

      await act(async () => { fireEvent.click(optionElements[4]) })

      expect(onChange).toHaveBeenCalled()
      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Interaction', () => {
    it('click opens dropdown', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('onChange adds unselected option', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      expect(screen.getByRole('combobox')).toHaveTextContent(options[0].label)

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const optionElements = screen.getAllByRole('option')

      await act(async () => {
        fireEvent.click(optionElements[4])
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([options[0].value, options[4].value])
    })

    it('onChange removes selected option', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const optionElements = screen.getAllByRole('option')

      await act(async () => {
        fireEvent.click(optionElements[0])
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([])
    })

    it('onChange with object values', async () => {
      const onChange = jest.fn()
      const objValueOptions = options.map(o => ({
        ...o,
        value: { key1: o.label, key2: o.value },
      }))
      render(
        <MultiAutocomplete<{ key1: string; key2: string }>
          name="multiAutocompleteTest"
          value={[objValueOptions[1].value]}
          options={objValueOptions}
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const optionElements = screen.getAllByRole('option')

      expect(optionElements[1]).toHaveClass('selected')
      expect(optionElements[2]).not.toHaveClass('selected')

      await act(async () => {
        fireEvent.click(optionElements[2])
      })

      expect(onChange).toHaveBeenCalledWith([objValueOptions[1].value, objValueOptions[2].value])
    })

    it('chip clear removes individual value', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={options.map(v => v.value).slice(0, 2)}
          displayChips
          options={options}
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )
      const clearButtons = screen.getAllByTestId('ClearButton')

      await act(async () => {
        fireEvent.click(clearButtons[0])
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([options[1].value])
    })

    it('ClearAllButton clears all values', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      const clearAllButton = screen.getByTestId('ClearAllButton')
      expect(clearAllButton).toBeInTheDocument()

      await act(async () => {
        fireEvent.click(clearAllButton)
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([])
    })

    it('disabled blocks toggle', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
          disabled
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('onOpen callback', async () => {
      const onOpen = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onOpen={onOpen}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    it('onClose callback', async () => {
      const onClose = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onClose={onClose}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onClose).toHaveBeenCalledTimes(0)

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('onInputChange callback', async () => {
      const onInputChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={onInputChange}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: 'newvalue' },
        })
      })

      expect(onInputChange).toHaveBeenCalledTimes(1)
      expect(onInputChange).toHaveBeenCalledWith('newvalue')
    })
  })

  describe('SelectAll', () => {
    it('selectAll renders SelectAllOption in dropdown', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[]}
          options={options}
          selectAll
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByRole('option', { name: /select all/i })).toBeInTheDocument()
      expect(screen.getAllByRole('option')).toHaveLength(options.length + 1)
    })

    it('selectAll not rendered when prop absent', async () => {
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.queryByRole('option', { name: /select all/i })).not.toBeInTheDocument()
    })

    it('click SelectAllOption with none selected calls onChange with all values', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[]}
          options={options}
          selectAll
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      expect(onChange).toHaveBeenCalledWith(options.map(o => o.value))
    })

    it('click SelectAllOption with all selected calls onChange with empty', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={options.map(o => o.value)}
          options={options}
          selectAll
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      expect(onChange).toHaveBeenCalledWith([])
    })

    it('click SelectAllOption with some selected selects all', async () => {
      const onChange = jest.fn()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          selectAll
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      expect(onChange).toHaveBeenCalledWith(options.map(o => o.value))
    })

    it('selectAll works with object values', async () => {
      const onChange = jest.fn()
      const objOptions = options.map(o => ({ ...o, value: { key: o.value } }))
      render(
        <MultiAutocomplete<{ key: string }>
          name="multiAutocompleteTest"
          value={[]}
          options={objOptions}
          selectAll
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      expect(onChange).toHaveBeenCalledWith(objOptions.map(o => o.value))
    })

    it('selectAll skips disabled options', async () => {
      const onChange = jest.fn()
      const optionsWithDisabled = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2', isDisabled: true },
        { label: 'Option 3', value: 'opt3' },
      ]
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[]}
          options={optionsWithDisabled}
          selectAll
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      expect(onChange).toHaveBeenCalledWith(['opt1', 'opt3'])
    })

    it('selectAll with filtered options selects only visible', async () => {
      const onChange = jest.fn()
      const filteredOptions = options.slice(0, 3)
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[]}
          options={filteredOptions}
          selectAll
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      expect(onChange).toHaveBeenCalledWith(filteredOptions.map(o => o.value))
    })

    it('selectAll deselect with filtered options preserves hidden selections', async () => {
      const onChange = jest.fn()
      const filteredOptions = options.slice(0, 3)
      const allSelectedValues = options.map(o => o.value)
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={allSelectedValues}
          options={filteredOptions}
          selectAll
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      // Should only remove filtered options, keeping options[3] and options[4]
      expect(onChange).toHaveBeenCalledWith(options.slice(3).map(o => o.value))
    })
  })

  describe('Ref', () => {
    it('forwards ref to combobox div', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <MultiAutocomplete
          name="multiAutocompleteTest"
          value={[options[0].value]}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
          ref={ref}
        />,
      )
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <label htmlFor="multiAutocompleteTest">
          <MultiAutocomplete
            name="multiAutocompleteTest"
            value={[options[0].value]}
            options={options}
            onInputChange={() => {}}
            onChange={() => {}}
          />
        </label>,
      )

      const results = await axe(container, {
        rules: {
          label: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })

    it('no axe violations with selectAll', async () => {
      const { container } = render(
        <label htmlFor="multiAutocompleteTest">
          <MultiAutocomplete
            name="multiAutocompleteTest"
            value={[options[0].value]}
            options={options}
            selectAll
            onInputChange={() => {}}
            onChange={() => {}}
          />
        </label>,
      )

      const results = await axe(container, {
        rules: {
          label: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })
})
