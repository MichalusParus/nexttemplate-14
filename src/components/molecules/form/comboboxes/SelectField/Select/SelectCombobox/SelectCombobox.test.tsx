import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../../.storybook/helpers'
import { SelectCombobox } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('selectComboboxTest', 5)

describe('SelectCombobox', () => {
  it('default', () => {
    render(
      <SelectCombobox
        className="className"
        isOpen={false}
        selectedOptions={[]}
        name="selectComboboxTest"
        placeholder="placeholder"
        handleToggle={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveTextContent('placeholder')
    expect(comboboxRole).toHaveAttribute('id', 'selectComboboxTest')
    expect(comboboxRole).toHaveAttribute('name', 'selectComboboxTest')
    expect(comboboxRole).toHaveAttribute('type', 'button')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'listbox')
    expect(comboboxRole).toHaveAttribute('aria-controls', 'selectComboboxTest-listbox')
    expect(comboboxRole).toHaveAttribute('aria-owns', 'selectComboboxTest-listbox')
    comboboxRole.focus()
    expect(document.activeElement).toBe(comboboxRole)
  })

  it('open', () => {
    render(
      <SelectCombobox
        isOpen={true}
        selectedOptions={[]}
        name="selectComboboxTest"
        handleToggle={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('aria-expanded', 'true')
    expect(comboboxRole).toHaveClass('selected')
  })

  it('value', () => {
    render(
      <SelectCombobox
        isOpen={false}
        selectedOptions={[options[0]]}
        name="selectComboboxTest"
        handleToggle={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)
  })

  it('displayChips', () => {
    const spy = jest.fn()
    render(
      <SelectCombobox
        name="selectComboboxTest"
        isOpen={false}
        selectedOptions={[options[0], options[1]]}
        displayChips
        handleToggle={() => {}}
        handleOnChange={spy}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')
    const clearTestIds = screen.getAllByTestId('ClearButton')

    expect(chipTestIds).toHaveLength(2)
    expect(chipTestIds[0]).toHaveTextContent(options[0].label)
    expect(chipTestIds[1]).toHaveTextContent(options[1].label)
    expect(clearTestIds).toHaveLength(2)

    fireEvent.click(clearTestIds[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(options[0].value)
  })

  it('error', () => {
    render(
      <SelectCombobox
        isOpen={false}
        selectedOptions={[]}
        name="selectComboboxTest"
        error="error"
        handleToggle={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('chipProps', () => {
    render(
      <SelectCombobox
        isOpen={false}
        selectedOptions={[options[0], options[1]]}
        name="selectComboboxTest"
        displayChips
        handleToggle={() => {}}
        handleOnChange={() => {}}
        chipProps={{ className: 'chipClass' }}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(chipTestIds[0]).toHaveClass('chipClass')
  })

  it('onClear', () => {
    const spy = jest.fn()
    render(
      <SelectCombobox
        isOpen={false}
        selectedOptions={options}
        name="selectComboboxTest"
        displayChips
        onClear={spy}
        handleToggle={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const clearTestId = screen.getByTestId('ClearAllButton')

    expect(clearTestId).toBeInTheDocument()
    fireEvent.click(clearTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('handleToggle', () => {
    const spy = jest.fn()
    render(
      <SelectCombobox
        isOpen={false}
        selectedOptions={[]}
        name="selectComboboxTest"
        handleToggle={spy}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <SelectCombobox
        isOpen={false}
        selectedOptions={[]}
        name="selectComboboxTest"
        disabled
        handleToggle={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('aria-disabled', 'true')
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <SelectCombobox
        ref={ref}
        isOpen={false}
        selectedOptions={[]}
        name="selectComboboxTest"
        handleToggle={() => {}}
        handleOnChange={() => {}}
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
      <SelectCombobox
        isOpen={false}
        name="selectComboboxTest"
        selectedOptions={[]}
        placeholder="placeholder"
        handleToggle={() => {}}
        handleOnChange={() => {}}
        title="title"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
