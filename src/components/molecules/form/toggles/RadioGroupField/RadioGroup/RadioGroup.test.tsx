import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import {
  getOptions,
  optionsWithContent,
  textContent,
} from '../../../../../../../.storybook/helpers'
import { RadioGroup } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('radioGroupTest', 5)

describe('RadioGroup', () => {
  describe('Semantics', () => {
    it('renders fieldset with className and id', () => {
      render(
        <RadioGroup
          className="className"
          name="radioGroupTest"
          options={options}
          onChange={() => {}}
        />,
      )
      const fieldset = screen.getByRole('group')

      expect(fieldset).toBeInTheDocument()
      expect(fieldset).toHaveClass('className')
      expect(fieldset).toHaveClass('flex')
      expect(fieldset).toHaveAttribute('id', 'radioGroupTest')
    })

    it('renders correct number of radio inputs', () => {
      render(
        <RadioGroup name="radioGroupTest" options={options} onChange={() => {}} />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios).toHaveLength(options.length)
    })

    it('radio has correct id, name, type and value', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios[0]).toHaveAttribute('id', 'radioGroupTest-0')
      expect(radios[0]).toHaveAttribute('name', 'radioGroupTest')
      expect(radios[0]).toHaveAttribute('type', 'radio')
      expect(radios[0]).toHaveAttribute('value', '0')
      expect(radios[0]).toHaveAttribute('checked')
    })

    it('unchecked radio has no checked attribute', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios[3]).not.toHaveAttribute('checked')
    })

    it('label links to radio via htmlFor and has id', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const labels = screen.getAllByTestId('Label')

      expect(labels[0]).toHaveTextContent(options[0].label)
      expect(labels[0]).toHaveAttribute('for', 'radioGroupTest-0')
      expect(labels[0]).toHaveAttribute('id', 'radioGroupTest-0-label')
      expect(labels[3]).toHaveTextContent(options[3].label)
      expect(labels[3]).toHaveAttribute('for', 'radioGroupTest-3')
      expect(labels[3]).toHaveAttribute('id', 'radioGroupTest-3-label')
    })

    it('renders content instead of label when provided', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          value={optionsWithContent[0].value}
          options={optionsWithContent}
          onChange={() => {}}
        />,
      )
      const contentTexts = screen.queryAllByText(textContent.slice(0, 21))
      const labels = screen.getAllByTestId('Label')

      expect(contentTexts).toHaveLength(20)
      expect(labels[0]).toHaveTextContent(`very long label1${textContent.slice(0, 21)}`)
      expect(labels[3]).toHaveTextContent(`very long label4${textContent.slice(0, 21)}`)
    })

    it('value selects the correct radio', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          value={options[2].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios[2]).toHaveAttribute('value', '2')
      expect(radios[2]).toHaveAttribute('checked', '')
    })

    it('error applies error class to radios', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          options={options}
          error="error"
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios[0]).toHaveClass('error')
    })

    it('column applies flex-col to fieldset', () => {
      render(
        <RadioGroup name="radioGroupTest" options={options} column onChange={() => {}} />,
      )
      const fieldset = screen.getByRole('group')

      expect(fieldset).toHaveClass('flex-col')
    })

    it('radioProps className forwards to radio inputs', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          options={options}
          radioProps={{ className: 'customClass' }}
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios[0]).toHaveClass('customClass')
    })

    it('disabled + error applies both states', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          options={options}
          disabled
          error="error"
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios[0]).toHaveClass('error')
      expect(radios[0]).toHaveAttribute('disabled')
    })

    it('disabled sets disabled on all radios and cursor-not-allowed on wrappers', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')
      const wraps = screen.getAllByTestId('Radio')

      radios.forEach(radio => {
        expect(radio).toHaveAttribute('disabled')
      })
      wraps.forEach(wrap => {
        expect(wrap).toHaveClass('cursor-not-allowed')
      })
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses a radio input', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          value={options[0].value}
          options={options}
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      radios[0].focus()
      expect(document.activeElement).toBe(radios[0])
    })

    it('disabled prevents focus', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      radios[0].focus()
      expect(document.activeElement).not.toBe(radios[0])
    })
  })

  describe('Interaction', () => {
    it('click triggers onChange with option value', () => {
      const onChange = jest.fn()
      render(
        <RadioGroup
          name="radioGroupTest"
          value={options[0].value}
          options={options}
          onChange={onChange}
        />,
      )
      const radios = screen.getAllByRole('radio')

      fireEvent.click(radios[1])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(options[1].value)
    })

    it('disabled radios have disabled attribute', () => {
      render(
        <RadioGroup
          name="radioGroupTest"
          options={options}
          disabled
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      radios.forEach(radio => {
        expect(radio).toBeDisabled()
      })
    })
  })

  describe('Generic values', () => {
    const objOptions = options.map(o => ({ ...o, value: { key1: o.label, key2: o.value } }))

    it('object value selects correct radio', () => {
      render(
        <RadioGroup<{ key1: string; key2: string }>
          name="radioGroupTest"
          value={objOptions[1].value}
          options={objOptions}
          onChange={() => {}}
        />,
      )
      const radios = screen.getAllByRole('radio')

      expect(radios[1]).toBeChecked()
      expect(radios[0]).not.toBeChecked()
    })

    it('onChange with object values', () => {
      const onChange = jest.fn()
      render(
        <RadioGroup<{ key1: string; key2: string }>
          name="radioGroupTest"
          value={objOptions[0].value}
          options={objOptions}
          onChange={onChange}
        />,
      )
      const radios = screen.getAllByRole('radio')

      fireEvent.click(radios[2])
      expect(onChange).toHaveBeenCalledWith(objOptions[2].value)
    })
  })

  describe('Ref', () => {
    it('ref returns HTMLFieldSetElement', () => {
      const ref = createRef<HTMLFieldSetElement>()
      render(
        <RadioGroup ref={ref} name="radioGroupTest" options={options} onChange={() => {}} />,
      )

      expect(ref.current).toBeInstanceOf(HTMLFieldSetElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <RadioGroup name="radioGroupTest" options={options} onChange={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
