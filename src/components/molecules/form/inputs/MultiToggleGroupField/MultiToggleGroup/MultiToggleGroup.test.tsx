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
  it('default', () => {
    render(
      <MultiToggleGroup
        className="className"
        name="toggleGroupTest"
        value={[options[0].value]}
        options={options}
        onChange={() => {}}
      />,
    )
    const toggleGroupRole = screen.getByRole('group')
    const buttonRoles = screen.getAllByRole('button')

    expect(toggleGroupRole).toBeInTheDocument()
    expect(toggleGroupRole).toHaveClass('className')
    expect(toggleGroupRole).toHaveClass('flex')
    expect(toggleGroupRole).toHaveAttribute('id', 'toggleGroupTest')

    expect(buttonRoles).toHaveLength(options.length)
    expect(buttonRoles[0]).toBeInTheDocument()
    expect(buttonRoles[0]).toHaveClass('selected')
    expect(buttonRoles[0]).toHaveTextContent(options[0].label)
    expect(buttonRoles[3]).toBeInTheDocument()
    expect(buttonRoles[3]).not.toHaveClass('selected')
    expect(buttonRoles[3]).toHaveTextContent(options[3].label)
    buttonRoles[0].focus()
    expect(document.activeElement).toBe(buttonRoles[0])
  })

  it('content', () => {
    render(
      <MultiToggleGroup
        name="toggleGroupTest"
        value={[optionsWithContent[0].value]}
        options={optionsWithContent}
        onChange={() => {}}
      />,
    )
    const contentTexts = screen.queryAllByText(textContent.slice(0, 21))
    const buttonRoles = screen.getAllByRole('button')

    expect(contentTexts).toHaveLength(20)
    expect(buttonRoles[0]).toHaveTextContent(`very long label1${textContent.slice(0, 21)}`)
    expect(buttonRoles[3]).toHaveTextContent(`very long label4${textContent.slice(0, 21)}`)
  })

  it('value', () => {
    render(
      <MultiToggleGroup
        name="toggleGroupTest"
        value={[options[2].value]}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    const buttonRoles = screen.getAllByRole('button')

    expect(buttonRoles[2]).toHaveClass('selected')
  })

  it('error', () => {
    render(
      <MultiToggleGroup
        name="toggleGroupTest"
        value={['value1']}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    const toggleGroupRole = screen.getByRole('group')

    expect(toggleGroupRole).toHaveClass('error')
  })

  it('column', () => {
    render(
      <MultiToggleGroup
        name="toggleGroupTest"
        value={[]}
        options={options}
        column
        onChange={() => {}}
      />,
    )
    const toggleGroupRole = screen.getByRole('group')

    expect(toggleGroupRole).toHaveClass('flex-col')
  })

  it('buttonProps', () => {
    render(
      <MultiToggleGroup
        name="toggleGroupTest"
        value={[]}
        options={options}
        buttonProps={{ className: 'className' }}
        onChange={() => {}}
      />,
    )
    const buttonRoles = screen.getAllByRole('button')

    expect(buttonRoles[0]).toHaveClass('className')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <MultiToggleGroup
        name="toggleGroupTest"
        value={[options[0].value]}
        options={options}
        error="error"
        onChange={spy}
      />,
    )
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[1])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([options[0].value, options[1].value])
  })

  it('disabled', () => {
    render(
      <MultiToggleGroup
        name="toggleGroupTest"
        value={['value1']}
        options={options}
        error="error"
        onChange={() => {}}
        disabled
      />,
    )
    const buttonRoles = screen.getAllByRole('button')

    expect(buttonRoles[0]).toHaveAttribute('disabled')
  })

  it('ref', () => {
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

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <MultiToggleGroup name="toggleGroupTest" value={[]} options={options} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
