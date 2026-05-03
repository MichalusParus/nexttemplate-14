import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import {
  getOptions,
  optionsWithContent,
  textContent,
} from '../../../../../../../.storybook/helpers'
import { CheckboxGroup } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('checkboxGroupTest', 5)

describe('CheckboxGroup', () => {
  describe('Semantics', () => {
    it('renders fieldset with className and id', () => {
      render(
        <CheckboxGroup
          className="className"
          name="checkboxGroupTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )
      const fieldset = screen.getByRole('group')

      expect(fieldset).toBeInTheDocument()
      expect(fieldset).toHaveClass('className')
      expect(fieldset).toHaveClass('flex')
      expect(fieldset).toHaveAttribute('id', 'checkboxGroupTest')
    })

    it('renders correct number of checkboxes', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      expect(checkboxes).toHaveLength(options.length)
    })

    it('checkbox has correct id, name, type and value', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[options[0].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      expect(checkboxes[0]).toHaveAttribute('id', 'checkboxGroupTest-0')
      expect(checkboxes[0]).toHaveAttribute('name', 'checkboxGroupTest-0')
      expect(checkboxes[0]).toHaveAttribute('type', 'checkbox')
      expect(checkboxes[0]).toHaveAttribute('value', '0')
      expect(checkboxes[0]).toHaveAttribute('checked')
    })

    it('unchecked checkbox has no checked attribute', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[options[0].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      expect(checkboxes[3]).not.toHaveAttribute('checked')
    })

    it('label links to checkbox via htmlFor and has id', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )
      const labels = screen.getAllByTestId('Label')

      expect(labels[0]).toHaveTextContent(options[0].label)
      expect(labels[0]).toHaveAttribute('for', 'checkboxGroupTest-0')
      expect(labels[0]).toHaveAttribute('id', 'checkboxGroupTest-0-label')
      expect(labels[3]).toHaveTextContent(options[3].label)
      expect(labels[3]).toHaveAttribute('for', 'checkboxGroupTest-3')
      expect(labels[3]).toHaveAttribute('id', 'checkboxGroupTest-3-label')
    })

    it('renders content instead of label when provided', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={optionsWithContent}
          onChange={() => {}}
        />,
      )
      const contentTexts = screen.queryAllByText(textContent.slice(0, 21))
      const labels = screen.getAllByTestId('Label')

      expect(contentTexts).toHaveLength(optionsWithContent.length)
      expect(labels[0]).toHaveTextContent(`very long label1${textContent.slice(0, 21)}`)
      expect(labels[3]).toHaveTextContent(`very long label4${textContent.slice(0, 21)}`)
    })

    it('value selects the correct checkbox', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[options[2].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      expect(checkboxes[2]).toHaveAttribute('value', '2')
      expect(checkboxes[2]).toHaveAttribute('checked', '')
    })

    it('error applies error class to checkbox input wraps', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          error="error"
          onChange={() => {}}
        />,
      )
      const inputWraps = screen.getAllByTestId('CheckboxInputWrap')

      expect(inputWraps[0]).toHaveAttribute('data-error')
    })

    it('column applies flex-col to fieldset', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          column
          onChange={() => {}}
        />,
      )
      const fieldset = screen.getByRole('group')

      expect(fieldset).toHaveClass('flex-col')
    })

    it('checkboxProps className forwards to checkbox wraps', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          checkboxProps={{ className: 'customClass' }}
          onChange={() => {}}
        />,
      )
      const checkboxWraps = screen.getAllByTestId('CheckboxWrap')

      expect(checkboxWraps[0]).toHaveClass('customClass')
    })

    it('switchType renders Switch components instead of Checkbox', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          switchType
          onChange={() => {}}
        />,
      )

      expect(screen.getAllByTestId('SwitchWrap')).toHaveLength(options.length)
      expect(screen.queryByTestId('CheckboxWrap')).toBeNull()
    })

    it('disabled + error applies both states', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          disabled
          error="error"
          onChange={() => {}}
        />,
      )
      const inputWraps = screen.getAllByTestId('CheckboxInputWrap')
      const checkboxes = screen.getAllByRole('checkbox')

      expect(inputWraps[0]).toHaveAttribute('data-error')
      expect(checkboxes[0]).toHaveAttribute('disabled')
    })

    it('disabled sets disabled on all checkboxes', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      checkboxes.forEach(checkbox => {
        expect(checkbox).toHaveAttribute('disabled')
      })
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses a checkbox', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      checkboxes[0].focus()
      expect(document.activeElement).toBe(checkboxes[0])
    })

    it('disabled prevents focus', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      checkboxes[0].focus()
      expect(document.activeElement).not.toBe(checkboxes[0])
    })
  })

  describe('Interaction', () => {
    it('click adds unchecked option to value array', () => {
      const onChange = jest.fn()
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[]}
          options={options}
          onChange={onChange}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      fireEvent.click(checkboxes[1])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([options[1].value])
    })

    it('click removes checked option from value array', () => {
      const onChange = jest.fn()
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[options[0].value, options[1].value]}
          options={options}
          onChange={onChange}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      fireEvent.click(checkboxes[0])
      expect(onChange).toHaveBeenCalledWith([options[1].value])
    })

    it('multiple selections maintained in value array', () => {
      render(
        <CheckboxGroup
          name="checkboxGroupTest"
          value={[options[0].value, options[2].value]}
          options={options}
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      expect(checkboxes[0]).toHaveAttribute('checked')
      expect(checkboxes[2]).toHaveAttribute('checked')
      expect(checkboxes[1]).not.toHaveAttribute('checked')
    })
  })

  describe('Generic values', () => {
    const objOptions = options.map(o => ({ ...o, value: { key1: o.label, key2: o.value } }))

    it('object value marks correct checkbox as checked', () => {
      render(
        <CheckboxGroup<{ key1: string; key2: string }>
          name="checkboxGroupTest"
          value={[objOptions[1].value]}
          options={objOptions}
          onChange={() => {}}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      expect(checkboxes[1]).toHaveAttribute('checked')
      expect(checkboxes[0]).not.toHaveAttribute('checked')
    })

    it('click adds object value to array', () => {
      const onChange = jest.fn()
      render(
        <CheckboxGroup<{ key1: string; key2: string }>
          name="checkboxGroupTest"
          value={[]}
          options={objOptions}
          onChange={onChange}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      fireEvent.click(checkboxes[1])
      expect(onChange).toHaveBeenCalledWith([objOptions[1].value])
    })

    it('click removes object value from array', () => {
      const onChange = jest.fn()
      render(
        <CheckboxGroup<{ key1: string; key2: string }>
          name="checkboxGroupTest"
          value={[objOptions[0].value, objOptions[1].value]}
          options={objOptions}
          onChange={onChange}
        />,
      )
      const checkboxes = screen.getAllByRole('checkbox')

      fireEvent.click(checkboxes[0])
      expect(onChange).toHaveBeenCalledWith([objOptions[1].value])
    })
  })

  describe('Ref', () => {
    it('ref returns HTMLFieldSetElement', () => {
      const ref = createRef<HTMLFieldSetElement>()
      render(
        <CheckboxGroup
          ref={ref}
          name="checkboxGroupTest"
          value={[]}
          options={options}
          onChange={() => {}}
        />,
      )

      expect(ref.current).toBeInstanceOf(HTMLFieldSetElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <CheckboxGroup name="checkboxGroupTest" value={[]} options={options} onChange={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
