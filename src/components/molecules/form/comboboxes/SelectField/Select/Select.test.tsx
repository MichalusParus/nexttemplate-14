import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { getGroupedOptions, getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { Select } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('selectTest', 5)

describe('Select', () => {
  describe('Semantics', () => {
    it('wrapper div', () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      expect(screen.getByTestId('Select')).toBeInTheDocument()
    })

    it('className forwarded to combobox', () => {
      render(
        <Select
          className="className"
          name="selectTest"
          value=""
          options={options}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('id', 'selectTest')
      expect(combobox).toHaveAttribute('name', 'selectTest')
    })

    it('type="button"', () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('type', 'button')
    })

    it('placeholder when no value', () => {
      render(
        <Select
          name="selectTest"
          placeholder="placeholder"
          value=""
          options={options}
          onChange={() => {}}
        />,
      )
      expect(screen.getByRole('combobox')).toHaveTextContent('placeholder')
    })

    it('displays selected label', () => {
      render(
        <Select name="selectTest" value={options[0].value} options={options} onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveTextContent(options[0].label)
    })

    it('aria-expanded false when closed', () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-haspopup="listbox"', () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('aria-expanded true when open', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-controls and aria-owns link to listbox', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
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
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      const listbox = screen.getByTestId('ListBox')
      expect(listbox).toHaveAttribute('aria-hidden', 'false')
    })

    it('dropdown renders when open', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })

    it('renders options', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getAllByRole('option')).toHaveLength(options.length)
    })

    it('selected option has selected class and aria-selected', async () => {
      render(
        <Select name="selectTest" value={options[0].value} options={options} onChange={() => {}} />,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      const optionElements = screen.getAllByRole('option')
      expect(optionElements[0]).toHaveClass('selected')
      expect(optionElements[0]).toHaveAttribute('aria-selected', 'true')
      expect(optionElements[1]).not.toHaveClass('selected')
      expect(optionElements[1]).toHaveAttribute('aria-selected', 'false')
    })

    it('error class', () => {
      render(
        <Select name="selectTest" value="" options={options} error="error" onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveClass('error')
    })

    it('disabled sets aria-disabled', () => {
      render(
        <Select name="selectTest" value="" options={options} disabled onChange={() => {}} />,
      )
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
    })

    it('displayChips renders chips', () => {
      render(
        <Select
          name="selectTest"
          value={options[0].value}
          options={options}
          displayChips
          onChange={() => {}}
        />,
      )
      const chips = screen.getAllByTestId('Chip')
      expect(chips).toHaveLength(1)
      expect(chips[0]).toHaveTextContent(options[0].label)
    })

    it('grouped options render groups and options', async () => {
      const groupedOptions = getGroupedOptions('selectTest')
      render(
        <Select name="selectTest" value="" options={groupedOptions} onChange={() => {}} />,
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

    it('dropdownProps forwarded', async () => {
      render(
        <Select
          name="selectTest"
          value=""
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
        <Select
          name="selectTest"
          value=""
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
        <Select
          name="selectTest"
          value={options[0].value}
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
        <Select name="selectTest" value="" options={options} onChange={() => {}}>
          <div data-testid="test">test</div>
        </Select>,
      )

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      expect(screen.getByTestId('test')).toBeInTheDocument()
    })

    it('object value selects correctly', async () => {
      const objValueOptions = options.map(o => ({
        ...o,
        value: { key1: o.label, key2: o.value },
      }))
      render(
        <Select<{ key1: string; key2: string }>
          name="selectTest"
          value={objValueOptions[1].value}
          options={objValueOptions}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveTextContent(objValueOptions[1].label)

      await act(async () => {
        fireEvent.click(combobox)
      })

      const optionElements = screen.getAllByRole('option')
      expect(optionElements[1]).toHaveClass('selected')
      expect(optionElements[2]).not.toHaveClass('selected')
    })
  })

  describe('Keyboard', () => {
    const openSelect = async () => {
      const combobox = screen.getByRole('combobox')
      await act(async () => { fireEvent.click(combobox) })
      await act(async () => {})
      await act(async () => {})
      return combobox
    }

    it('combobox is focusable', () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')
      combobox.focus()
      expect(document.activeElement).toBe(combobox)
    })

    // -- Open via keyboard --

    it('ArrowDown on closed combobox opens dropdown', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { combobox.focus() })
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(combobox, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    // -- Escape --

    it('Escape closes dropdown', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
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

    it('Escape returns focus to combobox', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'Escape', code: 'Escape' })
      })

      expect(document.activeElement).toBe(combobox)
    })

    // -- Selection --

    it('selecting option closes dropdown and focuses combobox', async () => {
      const onChange = jest.fn()
      render(
        <Select name="selectTest" value="" options={options} onChange={onChange} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })

      const optionElements = screen.getAllByRole('option')

      await act(async () => { fireEvent.click(optionElements[0]) })

      expect(onChange).toHaveBeenCalledWith(options[0].value)
      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).toBe(combobox)
    })

    // -- Arrow navigation --

    it('ArrowDown focuses first option', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )

      await openSelect()
      const optionElements = screen.getAllByRole('option')

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(optionElements[0])
    })

    it('ArrowDown moves to next option', async () => {
      render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )

      await openSelect()
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
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
      )

      await openSelect()
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
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
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
        <Select name="selectTest" value="" options={options} onChange={() => {}} />,
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

    it('onChange fires with selected value', async () => {
      const onChange = jest.fn()
      render(
        <Select name="selectTest" value={options[0].value} options={options} onChange={onChange} />,
      )
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveTextContent(options[0].label)

      await act(async () => {
        fireEvent.click(combobox)
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
        <Select<{ key1: string; key2: string }>
          name="selectTest"
          value={objValueOptions[1].value}
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

      expect(onChange).toHaveBeenCalledWith(objValueOptions[2].value)
    })

    it('onOpen callback', async () => {
      const onOpen = jest.fn()
      render(
        <Select
          name="selectTest"
          value=""
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
        <Select
          name="selectTest"
          value=""
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

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('disabled blocks toggle', async () => {
      render(
        <Select name="selectTest" value="" options={options} disabled onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Ref', () => {
    it('forwards ref to combobox button', () => {
      const ref = createRef<HTMLButtonElement>()
      render(
        <Select ref={ref} name="selectTest" value="" options={options} onChange={() => {}} />,
      )
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <Select name="selectTest" value="" options={options} onChange={() => {}} title="title" />,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
