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
  it('default', async () => {
    render(
      <Menu className="className" name="menuTest" title="Menu Title" options={options}>
        <div data-testid="test">test</div>
      </Menu>,
    )
    const menuWrapTestId = screen.getByTestId('MenuWrap')
    const menuButtonTestId = screen.getByTestId('MenuButton')

    expect(menuWrapTestId).toBeInTheDocument()
    expect(menuWrapTestId).toHaveClass('className')
    expect(menuButtonTestId).toBeInTheDocument()
    expect(menuButtonTestId).toHaveTextContent('Menu Title')
    expect(menuButtonTestId).toHaveAttribute('id', 'menuTest-button')
    expect(menuButtonTestId).toHaveAttribute('aria-haspopup', 'menu')
    expect(menuButtonTestId).toHaveAttribute('aria-expanded', 'false')
    expect(menuButtonTestId).toHaveAttribute('aria-controls', 'menuTest-menu')
    expect(menuButtonTestId).toHaveAttribute('aria-owns', 'menuTest-menu')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
    })

    const dropdownTestId = screen.getByTestId('Dropdown')
    const menuRole = screen.getByRole('menu')
    const menuItemRoles = screen.getAllByRole('menuitem')
    const childrenTestId = screen.getByTestId('test')

    expect(menuButtonTestId).toHaveAttribute('aria-expanded', 'true')
    expect(menuButtonTestId).toHaveClass('selected')
    expect(dropdownTestId).toBeInTheDocument()
    expect(menuRole).toBeInTheDocument()
    expect(menuRole).toHaveAttribute('id', 'menuTest-menu')
    expect(menuRole).toHaveAttribute('aria-labelledby', 'menuTest-menu-button')
    expect(menuItemRoles).toHaveLength(8)
    expect(menuItemRoles[0]).toHaveTextContent(options[0].groupedOptions[0].label)
    expect(childrenTestId).toBeInTheDocument()
    menuButtonTestId.focus()
    expect(document.activeElement).toBe(menuButtonTestId)
  })

  it('children', async () => {
    render(
      <Menu name="menuTest" title="Menu Title">
        <MenuItemButton>Item 1</MenuItemButton>
        <MenuItemButton>Item 2</MenuItemButton>
        <MenuItemButton>Item 3</MenuItemButton>
      </Menu>,
    )
    const menuButtonTestId = screen.getByTestId('MenuButton')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
    })

    const menuItemRoles = screen.getAllByRole('menuitem')

    expect(menuItemRoles).toHaveLength(3)
    expect(menuItemRoles[0]).toHaveTextContent('Item 1')
    expect(menuItemRoles[1]).toHaveTextContent('Item 2')
    expect(menuItemRoles[2]).toHaveTextContent('Item 3')
  })

  it('submenus', async () => {
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

  it('controlled', async () => {
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
    const menuWrapTestId = screen.getByTestId('MenuWrap')

    expect(menuWrapTestId).toBeInTheDocument()
    expect(anchorButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(anchorButton)
    })

    const dropdownTestId = screen.getByTestId('Dropdown')
    const menuRole = screen.getByRole('menu')
    const menuItemRoles = screen.getAllByRole('menuitem')

    expect(anchorButton).toHaveAttribute('aria-expanded', 'true')
    expect(dropdownTestId).toBeInTheDocument()
    expect(menuRole).toBeInTheDocument()
    expect(menuRole).toHaveAttribute('id', 'menuTest-menu')
    expect(menuItemRoles).toHaveLength(1)
    expect(menuItemRoles[0]).toHaveTextContent('Item 1')
  })

  it('buttonProps/dropdownProps', async () => {
    render(
      <Menu
        name="menuTest"
        title="Menu Title"
        buttonProps={{ className: 'buttonClass' }}
        dropdownProps={{ className: 'dropdownClass' }}
        isOpen={true}
      />,
    )

    const menuButtonTestId = screen.getByTestId('MenuButton')
    const dropdownTestId = screen.getByTestId('Dropdown')

    expect(menuButtonTestId).toHaveClass('buttonClass')
    expect(dropdownTestId).toHaveClass('dropdownClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Menu ref={ref} name="menuTest" title="Menu Title" isOpen={true} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Menu name="menuTest" title="Menu Title" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
