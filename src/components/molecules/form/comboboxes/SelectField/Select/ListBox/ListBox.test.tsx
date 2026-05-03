import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { getGroupedOptions, getOptions } from '../../../../../../../../.storybook/helpers'
import { ListBox } from '.'

expect.extend(toHaveNoViolations)

describe('ListBox', () => {
  const options = getOptions('listboxTest', 20)
  it('default', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        labelId="listboxTest-label"
        value={[]}
        options={options}
        onClick={() => {}}
      />,
    )
    const listboxRole = screen.getByRole('listbox')
    const optionRoles = screen.getAllByRole('option')
    const checkIconTestIds = screen.getAllByTestId('CheckIcon')

    expect(listboxRole).toBeInTheDocument()
    expect(listboxRole).toHaveClass('className')
    expect(listboxRole).toHaveAttribute('id', 'listboxTest')
    expect(listboxRole).toHaveAttribute('aria-labelledby', 'listboxTest-label')
    expect(optionRoles).toHaveLength(options.length)
    expect(optionRoles[0]).toHaveTextContent(options[0].label)
    expect(checkIconTestIds).toHaveLength(options.length)
  })

  it('groupedOptions', () => {
    const groupedOptions = getGroupedOptions('listboxTest')
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={groupedOptions}
        onClick={() => {}}
        isGrouped
      />,
    )
    const optionsQuery = screen.queryAllByRole('option')
    const groupLabelTestIds = screen.getAllByTestId('GroupLabel')

    expect(groupLabelTestIds).toHaveLength(groupedOptions.length)
    expect(optionsQuery).toHaveLength(groupedOptions.flatMap(group => group.groupedOptions).length)
  })

  it('noOptions', () => {
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={[]}
        noOptionLabel="noOptions"
        onClick={() => {}}
      />,
    )
    const optionsQuery = screen.queryAllByRole('option')
    const noOptionText = screen.getByText('noOptions')

    expect(optionsQuery).toHaveLength(0)
    expect(noOptionText).toBeInTheDocument()
  })

  it('value', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[options[0].value]}
        options={options}
        onClick={() => {}}
      />,
    )
    const optionRoles = screen.getAllByRole('option')
    const checkIconTestIds = screen.getAllByTestId('CheckIcon')

    expect(optionRoles[0]).toHaveAttribute('aria-selected', 'true')
    expect(optionRoles[0]).toHaveAttribute('data-selected')
    expect(optionRoles[1]).not.toHaveAttribute('data-selected')
    expect(checkIconTestIds[0]).toHaveClass('opacity-100')
    expect(checkIconTestIds[1]).toHaveClass('opacity-0')
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        onClick={spy}
      />,
    )
    const optionRoles = screen.getAllByRole('option')

    fireEvent.click(optionRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(options[0].value)
  })

  it('objectValueonClick', () => {
    const spy = jest.fn()
    const objValueOptions = options.map(o => ({ ...o, value: { key1: o.label, key2: o.value } }))
    render(
      <ListBox<{ key1: string; key2: string }>
        className="className"
        name="listboxTest"
        value={[]}
        options={objValueOptions}
        onClick={spy}
      />,
    )
    const optionRoles = screen.getAllByRole('option')

    fireEvent.click(optionRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(objValueOptions[0].value)
  })

  it('isLoading', () => {
    const spy = jest.fn()
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        isLoading
        onClick={spy}
      />,
    )
    const optionRoles = screen.getAllByRole('option')

    fireEvent.keyDown(optionRoles[0], { code: 'Space' })
    fireEvent.click(optionRoles[0])
    expect(spy).toHaveBeenCalledTimes(0)
    expect(spy).not.toHaveBeenCalledWith('value1listboxTest')
    expect(optionRoles[0]).toHaveAttribute('aria-disabled', 'true')
  })

  it('hideCheckbox', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
        hideCheckbox
      />,
    )
    const checkIconTestIds = screen.queryAllByTestId('CheckIcon')

    expect(checkIconTestIds).toHaveLength(0)
  })

  it('children', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
      >
        <div data-testid="test">test</div>
      </ListBox>,
    )
    const childrenTestId = screen.getByTestId('test')

    expect(childrenTestId).toBeInTheDocument()
  })

  it('buttonProps/checkboxProps', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        buttonProps={{ className: 'buttonClass' }}
        checkboxProps={{ className: 'checkboxClass' }}
        onClick={() => {}}
      />,
    )
    const checkboxTestIds = screen.getAllByTestId('CheckboxWrap')
    const optionRoles = screen.getAllByRole('option')

    expect(checkboxTestIds[0]).toHaveClass('checkboxClass')
    expect(optionRoles[0]).toHaveClass('buttonClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLUListElement>()
    render(<ListBox ref={ref} name="listboxTest" value={[]} options={options} onClick={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('onSelectAll renders SelectAllOption', () => {
    const spy = jest.fn()
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
        selectAllState={{ checked: false, indeterminate: false, disabled: false }}
        onSelectAll={spy}
      />,
    )
    const selectAll = screen.getByRole('option', { name: /select all/i })
    expect(selectAll).toBeInTheDocument()
    expect(selectAll).toHaveAttribute('role', 'option')
    expect(selectAll).toHaveAttribute('aria-selected', 'false')
    expect(selectAll).not.toHaveAttribute('data-selected')
  })

  it('onSelectAll not rendered when prop absent', () => {
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
      />,
    )
    expect(screen.queryByRole('option', { name: /select all/i })).not.toBeInTheDocument()
  })

  it('onSelectAll checked when all selected', () => {
    render(
      <ListBox
        name="listboxTest"
        value={options.map(o => o.value)}
        options={options}
        onClick={() => {}}
        selectAllState={{ checked: true, indeterminate: false, disabled: false }}
        onSelectAll={() => {}}
      />,
    )
    const selectAll = screen.getByRole('option', { name: /select all/i })
    expect(selectAll).toHaveAttribute('aria-selected', 'true')
    expect(selectAll).toHaveAttribute('data-selected')
  })

  it('onSelectAll indeterminate when some selected', () => {
    render(
      <ListBox
        name="listboxTest"
        value={[options[0].value]}
        options={options}
        onClick={() => {}}
        selectAllState={{ checked: false, indeterminate: true, disabled: false }}
        onSelectAll={() => {}}
      />,
    )
    const selectAll = screen.getByRole('option', { name: /select all/i })
    expect(selectAll).toHaveAttribute('aria-selected', 'false')
    expect(selectAll).not.toHaveAttribute('data-selected')
    const minusIcon = screen.getByTestId('MinusIcon')
    expect(minusIcon).toHaveClass('opacity-100')
  })

  it('onSelectAll click calls handler', () => {
    const spy = jest.fn()
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
        selectAllState={{ checked: false, indeterminate: false, disabled: false }}
        onSelectAll={spy}
      />,
    )
    fireEvent.click(screen.getByRole('option', { name: /select all/i }))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('onSelectAll with grouped options', () => {
    const groupedOptions = getGroupedOptions('listboxTest')
    const allValues = groupedOptions.flatMap(g => g.groupedOptions).map(o => o.value)
    render(
      <ListBox
        name="listboxTest"
        value={allValues}
        options={groupedOptions}
        isGrouped
        onClick={() => {}}
        selectAllState={{ checked: true, indeterminate: false, disabled: false }}
        onSelectAll={() => {}}
      />,
    )
    const selectAll = screen.getByRole('option', { name: /select all/i })
    expect(selectAll).toBeInTheDocument()
    expect(selectAll).toHaveAttribute('aria-selected', 'true')
    expect(selectAll).toHaveAttribute('data-selected')
  })

  it('onSelectAll disabled when no options', () => {
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={[]}
        onClick={() => {}}
        selectAllState={{ checked: false, indeterminate: false, disabled: true }}
        onSelectAll={() => {}}
      />,
    )
    const selectAll = screen.getByRole('option', { name: /select all/i })
    expect(selectAll).toHaveAttribute('aria-disabled', 'true')
  })

  it('onSelectAll disabled when all options disabled', () => {
    const disabledOptions = options.slice(0, 3).map(o => ({ ...o, isDisabled: true }))
    render(
      <ListBox
        name="listboxTest"
        value={[]}
        options={disabledOptions}
        onClick={() => {}}
        selectAllState={{ checked: false, indeterminate: false, disabled: true }}
        onSelectAll={() => {}}
      />,
    )
    const selectAll = screen.getByRole('option', { name: /select all/i })
    expect(selectAll).toHaveAttribute('aria-disabled', 'true')
  })

  it('axe', async () => {
    const { container } = render(
      <>
        <div id="listboxTest-label">Label</div>
        <ListBox name="listboxTest" labelId="listboxTest-label" value={[]} options={options} onClick={() => {}} />
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('axe with onSelectAll', async () => {
    const { container } = render(
      <>
        <div id="listboxTest-label">Label</div>
        <ListBox
          name="listboxTest"
          labelId="listboxTest-label"
          value={[]}
          options={options}
          onClick={() => {}}
          selectAllState={{ checked: false, indeterminate: false, disabled: false }}
          onSelectAll={() => {}}
        />
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
