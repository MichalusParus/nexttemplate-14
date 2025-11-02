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
  it('default', () => {
    render(
      <RadioGroup
        className="className"
        name="radioGroupTest"
        value={options[0].value}
        options={options}
        onChange={() => {}}
      />,
    )
    const fieldsetRole = screen.getByRole('group')
    const radioRoles = screen.getAllByRole('radio')
    const labelTestIds = screen.getAllByTestId('Label')

    expect(fieldsetRole).toBeInTheDocument()
    expect(fieldsetRole).toHaveClass('className')
    expect(fieldsetRole).toHaveClass('flex')
    expect(fieldsetRole).toHaveAttribute('id', 'radioGroupTest')

    expect(radioRoles).toHaveLength(options.length)
    expect(radioRoles[0]).toHaveAttribute('id', options[0].value)
    expect(radioRoles[0]).toHaveAttribute('name', 'radioGroupTest')
    expect(radioRoles[0]).toHaveAttribute('type', 'radio')
    expect(radioRoles[0]).toHaveAttribute('value', options[0].value)
    expect(radioRoles[0]).toHaveAttribute('checked')
    expect(labelTestIds[0]).toBeInTheDocument()
    expect(labelTestIds[0]).toHaveAttribute('id', `${options[0].value}-label`)
    expect(labelTestIds[0]).toHaveTextContent(options[0].label)
    expect(labelTestIds[0]).toHaveAttribute('for', options[0].value)
    expect(radioRoles[3]).toHaveAttribute('id', options[3].value)
    expect(radioRoles[3]).toHaveAttribute('name', 'radioGroupTest')
    expect(radioRoles[3]).toHaveAttribute('type', 'radio')
    expect(radioRoles[3]).toHaveAttribute('value', options[3].value)
    expect(labelTestIds[3]).toHaveTextContent(options[3].label)
    expect(radioRoles[3]).not.toHaveAttribute('checked')
    expect(labelTestIds[3]).toBeInTheDocument()
    expect(labelTestIds[3]).toHaveAttribute('id', `${options[3].value}-label`)
    expect(labelTestIds[3]).toHaveTextContent(options[3].label)
    expect(labelTestIds[3]).toHaveAttribute('for', options[3].value)
    radioRoles[0].focus()
    expect(document.activeElement).toBe(radioRoles[0])
  })

  it('content', () => {
    render(
      <RadioGroup
        name="radioGroupTest"
        value={optionsWithContent[0].value}
        options={optionsWithContent}
        onChange={() => {}}
      />,
    )
    const contentTexts = screen.queryAllByText(textContent.slice(0, 21))
    const labelTestIds = screen.getAllByTestId('Label')

    expect(contentTexts).toHaveLength(20)
    expect(labelTestIds[0]).toHaveTextContent(`very long label1${textContent.slice(0, 21)}`)
    expect(labelTestIds[3]).toHaveTextContent(`very long label4${textContent.slice(0, 21)}`)
  })

  it('value', () => {
    render(
      <RadioGroup
        name="radioGroupTest"
        value={options[2].value}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    const radioRoles = screen.getAllByRole('radio')

    expect(radioRoles[2]).toHaveAttribute('value', options[2].value)
    expect(radioRoles[2]).toHaveAttribute('checked', '')
  })

  it('error', () => {
    render(
      <RadioGroup
        name="radioGroupTest"
        value={options[0].value}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    const radioRoles = screen.getAllByRole('radio')

    expect(radioRoles[0]).toHaveClass('error')
  })

  it('column', () => {
    render(<RadioGroup name="radioGroupTest" options={options} column onChange={() => {}} />)
    const fieldsetRole = screen.getByRole('group')

    expect(fieldsetRole).toHaveClass('flex-col')
  })

  it('radioProps', () => {
    render(
      <RadioGroup
        name="radioGroupTest"
        options={options}
        radioProps={{ className: 'className' }}
        onChange={() => {}}
      />,
    )
    const radioRoles = screen.getAllByRole('radio')

    expect(radioRoles[0]).toHaveClass('className')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <RadioGroup
        name="radioGroupTest"
        value={options[0].value}
        options={options}
        error="error"
        onChange={spy}
      />,
    )
    const radioRoles = screen.getAllByRole('radio')

    fireEvent.click(radioRoles[1])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(options[1].value)
  })

  it('disabled', () => {
    render(
      <RadioGroup
        name="radioGroupTest"
        value={options[0].value}
        options={options}
        error="error"
        onChange={() => {}}
        disabled
      />,
    )
    const radioRoles = screen.getAllByRole('radio')

    expect(radioRoles[0]).toHaveAttribute('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLFieldSetElement>()
    render(<RadioGroup ref={ref} name="radioGroupTest" options={options} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <RadioGroup name="radioGroupTest" options={options} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
