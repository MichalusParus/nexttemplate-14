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
  it('default', () => {
    render(
      <CheckboxGroup
        className="className"
        name="checkboxGroupTest"
        value={[options[0].value]}
        options={options}
        onChange={() => {}}
      />,
    )
    const fieldsetRole = screen.getByRole('group')
    const checkboxRoles = screen.getAllByRole('checkbox')
    const labelTestIds = screen.getAllByTestId('Label')

    expect(fieldsetRole).toBeInTheDocument()
    expect(fieldsetRole).toHaveClass('className')
    expect(fieldsetRole).toHaveClass('flex')
    expect(fieldsetRole).toHaveAttribute('id', 'checkboxGroupTest')

    expect(checkboxRoles).toHaveLength(options.length)
    expect(checkboxRoles[0]).toHaveAttribute('id', options[0].value)
    expect(checkboxRoles[0]).toHaveAttribute('name', options[0].value)
    expect(checkboxRoles[0]).toHaveAttribute('type', 'checkbox')
    expect(checkboxRoles[0]).toHaveAttribute('value', options[0].value)
    expect(checkboxRoles[0]).toHaveAttribute('checked')
    expect(labelTestIds[0]).toBeInTheDocument()
    expect(labelTestIds[0]).toHaveAttribute('id', `${options[0].value}-label`)
    expect(labelTestIds[0]).toHaveTextContent(options[0].label)
    expect(labelTestIds[0]).toHaveAttribute('for', options[0].value)
    expect(checkboxRoles[3]).toHaveAttribute('id', options[3].value)
    expect(checkboxRoles[3]).toHaveAttribute('name', options[3].value)
    expect(checkboxRoles[3]).toHaveAttribute('type', 'checkbox')
    expect(checkboxRoles[3]).toHaveAttribute('value', options[3].value)
    expect(labelTestIds[3]).toHaveTextContent(options[3].label)
    expect(checkboxRoles[3]).not.toHaveAttribute('checked')
    expect(labelTestIds[3]).toBeInTheDocument()
    expect(labelTestIds[3]).toHaveAttribute('id', `${options[3].value}-label`)
    expect(labelTestIds[3]).toHaveTextContent(options[3].label)
    expect(labelTestIds[3]).toHaveAttribute('for', options[3].value)
    checkboxRoles[0].focus()
    expect(document.activeElement).toBe(checkboxRoles[0])
  })

  it('content', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={optionsWithContent}
        onChange={() => {}}
      />,
    )
    const contentTexts = screen.queryAllByText(textContent.slice(0, 21))
    const labelTestIds = screen.getAllByTestId('Label')

    expect(contentTexts).toHaveLength(optionsWithContent.length)
    expect(labelTestIds[0]).toHaveTextContent(`very long label1${textContent.slice(0, 21)}`)
    expect(labelTestIds[3]).toHaveTextContent(`very long label4${textContent.slice(0, 21)}`)
  })

  it('switch', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[options[0].value]}
        options={options}
        variant="switch"
        onChange={() => {}}
      />,
    )
    const switchThumbTestIds = screen.getAllByTestId('SwitchThumb')
    const checkboxRoles = screen.getAllByRole('checkbox')
    const labelTestIds = screen.getAllByTestId('Label')

    expect(switchThumbTestIds).toHaveLength(options.length)
    expect(checkboxRoles[0]).toHaveAttribute('id', options[0].value)
    expect(checkboxRoles[0]).toHaveAttribute('name', options[0].value)
    expect(checkboxRoles[0]).toHaveAttribute('type', 'checkbox')
    expect(checkboxRoles[0]).toHaveAttribute('value', options[0].value)
    expect(checkboxRoles[0]).toHaveAttribute('checked')
    expect(labelTestIds[0]).toBeInTheDocument()
    expect(labelTestIds[0]).toHaveAttribute('id', `${options[0].value}-label`)
    expect(labelTestIds[0]).toHaveTextContent(options[0].label)
    expect(labelTestIds[0]).toHaveAttribute('for', options[0].value)
    expect(checkboxRoles[3]).toHaveAttribute('id', options[3].value)
    expect(checkboxRoles[3]).toHaveAttribute('name', options[3].value)
    expect(checkboxRoles[3]).toHaveAttribute('type', 'checkbox')
    expect(checkboxRoles[3]).toHaveAttribute('value', options[3].value)
    expect(labelTestIds[3]).toHaveTextContent(options[3].label)
    expect(checkboxRoles[3]).not.toHaveAttribute('checked')
    expect(labelTestIds[3]).toBeInTheDocument()
    expect(labelTestIds[3]).toHaveAttribute('id', `${options[3].value}-label`)
    expect(labelTestIds[3]).toHaveTextContent(options[3].label)
    expect(labelTestIds[3]).toHaveAttribute('for', options[3].value)
    checkboxRoles[0].focus()
    expect(document.activeElement).toBe(checkboxRoles[0])
  })

  it('value', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[options[2].value]}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    const checkboxRoles = screen.getAllByRole('checkbox')

    expect(checkboxRoles[2]).toHaveAttribute('value', options[2].value)
    expect(checkboxRoles[2]).toHaveAttribute('checked', '')
  })

  it('error', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    const inputWrapTestIds = screen.getAllByTestId('CheckboxInputWrap')

    expect(inputWrapTestIds[0]).toHaveClass('error')
  })

  it('column', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={options}
        column
        onChange={() => {}}
      />,
    )
    const fieldsetRole = screen.getByRole('group')

    expect(fieldsetRole).toHaveClass('flex-col')
  })

  it('checkboxProps', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={options}
        checkboxProps={{ className: 'className' }}
        onChange={() => {}}
      />,
    )
    const checkboxWrapTestIds = screen.getAllByTestId('CheckboxWrap')

    expect(checkboxWrapTestIds[0]).toHaveClass('className')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={options}
        error="error"
        onChange={spy}
      />,
    )
    const checkboxRoles = screen.getAllByRole('checkbox')

    fireEvent.click(checkboxRoles[1])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([options[1].value])
  })

  it('disabled', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={options}
        error="error"
        onChange={() => {}}
        disabled
      />,
    )
    const checkboxRoles = screen.getAllByRole('checkbox')

    expect(checkboxRoles[0]).toHaveAttribute('disabled')
    expect(checkboxRoles[0]).toHaveAttribute('tabindex', '-1')
  })

  it('ref', () => {
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

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <CheckboxGroup name="checkboxGroupTest" value={[]} options={options} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
