import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../../.jest/customRender'
import { getMenuOptions } from '../../../../../../.storybook/helpers'
import { MenuList } from '.'

expect.extend(toHaveNoViolations)

const options = getMenuOptions()

describe('MenuList', () => {
  describe('Semantics', () => {
    it('renders as menu role', () => {
      render(<MenuList name="menuListTest" options={options} />)
      const menu = screen.getByRole('menu')

      expect(menu).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<MenuList className="className" name="menuListTest" options={options} />)
      const menu = screen.getByRole('menu')

      expect(menu).toHaveClass('className')
    })

    it('has id from name', () => {
      render(<MenuList name="menuListTest" options={options} />)
      const menu = screen.getByRole('menu')

      expect(menu).toHaveAttribute('id', 'menuListTest')
    })

    it('aria-labelledby links to button', () => {
      render(<MenuList name="menuListTest" labelId="menuListTest-button" options={options} />)
      const menu = screen.getByRole('menu')

      expect(menu).toHaveAttribute('aria-labelledby', 'menuListTest-button')
    })

    it('renders menuitems from options', () => {
      render(<MenuList name="menuListTest" options={options} />)
      const menuitems = screen.getAllByRole('menuitem')

      expect(menuitems).toHaveLength(8)
      expect(menuitems[0]).toHaveTextContent(options[0].groupedOptions[0].label)
    })

    it('renders children', () => {
      render(
        <MenuList name="menuListTest" options={options}>
          <div data-testid="test">test</div>
        </MenuList>,
      )
      const child = screen.getByTestId('test')

      expect(child).toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLUListElement>()
      render(<MenuList ref={ref} name="menuListTest" options={options} />)

      expect(ref.current).toBeInstanceOf(HTMLUListElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
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
})
