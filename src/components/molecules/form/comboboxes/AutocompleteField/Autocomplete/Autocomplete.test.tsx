import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { getGroupedOptions, getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { Autocomplete } from './Autocomplete'

expect.extend(toHaveNoViolations)

const options = getOptions('autocompleteTest', 5)

describe('Autocomplete', () => {
  describe('Semantics', () => {
    it('wrapper div', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByTestId('Autocomplete')).toBeInTheDocument()
    })

    it('className forwarded to combobox', () => {
      render(
        <Autocomplete
          className="className"
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('className')
    })

    it('combobox id from name prop', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'autocompleteTest-combobox')
    })

    it('input id and name from name prop', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const textbox = screen.getByRole('textbox')
      expect(textbox).toHaveAttribute('id', 'autocompleteTest')
      expect(textbox).toHaveAttribute('name', 'autocompleteTest')
    })

    it('placeholder on input', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          placeholder="placeholder"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'placeholder')
    })

    it('displays selected label in input', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={options[0].value}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('textbox')).toHaveValue(options[0].label)
    })

    it('aria-expanded false when closed', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-haspopup="listbox"', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('aria-expanded true when open', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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

    it('listbox aria-hidden toggles with open state', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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

    it('dropdown renders when open', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })

    it('renders options', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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

    it('selected option has selected class', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={options[0].value}
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
      expect(optionElements[1]).not.toHaveClass('selected')
    })

    it('error class', () => {
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
      expect(screen.getByRole('combobox')).toHaveClass('error')
    })

    it('disabled sets aria-disabled and tabindex', () => {
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
      const combobox = screen.getByRole('combobox')
      const textbox = screen.getByRole('textbox')

      expect(textbox).toHaveAttribute('disabled')
      expect(combobox).toHaveAttribute('aria-disabled', 'true')
      expect(combobox).toHaveAttribute('tabindex', '-1')
      expect(combobox).toHaveClass('disabled')
    })

    it('displayChips renders chips', () => {
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
      const chips = screen.getAllByTestId('Chip')

      expect(chips).toHaveLength(5)
      expect(chips[0]).toHaveTextContent(options[0].label)
    })

    it('grouped options render groups and options', async () => {
      const groupedOptions = getGroupedOptions('selectTest')
      render(
        <Autocomplete
          name="autocompleteTest"
          value="value"
          multiValue={options.map(v => v.value)}
          selectedOptions={[]}
          options={groupedOptions}
          displayChips
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

    it('dropdownProps/listboxProps/chipProps/inputProps forwarded', async () => {
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

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('test')).toBeInTheDocument()
    })

    it('object value displays correct label', () => {
      const objValueOptions = options.map(o => ({
        ...o,
        value: { key1: o.label, key2: o.value },
      }))
      render(
        <Autocomplete<{ key1: string; key2: string }>
          name="autocompleteTest"
          value={objValueOptions[1].value}
          options={objValueOptions}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('textbox')).toHaveValue(objValueOptions[1].label)
    })

    it('input has aria-autocomplete and autoComplete', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const textbox = screen.getByRole('textbox')
      expect(textbox).toHaveAttribute('aria-autocomplete', 'list')
      expect(textbox).toHaveAttribute('autoComplete', 'off')
    })

    it('combobox focus redirects to input', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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
    const openAutocomplete = async () => {
      const combobox = screen.getByRole('combobox')
      await act(async () => { fireEvent.click(combobox) })
      await act(async () => {})
      await act(async () => {})
      return combobox
    }

    it('input is focusable', () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )
      const textbox = screen.getByRole('textbox')
      textbox.focus()
      expect(document.activeElement).toBe(textbox)
    })

    // -- Open via keyboard --

    it('ArrowDown on closed input opens dropdown', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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

    // -- Escape --

    it('Escape closes dropdown', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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

    // -- Selection --

    it('selecting option closes dropdown', async () => {
      const onChange = jest.fn()
      render(
        <Autocomplete
          name="autocompleteTest"
          value={options[0].value}
          options={options}
          onInputChange={() => {}}
          onChange={onChange}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })

      const optionElements = screen.getAllByRole('option')

      await act(async () => { fireEvent.click(optionElements[4]) })

      expect(onChange).toHaveBeenCalledWith(options[4].value)
      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    // -- Arrow navigation --

    it('ArrowDown focuses first option', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await openAutocomplete()
      const optionElements = screen.getAllByRole('option')

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(optionElements[0])
    })

    it('ArrowDown moves to next option', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await openAutocomplete()
      const optionElements = screen.getAllByRole('option')

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'ArrowDown', code: 'ArrowDown' })
      })

      await act(async () => {
        fireEvent.keyDown(optionElements[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(optionElements[1])
    })

    it('ArrowUp moves to previous option', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />,
      )

      await openAutocomplete()
      const optionElements = screen.getAllByRole('option')

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'ArrowDown', code: 'ArrowDown' })
      })

      await act(async () => {
        fireEvent.keyDown(optionElements[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      await act(async () => {
        fireEvent.keyDown(optionElements[1], { key: 'ArrowUp', code: 'ArrowUp' })
      })

      expect(document.activeElement).toBe(optionElements[0])
    })
  })

  describe('Interaction', () => {
    it('click opens dropdown', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })

    it('click toggles closed', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('typing opens dropdown and calls onOpen', async () => {
      const onOpen = jest.fn()
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
          onOpen={onOpen}
        />,
      )
      const combobox = screen.getByRole('combobox')
      const textbox = screen.getByRole('textbox')

      expect(combobox).toHaveAttribute('aria-expanded', 'false')

      await act(async () => {
        fireEvent.change(textbox, { target: { value: 'test' } })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    it('onChange fires with selected value', async () => {
      const onChange = jest.fn()
      render(
        <Autocomplete
          name="autocompleteTest"
          value={options[0].value}
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
        fireEvent.click(optionElements[4])
      })

      expect(onChange).toHaveBeenCalledWith(options[4].value)
    })

    it('onChange with object values', async () => {
      const onChange = jest.fn()
      const objValueOptions = options.map(o => ({
        ...o,
        value: { key1: o.label, key2: o.value },
      }))
      render(
        <Autocomplete<{ key1: string; key2: string }>
          name="autocompleteTest"
          value={objValueOptions[1].value}
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

      expect(onChange).toHaveBeenCalledWith(objValueOptions[2].value)
    })

    it('onInputChange callback', async () => {
      const onInputChange = jest.fn()
      render(
        <Autocomplete
          name="autocompleteTest"
          value="value1"
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

    it('onOpen callback', async () => {
      const onOpen = jest.fn()
      render(
        <Autocomplete
          name="autocompleteTest"
          value="value"
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

    it('disabled blocks toggle', async () => {
      render(
        <Autocomplete
          name="autocompleteTest"
          value={undefined}
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

    it('onClose callback', async () => {
      const onClose = jest.fn()
      render(
        <Autocomplete
          name="autocompleteTest"
          value="value"
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
  })

  describe('Ref', () => {
    it('forwards ref to combobox div', () => {
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
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
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

      const results = await axe(container, {
        rules: {
          label: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })
})
