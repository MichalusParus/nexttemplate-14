import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../../.storybook/helpers'
import { AutocompleteCombobox } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('autocompleteComboboxTest', 2)

describe('AutocompleteCombobox', () => {
  describe('Semantics', () => {
    it('combobox role', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('className forwarded', () => {
      render(
        <AutocompleteCombobox
          className="className"
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('className')
    })

    it('combobox id', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'id',
        'autocompleteComboboxTest-combobox',
      )
    })

    it('combobox tabindex 0', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('tabindex', '0')
    })

    it('aria-expanded false when closed', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-expanded true when open', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-haspopup="listbox"', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('aria-controls and aria-owns', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('aria-controls', 'autocompleteComboboxTest-listbox')
      expect(combobox).toHaveAttribute('aria-owns', 'autocompleteComboboxTest-listbox')
    })

    it('input id, name, type, and placeholder', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          placeholder="placeholder"
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      const textbox = screen.getByRole('textbox')
      expect(textbox).toHaveAttribute('id', 'autocompleteComboboxTest')
      expect(textbox).toHaveAttribute('name', 'autocompleteComboboxTest')
      expect(textbox).toHaveAttribute('type', 'text')
      expect(textbox).toHaveAttribute('placeholder', 'placeholder')
    })

    it('input aria-autocomplete and autoComplete', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      const textbox = screen.getByRole('textbox')
      expect(textbox).toHaveAttribute('aria-autocomplete', 'list')
      expect(textbox).toHaveAttribute('autoComplete', 'off')
    })

    it('selectedOptions rendered as Ellipsis', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          multiValue={options.map(v => v.value)}
          selectedOptions={options}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      const ellipsis = screen.getByTestId('Ellipsis')

      expect(ellipsis).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toHaveTextContent(
        options.map(v => v.label).join(', '),
      )
    })

    it('displayChips renders chips with clear buttons', () => {
      const handleOnChange = jest.fn()
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          multiValue={options.map(v => v.value)}
          selectedOptions={options}
          displayChips
          handleToggle={() => {}}
          handleOnChange={handleOnChange}
          onInputChange={() => {}}
        />,
      )
      const chips = screen.getAllByTestId('Chip')
      const clearButtons = screen.getAllByTestId('ClearButton')

      expect(chips).toHaveLength(2)
      expect(chips[0]).toHaveTextContent(options[0].label)
      expect(chips[1]).toHaveTextContent(options[1].label)
      expect(clearButtons).toHaveLength(2)

      fireEvent.click(clearButtons[0])
      expect(handleOnChange).toHaveBeenCalledTimes(1)
      expect(handleOnChange).toHaveBeenCalledWith(options[0].value)
    })

    it('inputValue displayed in input', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          inputValue="test"
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('textbox')).toHaveValue('test')
    })

    it('error class', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          error="error"
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('error')
    })

    it('disabled sets aria-disabled and tabindex', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          disabled
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      const textbox = screen.getByRole('textbox')

      expect(textbox).toHaveAttribute('disabled')
      expect(combobox).toHaveAttribute('aria-disabled', 'true')
      expect(combobox).toHaveAttribute('tabindex', '-1')
      expect(combobox).toHaveClass('disabled')
    })

    it('chipProps/inputProps forwarded', () => {
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
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByTestId('InputWrap')).toHaveClass('inputClass')
      expect(screen.getAllByTestId('Chip')[0]).toHaveClass('chipClass')
    })

    it('open state adds selected class', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('selected')
    })

    it('combobox focus redirects to input', () => {
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={false}
          value={undefined}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      const textbox = screen.getByRole('textbox')

      combobox.focus()
      expect(document.activeElement).toBe(textbox)
    })
  })

  describe('Interaction', () => {
    it('click calls handleToggle', () => {
      const handleToggle = jest.fn()
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          handleToggle={handleToggle}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )

      fireEvent.click(screen.getByRole('combobox'))
      expect(handleToggle).toHaveBeenCalledTimes(1)
    })

    it('onInputChange on typing', () => {
      const onInputChange = jest.fn()
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={onInputChange}
        />,
      )

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })

      expect(onInputChange).toHaveBeenCalledTimes(1)
      expect(onInputChange).toHaveBeenCalledWith('test')
    })

    it('onClear button', () => {
      const onClear = jest.fn()
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value="value"
          onClear={onClear}
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
        />,
      )
      const clearButton = screen.getByTestId('ClearAllButton')

      expect(clearButton).toBeInTheDocument()

      fireEvent.click(clearButton)
      expect(onClear).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref', () => {
    it('forwards ref to combobox div', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <AutocompleteCombobox
          name="autocompleteComboboxTest"
          isOpen={true}
          value=""
          handleToggle={() => {}}
          handleOnChange={() => {}}
          onInputChange={() => {}}
          ref={ref}
        />,
      )
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <label htmlFor="autocompleteComboboxTest">
          <AutocompleteCombobox
            name="autocompleteComboboxTest"
            isOpen={true}
            value=""
            handleToggle={() => {}}
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
      const results = await axe(container, {
        rules: {
          label: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })
})
