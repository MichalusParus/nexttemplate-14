import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { act, fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import {
  getOptions,
  optionsWithContent,
  textContent,
} from '../../../../../../../.storybook/helpers'
import { ToggleGroup } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('toggleGroupTest', 5)

describe('ToggleGroup', () => {
  describe('Semantics', () => {
    it('renders group wrapper with className and id', () => {
      render(
        <ToggleGroup
          className="className"
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')

      expect(group).toBeInTheDocument()
      expect(group).toHaveClass('className')
      expect(group).toHaveClass('flex')
      expect(group).toHaveAttribute('id', 'toggleGroupTest')
    })

    it('renders correct number of buttons', () => {
      render(
        <ToggleGroup name="toggleGroupTest" options={options} onChange={() => {}} />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(options.length)
    })

    it('selected button has selected class and aria-pressed', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('data-selected')
      expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
      expect(buttons[0]).toHaveTextContent(options[0].label)
    })

    it('unselected button has no selected class', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[3]).not.toHaveAttribute('data-selected')
      expect(buttons[3]).toHaveAttribute('aria-pressed', 'false')
      expect(buttons[3]).toHaveTextContent(options[3].label)
    })

    it('renders content instead of label when provided', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={optionsWithContent[0].value}
          options={optionsWithContent}
          onChange={() => {}}
        />,
      )
      const contentTexts = screen.queryAllByText(textContent.slice(0, 21))
      const buttons = screen.getAllByRole('button')

      expect(contentTexts).toHaveLength(20)
      expect(buttons[0]).toHaveTextContent(`very long label1${textContent.slice(0, 21)}`)
      expect(buttons[3]).toHaveTextContent(`very long label4${textContent.slice(0, 21)}`)
    })

    it('value selects the correct button', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[2].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[2]).toHaveAttribute('data-selected')
    })

    it('error applies error class to group wrapper', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          options={options}
          error="error"
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')

      expect(group).toHaveAttribute('data-error')
    })

    it('column applies flex-col to group wrapper', () => {
      render(
        <ToggleGroup name="toggleGroupTest" options={options} column onChange={() => {}} />,
      )
      const group = screen.getByRole('group')

      expect(group).toHaveClass('flex-col')
    })

    it('buttonProps className forwards to buttons', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          options={options}
          buttonProps={{ className: 'customClass' }}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveClass('customClass')
    })

    it('disabled sets aria-disabled on group and all buttons', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')
      const buttons = screen.getAllByRole('button')

      expect(group).toHaveAttribute('aria-disabled', 'true')
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-disabled', 'true')
      })
    })

    it('disabled + error applies both states', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          options={options}
          disabled
          error="error"
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')
      const buttons = screen.getAllByRole('button')

      expect(group).toHaveAttribute('data-error')
      expect(group).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[0]).toHaveAttribute('aria-disabled', 'true')
    })

    it('multiValue marks multiple buttons as aria-pressed', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          multiValue={[options[0].value, options[2].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
      expect(buttons[1]).toHaveAttribute('aria-pressed', 'false')
      expect(buttons[2]).toHaveAttribute('aria-pressed', 'true')
    })

    it('selected button has tabIndex 0, others have -1', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[1].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[1]).toHaveAttribute('tabindex', '0')
      expect(buttons[0]).toHaveAttribute('tabindex', '-1')
      expect(buttons[2]).toHaveAttribute('tabindex', '-1')
    })

    it('no selection makes first non-disabled button tabIndex 0', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('tabindex', '0')
      expect(buttons[1]).toHaveAttribute('tabindex', '-1')
    })

    it('per-option isDisabled disables individual buttons', () => {
      const optionsWithDisabled = options.map((opt, i) => ({
        ...opt,
        isDisabled: i === 2,
      }))
      render(
        <ToggleGroup
          name="toggleGroupTest"
          options={optionsWithDisabled}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[2]).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[0]).not.toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the active button', () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      buttons[0].focus()
      expect(document.activeElement).toBe(buttons[0])
    })

    it('ArrowDown moves focus to next button', async () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')
      const buttons = screen.getAllByRole('button')

      await act(async () => {})
      await act(async () => {})

      // First ArrowDown on group — focuses next button from current index
      await act(async () => {
        fireEvent.keyDown(group, { key: 'ArrowDown', code: 'ArrowDown' })
      })
      expect(document.activeElement).toBe(buttons[1])

      await act(async () => {
        fireEvent.keyDown(buttons[1], { key: 'ArrowDown', code: 'ArrowDown' })
      })
      expect(document.activeElement).toBe(buttons[2])
    })

    it('ArrowUp moves focus to previous button', async () => {
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')
      const buttons = screen.getAllByRole('button')

      await act(async () => {})
      await act(async () => {})

      // Navigate down first to get to buttons[1]
      await act(async () => {
        fireEvent.keyDown(group, { key: 'ArrowDown', code: 'ArrowDown' })
      })
      expect(document.activeElement).toBe(buttons[1])

      // ArrowUp goes back
      await act(async () => {
        fireEvent.keyDown(buttons[1], { key: 'ArrowUp', code: 'ArrowUp' })
      })
      expect(document.activeElement).toBe(buttons[0])
    })
  })

  describe('Interaction', () => {
    it('click unselected toggle calls onChange with value', () => {
      const onChange = jest.fn()
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={onChange}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(options[1].value)
    })

    it('click selected toggle with allowEmpty calls onChange with empty string', () => {
      const onChange = jest.fn()
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={onChange}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(undefined)
    })

    it('click selected toggle with onClear calls onClear instead of onChange', () => {
      const onChange = jest.fn()
      const onClear = jest.fn()
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={onChange}
          onClear={onClear}
          allowEmpty
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onClear).toHaveBeenCalledTimes(1)
      expect(onChange).not.toHaveBeenCalled()
    })

    it('click selected toggle with allowEmpty=false does nothing', () => {
      const onChange = jest.fn()
      render(
        <ToggleGroup
          name="toggleGroupTest"
          value={options[0].value}
          options={options}
          onChange={onChange}
          allowEmpty={false}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Generic values', () => {
    const objOptions = options.map(o => ({ ...o, value: { key1: o.label, key2: o.value } }))

    it('object value selects correct toggle', () => {
      render(
        <ToggleGroup<{ key1: string; key2: string }>
          name="toggleGroupTest"
          value={objOptions[1].value}
          options={objOptions}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[1]).toHaveAttribute('aria-pressed', 'true')
      expect(buttons[0]).toHaveAttribute('aria-pressed', 'false')
    })

    it('onChange with object values', () => {
      const onChange = jest.fn()
      render(
        <ToggleGroup<{ key1: string; key2: string }>
          name="toggleGroupTest"
          value={objOptions[0].value}
          options={objOptions}
          onChange={onChange}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[2])
      expect(onChange).toHaveBeenCalledWith(objOptions[2].value)
    })
  })

  describe('Ref', () => {
    it('ref returns HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <ToggleGroup ref={ref} name="toggleGroupTest" options={options} onChange={() => {}} />,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <ToggleGroup name="toggleGroupTest" options={options} onChange={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
