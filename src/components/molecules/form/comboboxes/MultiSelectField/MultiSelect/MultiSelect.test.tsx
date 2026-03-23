import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { getGroupedOptions, getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { MultiSelect } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('multiSelectTest', 5)

describe('MultiSelect', () => {
  describe('Semantics', () => {
    it('wrapper div', () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      expect(screen.getByTestId('Select')).toBeInTheDocument()
    })

    it('className forwarded to combobox', () => {
      render(
        <MultiSelect
          className="className"
          name="multiSelectTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('id', 'multiSelectTest')
      expect(combobox).toHaveAttribute('name', 'multiSelectTest')
    })

    it('type="button"', () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('type', 'button')
    })

    it('placeholder when empty', () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          placeholder="placeholder"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveTextContent('placeholder')
    })

    it('displays first selected label', () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value, options[1].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveTextContent(options[0].label)
    })

    it('multiple selected options have selected class', async () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value, options[1].value]}
          options={options}
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
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-haspopup="listbox"', () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('aria-expanded true when open', async () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-controls and aria-owns link to listbox', async () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const combobox = screen.getByRole('combobox')
      const listbox = screen.getByTestId('ListBox')
      expect(combobox).toHaveAttribute('aria-controls', listbox.getAttribute('id'))
      expect(combobox).toHaveAttribute('aria-owns', listbox.getAttribute('id'))
    })

    it('listbox aria-hidden false when open', async () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('ListBox')).toHaveAttribute('aria-hidden', 'false')
    })

    it('renders options', async () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getAllByRole('option')).toHaveLength(options.length)
    })

    it('displayChips renders chips for each value', () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value, options[1].value]}
          options={options}
          displayChips
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
        <MultiSelect name="multiSelectTest" value={[]} options={groupedOptions} onChange={() => {}} />,
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
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          error="error"
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('error')
    })

    it('disabled sets aria-disabled', () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
    })

    it('dropdownProps forwarded', async () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          onChange={() => {}}
          dropdownProps={{ className: 'dropdownClass' }}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('Dropdown')).toHaveClass('dropdownClass')
    })

    it('listboxProps forwarded', async () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          onChange={() => {}}
          listboxProps={{ className: 'listboxClass' }}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('ListBox')).toHaveClass('listboxClass')
    })

    it('chipProps forwarded', () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value]}
          options={options}
          displayChips
          onChange={() => {}}
          chipProps={{ className: 'chipClass' }}
        />,
      )
      expect(screen.getAllByTestId('Chip')[0]).toHaveClass('chipClass')
    })

    it('children rendered in listbox', async () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}}>
          <div data-testid="test">test</div>
        </MultiSelect>,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('test')).toBeInTheDocument()
    })

    it('ClearAllButton rendered when values exist', () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      expect(screen.getByTestId('ClearAllButton')).toBeInTheDocument()
    })

    it('object value selects correctly', async () => {
      const objValueOptions = options.map(o => ({
        ...o,
        value: { key1: o.label, key2: o.value },
      }))
      render(
        <MultiSelect<{ key1: string; key2: string }>
          name="multiSelectTest"
          value={[objValueOptions[1].value]}
          options={objValueOptions}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveTextContent(objValueOptions[1].label)

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const optionElements = screen.getAllByRole('option')
      expect(optionElements[1]).toHaveClass('selected')
      expect(optionElements[2]).not.toHaveClass('selected')
    })
  })

  describe('Keyboard', () => {
    it('combobox is focusable', () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')
      combobox.focus()
      expect(document.activeElement).toBe(combobox)
    })

    it('ArrowDown on closed combobox opens dropdown', async () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { combobox.focus() })
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(combobox, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('Escape closes dropdown', async () => {
      render(
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
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
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value]}
          options={options}
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
        <MultiSelect name="multiSelectTest" value={[]} options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })

    it('onChange adds unselected option', async () => {
      const onChange = jest.fn()
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value]}
          options={options}
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

      expect(onChange).toHaveBeenCalledWith([options[0].value, options[4].value])
    })

    it('onChange removes selected option', async () => {
      const onChange = jest.fn()
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value]}
          options={options}
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

      expect(onChange).toHaveBeenCalledWith([])
    })

    it('onChange with object values', async () => {
      const onChange = jest.fn()
      const objValueOptions = options.map(o => ({
        ...o,
        value: { key1: o.label, key2: o.value },
      }))
      render(
        <MultiSelect<{ key1: string; key2: string }>
          name="multiSelectTest"
          value={[objValueOptions[1].value]}
          options={objValueOptions}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const optionElements = screen.getAllByRole('option')

      await act(async () => {
        fireEvent.click(optionElements[2])
      })

      expect(onChange).toHaveBeenCalledWith([objValueOptions[1].value, objValueOptions[2].value])
    })

    it('chip clear removes individual value', async () => {
      const onChange = jest.fn()
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value, options[1].value]}
          options={options}
          displayChips
          onChange={onChange}
        />,
      )

      const clearButtons = screen.getAllByTestId('ClearButton')

      await act(async () => {
        fireEvent.click(clearButtons[0])
      })

      expect(onChange).toHaveBeenCalledWith([options[1].value])
    })

    it('ClearAllButton clears all values', async () => {
      const onChange = jest.fn()
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value, options[1].value]}
          options={options}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('ClearAllButton'))
      })

      expect(onChange).toHaveBeenCalledWith([])
    })

    it('onOpen callback', async () => {
      const onOpen = jest.fn()
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          onChange={() => {}}
          onOpen={onOpen}
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
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          onChange={() => {}}
          onClose={onClose}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onClose).toHaveBeenCalledTimes(0)

      fireEvent.click(combobox)
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('SelectAll', () => {
    it('selectAll renders SelectAllOption in dropdown', async () => {
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          selectAll
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
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
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
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          selectAll
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
        <MultiSelect
          name="multiSelectTest"
          value={options.map(o => o.value)}
          options={options}
          selectAll
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

    it('click SelectAllOption with some selected calls onChange with all values', async () => {
      const onChange = jest.fn()
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[options[0].value]}
          options={options}
          selectAll
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

    it('selectAll skips disabled options', async () => {
      const onChange = jest.fn()
      const optionsWithDisabled = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2', isDisabled: true },
        { label: 'Option 3', value: 'opt3' },
      ]
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={optionsWithDisabled}
          selectAll
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

    it('selectAll works with object values', async () => {
      const onChange = jest.fn()
      const objOptions = options.map(o => ({ ...o, value: { key: o.value } }))
      render(
        <MultiSelect<{ key: string }>
          name="multiSelectTest"
          value={[]}
          options={objOptions}
          selectAll
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

    it('selectAll works with grouped options', async () => {
      const onChange = jest.fn()
      const groupedOptions = getGroupedOptions('selectTest')
      render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={groupedOptions}
          selectAll
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getByRole('option', { name: /select all/i }))
      })

      const allValues = groupedOptions.flatMap(g => g.groupedOptions).map(o => o.value)
      expect(onChange).toHaveBeenCalledWith(allValues)
    })
  })

  describe('Ref', () => {
    it('forwards ref to combobox button', () => {
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
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
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

    it('no axe violations with selectAll', async () => {
      const { container } = render(
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={options}
          selectAll
          onChange={() => {}}
          title="title"
        />,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
