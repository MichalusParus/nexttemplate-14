import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../../.jest/customRender'
import { getMenuOptions } from '../../../../../../.storybook/helpers'
import { MenuList } from '.'

expect.extend(toHaveNoViolations)

describe('MenuList', () => {
  const options = getMenuOptions()
  it('default', () => {
    render(<MenuList className="className" name="menuListTest" options={options} />)
    const listboxRole = screen.getByRole('menu')
    const optionRoles = screen.getAllByRole('menuitem')

    expect(listboxRole).toBeInTheDocument()
    expect(listboxRole).toHaveClass('className')
    expect(listboxRole).toHaveAttribute('id', 'menuListTest')
    expect(listboxRole).toHaveAttribute('aria-labelledby', 'menuListTest-button')
    expect(optionRoles).toHaveLength(8)
    expect(optionRoles[0]).toHaveTextContent(options[0].groupedOptions[0].label)
  })

  it('children', () => {
    render(
      <MenuList className="className" name="menuListTest" options={options}>
        <div data-testid="test">test</div>
      </MenuList>,
    )
    const childrenTestId = screen.getByTestId('test')

    expect(childrenTestId).toBeInTheDocument()
  })

  it('ref', () => {
    const ref = createRef<HTMLUListElement>()
    render(<MenuList ref={ref} name="menuListTest" options={options} />)

    expect(ref.current).not.toBeNull()
  })

  it('axe', async () => {
    const { container } = render(
      <>
        <div id="menuListTest-label">Label</div>
        <MenuList name="menuListTest" options={options} />
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
