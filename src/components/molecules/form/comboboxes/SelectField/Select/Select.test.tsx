import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { getOptions } from '../../../../../../../.storybook/helpers'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { Select } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('selectTest', 5)

describe('Select', () => {
  it('default', () => {
    render(
      <Select
        className="className"
        name="selectTest"
        placeholder="placeholder"
        value={''}
        options={options}
        onChange={() => {}}
      />,
    )
    const selectTestId = screen.getByTestId('Select')
    const comboboxRole = screen.getByRole('combobox')

    expect(selectTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveTextContent('placeholder')
    expect(comboboxRole).toHaveAttribute('id', 'selectTest')
    expect(comboboxRole).toHaveAttribute('name', 'selectTest')
    expect(comboboxRole).toHaveAttribute('type', 'button')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'listbox')

    fireEvent.click(comboboxRole)
    const dropdownTestId = screen.getByTestId('Dropdown')
    const listboxTestId = screen.getByTestId('ListBox')
    const optionRoles = screen.getAllByRole('option')

    expect(comboboxRole).toHaveAttribute('aria-controls', listboxTestId.getAttribute('id'))
    expect(comboboxRole).toHaveAttribute('aria-owns', listboxTestId.getAttribute('id'))
    expect(dropdownTestId).toBeInTheDocument()
    expect(listboxTestId).toBeInTheDocument()
    expect(listboxTestId).toHaveAttribute('id', comboboxRole.getAttribute('aria-controls'))
    expect(listboxTestId).toHaveAttribute('aria-hidden')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'true')
    expect(listboxTestId).toHaveAttribute('aria-hidden', 'false')
    expect(optionRoles).toHaveLength(options.length)
    comboboxRole.focus()
    expect(document.activeElement).toBe(comboboxRole)
  })

  it('value', () => {
    render(
      <Select name="selectTest" value={options[0].value} options={options} onChange={() => {}} />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)
    fireEvent.click(comboboxRole)
    const optionRoles = screen.getAllByRole('option')
    expect(optionRoles[0]).toHaveClass('selected')
    expect(optionRoles[1]).not.toHaveClass('selected')
  })

  it('displayChips', () => {
    render(
      <Select
        name="selectTest"
        value={options[0].value}
        options={options}
        displayChips
        onChange={() => {}}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(chipTestIds).toHaveLength(1)
    expect(chipTestIds[0]).toHaveTextContent(options[0].label)
  })

  it('error', () => {
    render(
      <Select name="selectTest" value="" options={options} error="error" onChange={() => {}} />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/listboxProps/chipProps', () => {
    render(
      <Select
        name="selectTest"
        value={options[0].value}
        options={options}
        displayChips
        onChange={() => {}}
        dropdownProps={{ className: 'dropdownClass' }}
        listboxProps={{ className: 'listboxClass' }}
        chipProps={{ className: 'chipClass' }}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    fireEvent.click(comboboxRole)
    const dropdownTestId = screen.getByTestId('Dropdown')
    const listboxTestId = screen.getByTestId('ListBox')
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(listboxTestId).toHaveClass('listboxClass')
    expect(chipTestIds[0]).toHaveClass('chipClass')
  })

  it('onOpen/onClose', () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    render(
      <Select
        name="selectTest"
        value=""
        options={options}
        onChange={() => {}}
        onOpen={spyOpen}
        onClose={spyClose}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)

    expect(spyOpen).toHaveBeenCalledTimes(1)
    expect(spyClose).toHaveBeenCalledTimes(0)

    spyOpen.mockClear()

    fireEvent.click(comboboxRole)
    expect(spyClose).toHaveBeenCalledTimes(1)
    expect(spyOpen).toHaveBeenCalledTimes(0)
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<Select name="selectTest" value={options[0].value} options={options} onChange={spy} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)
    fireEvent.click(comboboxRole)
    const optionRoles = screen.getAllByRole('option')
    fireEvent.click(optionRoles[4])
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(options[4].value)
  })

  it('children', () => {
    render(
      <Select name="selectTest" value="" options={options} onChange={() => {}}>
        <div data-testid="test">test</div>
      </Select>,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    const testId = screen.getByTestId('test')

    expect(testId).toBeInTheDocument()
  })

  it('disabled', () => {
    render(<Select name="selectTest" value="" options={options} disabled onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Select ref={ref} name="selectTest" value="" options={options} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <Select name="selectTest" value="" options={options} onChange={() => {}} title="title" />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
