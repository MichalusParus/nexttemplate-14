import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { getOptions } from '../../../../../.storybook/helpers'
import { ListBox } from '.'

expect.extend(toHaveNoViolations)

describe('ListBox', () => {
  it('default', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={getOptions('listboxTest', 20)}
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
    expect(optionRoles).toHaveLength(20)
    expect(checkIconTestIds).toHaveLength(20)
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
        value={['value1listboxTest']}
        options={getOptions('listboxTest', 20)}
        onClick={() => {}}
      />,
    )
    const optionRoles = screen.getAllByRole('option')
    const checkIconTestIds = screen.getAllByTestId('CheckIcon')

    expect(optionRoles[0]).toHaveAttribute('aria-selected', 'true')
    expect(optionRoles[0]).toHaveClass('selected')
    expect(optionRoles[1]).not.toHaveClass('selected')
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
        options={getOptions('listboxTest', 20)}
        onClick={spy}
      />,
    )
    const optionRoles = screen.getAllByRole('option')

    fireEvent.click(optionRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('value1listboxTest')
  })

  it('onKeyDown', () => {
    const spy = jest.fn()
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={getOptions('listboxTest', 20)}
        onClick={spy}
      />,
    )
    const optionRoles = screen.getAllByRole('option')

    fireEvent.keyDown(optionRoles[0], { code: 'Space' })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('value1listboxTest')
  })

  it('isLoading', () => {
    const spy = jest.fn()
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={getOptions('listboxTest', 20)}
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
        options={getOptions('listboxTest', 20)}
        onClick={() => {}}
        hideCheckbox
      />,
    )
    const checkIconTestIds = screen.queryAllByTestId('CheckIcon')

    expect(checkIconTestIds).toHaveLength(0)
  })

  it('ref', () => {
    const ref = createRef<HTMLUListElement>()
    render(
      <ListBox
        ref={ref}
        name="listboxTest"
        value={[]}
        options={getOptions('listboxTest', 20)}
        onClick={() => {}}
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
      <>
        <div id="listboxTest-label">Label</div>
        <ListBox
          name="listboxTest"
          value={[]}
          options={getOptions('listboxTest', 20)}
          onClick={() => {}}
        />
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
