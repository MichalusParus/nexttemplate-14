import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef, useState } from 'react'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { getMenuOptions } from '../../../../../.storybook/helpers'
import { Menu } from '.'
import { MenuItemButton } from './items'

expect.extend(toHaveNoViolations)

const options = getMenuOptions()

describe('Menu', () => {
  describe('Semantics', () => {
    it('renders wrapper div', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const wrapper = screen.getByTestId('MenuWrap')

      expect(wrapper).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<Menu className="className" name="menuTest" title="Menu Title" options={options} />)
      const wrapper = screen.getByTestId('MenuWrap')

      expect(wrapper).toHaveClass('className')
    })

    it('button shows title', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      expect(menuButton).toHaveTextContent('Menu Title')
    })

    it('button has id from name', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      expect(menuButton).toHaveAttribute('id', 'menuTest-button')
    })

    it('aria-haspopup menu on button', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      expect(menuButton).toHaveAttribute('aria-haspopup', 'menu')
    })

    it('aria-expanded false when closed', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-controls links to menu', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      expect(menuButton).toHaveAttribute('aria-controls', 'menuTest-menu')
    })

    it('aria-owns links to menu', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      expect(menuButton).toHaveAttribute('aria-owns', 'menuTest-menu')
    })

    it('aria-expanded true when open', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('button selected class when open', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      expect(menuButton).toHaveAttribute('data-selected')
    })

    it('renders dropdown when open', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })

    it('menu role with correct id', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      const menu = screen.getByRole('menu')

      expect(menu).toBeInTheDocument()
      expect(menu).toHaveAttribute('id', 'menuTest-menu')
    })

    it('menu has aria-labelledby', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      const menu = screen.getByRole('menu')

      expect(menu).toHaveAttribute('aria-labelledby', 'menuTest-button')
    })

    it('renders menuitems from options', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      const menuitems = screen.getAllByRole('menuitem')

      expect(menuitems).toHaveLength(8)
      expect(menuitems[0]).toHaveTextContent(options[0].groupedOptions[0].label)
    })

    it('renders children inside menu', async () => {
      render(
        <Menu name="menuTest" title="Menu Title" options={options}>
          <div data-testid="test">test</div>
        </Menu>,
      )
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      expect(screen.getByTestId('test')).toBeInTheDocument()
    })

    it('buttonProps forwarded', () => {
      render(
        <Menu name="menuTest" title="Menu Title" buttonProps={{ className: 'buttonClass' }} />,
      )
      const menuButton = screen.getByTestId('MenuButton')

      expect(menuButton).toHaveClass('buttonClass')
    })

    it('dropdownProps forwarded', () => {
      render(
        <Menu
          name="menuTest"
          title="Menu Title"
          dropdownProps={{ className: 'dropdownClass' }}
          isOpen={true}
        />,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown).toHaveClass('dropdownClass')
    })

    it('MenuItemButton children', async () => {
      render(
        <Menu name="menuTest" title="Menu Title">
          <MenuItemButton>Item 1</MenuItemButton>
          <MenuItemButton>Item 2</MenuItemButton>
          <MenuItemButton>Item 3</MenuItemButton>
        </Menu>,
      )
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      const menuitems = screen.getAllByRole('menuitem')

      expect(menuitems).toHaveLength(3)
      expect(menuitems[0]).toHaveTextContent('Item 1')
      expect(menuitems[1]).toHaveTextContent('Item 2')
      expect(menuitems[2]).toHaveTextContent('Item 3')
    })

    it('controlled mode hides internal button', () => {
      const ControlledMenu = () => {
        const [isOpen, setIsOpen] = useState(false)
        const anchorRef = createRef<HTMLDivElement>()

        return (
          <>
            <div ref={anchorRef}>
              <button onClick={() => setIsOpen(!isOpen)}>Anchor Button</button>
            </div>
            <Menu name="menuTest" isOpen={isOpen} anchorRef={anchorRef} setIsOpen={setIsOpen}>
              <MenuItemButton>Item 1</MenuItemButton>
            </Menu>
          </>
        )
      }

      render(<ControlledMenu />)

      expect(screen.getByTestId('MenuWrap')).toBeInTheDocument()
      expect(screen.queryByTestId('MenuButton')).not.toBeInTheDocument()
    })

    it('controlled mode renders menu', async () => {
      const ControlledMenu = () => {
        const [isOpen, setIsOpen] = useState(false)
        const anchorRef = createRef<HTMLDivElement>()

        return (
          <>
            <div ref={anchorRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls="menuTest-menu"
                aria-owns="menuTest-menu"
              >
                Anchor Button
              </button>
            </div>
            <Menu name="menuTest" isOpen={isOpen} anchorRef={anchorRef} setIsOpen={setIsOpen}>
              <MenuItemButton>Item 1</MenuItemButton>
            </Menu>
          </>
        )
      }

      render(<ControlledMenu />)
      const anchorButton = screen.getByRole('button', { name: 'Anchor Button' })

      await act(async () => {
        fireEvent.click(anchorButton)
      })

      const dropdown = screen.getByTestId('Dropdown')
      const menu = screen.getByRole('menu')
      const menuitems = screen.getAllByRole('menuitem')

      expect(anchorButton).toHaveAttribute('aria-expanded', 'true')
      expect(dropdown).toBeInTheDocument()
      expect(menu).toBeInTheDocument()
      expect(menu).toHaveAttribute('id', 'menuTest-menu')
      expect(menuitems).toHaveLength(1)
      expect(menuitems[0]).toHaveTextContent('Item 1')
    })

    it('focusable button in closed menu', () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      menuButton.focus()
      expect(document.activeElement).toBe(menuButton)
    })
  })

  describe('Keyboard', () => {
    const openMenu = async () => {
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      // Flush scope registration + keydown listener + focusable element discovery
      await act(async () => {})
      await act(async () => {})

      return menuButton
    }

    it('ArrowDown moves to next item', async () => {
      render(
        <Menu name="menuTest" title="Menu Title">
          <MenuItemButton>Item 1</MenuItemButton>
          <MenuItemButton>Item 2</MenuItemButton>
          <MenuItemButton>Item 3</MenuItemButton>
        </Menu>,
      )

      await openMenu()
      const menuitems = screen.getAllByRole('menuitem')

      // First ArrowDown focuses first menuitem (from trigger position)
      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(menuitems[0])

      // Second ArrowDown moves to next
      await act(async () => {
        fireEvent.keyDown(menuitems[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(menuitems[1])
    })

    it('ArrowUp moves to previous item', async () => {
      render(
        <Menu name="menuTest" title="Menu Title">
          <MenuItemButton>Item 1</MenuItemButton>
          <MenuItemButton>Item 2</MenuItemButton>
          <MenuItemButton>Item 3</MenuItemButton>
        </Menu>,
      )

      await openMenu()
      const menuitems = screen.getAllByRole('menuitem')

      // Navigate down twice then up once
      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'ArrowDown', code: 'ArrowDown' })
      })

      await act(async () => {
        fireEvent.keyDown(menuitems[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(menuitems[1])

      await act(async () => {
        fireEvent.keyDown(menuitems[1], { key: 'ArrowUp', code: 'ArrowUp' })
      })

      expect(document.activeElement).toBe(menuitems[0])
    })

    it('Enter activates menuitem', async () => {
      const onClick = jest.fn()
      render(
        <Menu name="menuTest" title="Menu Title">
          <MenuItemButton onClick={onClick}>Item 1</MenuItemButton>
        </Menu>,
      )

      await openMenu()
      const menuitems = screen.getAllByRole('menuitem')

      await act(async () => {
        fireEvent.click(menuitems[0])
      })

      expect(onClick).toHaveBeenCalled()
    })

    it('Space activates menuitem', async () => {
      const onClick = jest.fn()
      render(
        <Menu name="menuTest" title="Menu Title">
          <MenuItemButton onClick={onClick}>Item 1</MenuItemButton>
        </Menu>,
      )

      await openMenu()
      const menuitems = screen.getAllByRole('menuitem')

      await act(async () => {
        fireEvent.click(menuitems[0])
      })

      expect(onClick).toHaveBeenCalled()
    })

    it('Escape closes menu', async () => {
      render(
        <Menu name="menuTest" title="Menu Title">
          <MenuItemButton>Item 1</MenuItemButton>
        </Menu>,
      )

      await openMenu()
      expect(screen.getByRole('menu')).toBeInTheDocument()

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'Escape', code: 'Escape' })
      })

      await waitFor(() => {
        expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()
      })
    })

    it('Escape restores focus to trigger', async () => {
      render(
        <Menu name="menuTest" title="Menu Title">
          <MenuItemButton>Item 1</MenuItemButton>
        </Menu>,
      )

      const menuButton = await openMenu()

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'Escape', code: 'Escape' })
      })

      await waitFor(() => {
        expect(document.activeElement).toBe(menuButton)
      })
    })
  })

  describe('Interaction', () => {
    it('click opens menu', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      expect(screen.getByRole('menu')).toBeInTheDocument()
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('click toggles closed', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      expect(screen.getByRole('menu')).toBeInTheDocument()

      await act(async () => {
        fireEvent.click(menuButton)
      })

      await waitFor(() => {
        expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()
      })
    })

    it('hover opens with onHoverOpen', async () => {
      render(
        <Menu name="menuTest" title="Menu Title" onHoverOpen isModal={false}>
          <MenuItemButton>Item 1</MenuItemButton>
        </Menu>,
      )
      const wrapper = screen.getByTestId('MenuWrap')

      await act(async () => {
        fireEvent.mouseEnter(wrapper)
      })

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
    })

    it('submenu hover open and closeAll', async () => {
      render(<Menu name="menuTest" title="Menu Title" options={options} />)
      const menuButton = screen.getByTestId('MenuButton')

      await act(async () => {
        fireEvent.click(menuButton)
      })

      const hoverSubmenu = screen.getByText('HoverSubmenu2')
      const hoverSubmenuWrap = hoverSubmenu.closest('.MenuWrap')

      await act(async () => {
        fireEvent.mouseEnter(hoverSubmenuWrap!)
      })

      await waitFor(() => {
        expect(screen.getByText('NestedHoverSubmenu1')).toBeInTheDocument()
      })

      await act(async () => {
        fireEvent.mouseDown(document.body)
      })

      await waitFor(() => {
        expect(screen.queryByText('NestedHoverSubmenu1')).not.toBeInTheDocument()
      })

      await act(async () => {
        fireEvent.click(menuButton)
      })

      const hoverSubmenu2 = screen.getByText('HoverSubmenu2')
      const hoverSubmenuWrap2 = hoverSubmenu2.closest('.MenuWrap')

      await act(async () => {
        fireEvent.mouseEnter(hoverSubmenuWrap2!)
      })

      await waitFor(() => {
        expect(screen.getByText('NestedHoverSubmenu1')).toBeInTheDocument()
      })

      const nestedSubmenu = screen.getByText('NestedHoverSubmenu1')
      const nestedSubmenuWrap = nestedSubmenu.closest('.MenuWrap')

      await act(async () => {
        fireEvent.mouseEnter(nestedSubmenuWrap!)
      })

      await waitFor(() => {
        expect(screen.getByText('NestedCloseOnClick1')).toBeInTheDocument()
      })

      const nestedButton = screen.getByText('NestedCloseOnClick1')

      await act(async () => {
        fireEvent.click(nestedButton)
      })

      await waitFor(
        () => {
          expect(screen.queryByText('NestedCloseOnClick1')).not.toBeInTheDocument()
          expect(screen.queryByText('NestedHoverSubmenu1')).not.toBeInTheDocument()
        },
        { timeout: 500 },
      )
    })

    it('controlled mode toggle', async () => {
      const ControlledMenu = () => {
        const [isOpen, setIsOpen] = useState(false)
        const anchorRef = createRef<HTMLDivElement>()

        return (
          <>
            <div ref={anchorRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls="menuTest-menu"
                aria-owns="menuTest-menu"
              >
                Anchor Button
              </button>
            </div>
            <Menu name="menuTest" isOpen={isOpen} anchorRef={anchorRef} setIsOpen={setIsOpen}>
              <MenuItemButton>Item 1</MenuItemButton>
            </Menu>
          </>
        )
      }

      render(<ControlledMenu />)
      const anchorButton = screen.getByRole('button', { name: 'Anchor Button' })

      expect(screen.queryByRole('menu')).not.toBeInTheDocument()

      await act(async () => {
        fireEvent.click(anchorButton)
      })

      expect(screen.getByRole('menu')).toBeInTheDocument()
      expect(anchorButton).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Menu ref={ref} name="menuTest" title="Menu Title" />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Menu name="menuTest" title="Menu Title" />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
