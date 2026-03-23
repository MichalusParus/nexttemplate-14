import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import {
  getOptions,
  optionsWithContent,
  textContent,
} from '../../../../../../../.storybook/helpers'
import { MultiToggleGroup } from './MultiToggleGroup'

expect.extend(toHaveNoViolations)

const options = getOptions('toggleGroupTest', 5)

describe('MultiToggleGroup', () => {
  describe('Semantics', () => {
    it('renders group wrapper with className and id', () => {
      render(
        <MultiToggleGroup
          className="className"
          name="toggleGroupTest"
          value={[]}
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
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(options.length)
    })

    it('selected buttons have selected class', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[options[0].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveClass('selected')
      expect(buttons[0]).toHaveTextContent(options[0].label)
      expect(buttons[3]).not.toHaveClass('selected')
      expect(buttons[3]).toHaveTextContent(options[3].label)
    })

    it('multiple buttons can be selected simultaneously', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[options[0].value, options[2].value, options[4].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveClass('selected')
      expect(buttons[1]).not.toHaveClass('selected')
      expect(buttons[2]).toHaveClass('selected')
      expect(buttons[3]).not.toHaveClass('selected')
      expect(buttons[4]).toHaveClass('selected')
    })

    it('renders content instead of label when provided', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[optionsWithContent[0].value]}
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

    it('error applies error class to group wrapper', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[]}
          options={options}
          error="error"
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')

      expect(group).toHaveClass('error')
    })

    it('column applies flex-col to group wrapper', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[]}
          options={options}
          column
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')

      expect(group).toHaveClass('flex-col')
    })

    it('buttonProps className forwards to buttons', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[]}
          options={options}
          buttonProps={{ className: 'customClass' }}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveClass('customClass')
    })

    it('disabled + error applies both states', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[]}
          options={options}
          disabled
          error="error"
          onChange={() => {}}
        />,
      )
      const group = screen.getByRole('group')
      const buttons = screen.getAllByRole('button')

      expect(group).toHaveClass('error')
      expect(group).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[0]).toHaveAttribute('aria-disabled', 'true')
    })

    it('disabled sets aria-disabled on buttons', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[]}
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses a button', () => {
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[options[0].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      buttons[0].focus()
      expect(document.activeElement).toBe(buttons[0])
    })
  })

  describe('Interaction', () => {
    it('click unselected toggle adds to value array', () => {
      const onChange = jest.fn()
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[options[0].value, options[1].value]}
          options={options}
          onChange={onChange}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[2])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([options[0].value, options[1].value, options[2].value])
    })

    it('click selected toggle removes from value array', () => {
      const onChange = jest.fn()
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[options[0].value, options[1].value]}
          options={options}
          onChange={onChange}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([options[0].value])
    })

    it('click last selected toggle with onClear calls onClear', () => {
      const onChange = jest.fn()
      const onClear = jest.fn()
      render(
        <MultiToggleGroup
          name="toggleGroupTest"
          value={[options[0].value]}
          options={options}
          onChange={onChange}
          onClear={onClear}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onClear).toHaveBeenCalledTimes(1)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Generic values', () => {
    const objOptions = options.map(o => ({ ...o, value: { key1: o.label, key2: o.value } }))

    it('object values select correct toggles', () => {
      render(
        <MultiToggleGroup<{ key1: string; key2: string }>
          name="toggleGroupTest"
          value={[objOptions[0].value, objOptions[2].value]}
          options={objOptions}
          onChange={() => {}}
        />,
      )
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
      expect(buttons[2]).toHaveAttribute('aria-pressed', 'true')
      expect(buttons[1]).toHaveAttribute('aria-pressed', 'false')
    })

    it('click adds object value to array', () => {
      const onChange = jest.fn()
      render(
        <MultiToggleGroup<{ key1: string; key2: string }>
          name="toggleGroupTest"
          value={[objOptions[0].value]}
          options={objOptions}
          onChange={onChange}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledWith([objOptions[0].value, objOptions[1].value])
    })

    it('click removes object value from array', () => {
      const onChange = jest.fn()
      render(
        <MultiToggleGroup<{ key1: string; key2: string }>
          name="toggleGroupTest"
          value={[objOptions[0].value, objOptions[1].value]}
          options={objOptions}
          onChange={onChange}
        />,
      )
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith([objOptions[1].value])
    })
  })

  describe('Ref', () => {
    it('ref returns HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <MultiToggleGroup
          ref={ref}
          name="toggleGroupTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <MultiToggleGroup name="toggleGroupTest" value={[]} options={options} onChange={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
