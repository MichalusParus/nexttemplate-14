import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { tabsOptions } from '../../../../../../.storybook/helpers'
import { TabList } from '.'

expect.extend(toHaveNoViolations)

describe('TabList', () => {
  describe('Semantics', () => {
    it('renders Paper wrapper with className', () => {
      render(
        <TabList
          className="className"
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toBeInTheDocument()
      expect(paper).toHaveClass('className')
    })

    it('tablist has aria-orientation horizontal', () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tablist = screen.getByRole('tablist')

      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('renders all tabs with labels', () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs).toHaveLength(tabsOptions.length)
      expect(tabs[0]).toHaveTextContent(tabsOptions[0].label)
      expect(tabs[1]).toHaveTextContent(tabsOptions[1].label)
      expect(tabs[2]).toHaveTextContent(tabsOptions[2].label)
    })

    it('selected tab has aria-selected true and selected class', () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
      expect(tabs[0]).toHaveClass('selected')
    })

    it('unselected tabs have aria-selected false', () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
    })

    it('aria-controls links to tabpanel id', () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveAttribute('aria-controls', `${tabsOptions[0].value}-tabpanel`)
      expect(tabs[1]).toHaveAttribute('aria-controls', `${tabsOptions[1].value}-tabpanel`)
    })

    it('hidden tabs not rendered', () => {
      render(
        <TabList
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions
            .map((tab, i) => ({ ...tab, isHidden: i === 0 }))
            .filter(tab => !tab.isHidden)}
          onTabChange={() => {}}
        />,
      )
      const tabs = screen.queryAllByRole('tab')
      const firstTabText = screen.queryByText(tabsOptions[0].label)

      expect(tabs).toHaveLength(tabsOptions.length - 1)
      expect(firstTabText).toBeNull()
      expect(tabs[0]).toHaveTextContent(tabsOptions[1].label)
      expect(tabs[1]).toHaveTextContent(tabsOptions[2].label)
    })

    it('fullWidth on li and tab', () => {
      render(
        <TabList
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          fullWidth
          onTabChange={() => {}}
        />,
      )
      const lis = screen.getAllByTestId('tabLi')
      const tabs = screen.getAllByRole('tab')

      expect(lis[0]).toHaveClass('w-full')
      expect(tabs[0]).toHaveClass('w-full')
    })

    it('children rendered in tablist wrapped in li', () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}}>
          <button>button</button>
        </TabList>,
      )
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
      expect(button.closest('li')).toHaveAttribute('role', 'presentation')
    })

    it('tabButtonProps className forwarded', () => {
      render(
        <TabList
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          tabButtonProps={{ className: 'className' }}
          onTabChange={() => {}}
        />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveClass('className')
    })

    it('selected tab has tabIndex 0, others tabIndex -1', () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveAttribute('tabIndex', '0')
      expect(tabs[1]).toHaveAttribute('tabIndex', '-1')
      expect(tabs[2]).toHaveAttribute('tabIndex', '-1')
    })
  })

  describe('Keyboard', () => {
    it('ArrowRight focuses next tab', async () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tablist = screen.getByRole('tablist')
      const tabs = screen.getAllByRole('tab')

      await act(async () => {})
      await act(async () => {
        tabs[0].focus()
      })
      expect(document.activeElement).toBe(tabs[0])

      await act(async () => {
        fireEvent.keyDown(tablist, { key: 'ArrowRight', code: 'ArrowRight' })
      })
      expect(document.activeElement).toBe(tabs[1])
    })

    it('ArrowLeft focuses previous tab', async () => {
      render(
        <TabList selectedTab={tabsOptions[1]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tablist = screen.getByRole('tablist')
      const tabs = screen.getAllByRole('tab')

      await act(async () => {})
      await act(async () => {
        tabs[1].focus()
      })
      expect(document.activeElement).toBe(tabs[1])

      await act(async () => {
        fireEvent.keyDown(tablist, { key: 'ArrowLeft', code: 'ArrowLeft' })
      })
      expect(document.activeElement).toBe(tabs[0])
    })

    it('Home focuses first tab', async () => {
      render(
        <TabList selectedTab={tabsOptions[2]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tablist = screen.getByRole('tablist')
      const tabs = screen.getAllByRole('tab')

      await act(async () => {})
      await act(async () => {
        tabs[2].focus()
      })

      await act(async () => {
        fireEvent.keyDown(tablist, { key: 'Home', code: 'Home' })
      })
      expect(document.activeElement).toBe(tabs[0])
    })

    it('End focuses last tab', async () => {
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tablist = screen.getByRole('tablist')
      const tabs = screen.getAllByRole('tab')

      await act(async () => {})
      await act(async () => {
        tabs[0].focus()
      })

      await act(async () => {
        fireEvent.keyDown(tablist, { key: 'End', code: 'End' })
      })
      expect(document.activeElement).toBe(tabs[2])
    })

    it('wraps from last to first', async () => {
      render(
        <TabList selectedTab={tabsOptions[2]} tabs={tabsOptions} onTabChange={() => {}} />,
      )
      const tablist = screen.getByRole('tablist')
      const tabs = screen.getAllByRole('tab')

      await act(async () => {})
      await act(async () => {
        tabs[2].focus()
      })

      await act(async () => {
        fireEvent.keyDown(tablist, { key: 'ArrowRight', code: 'ArrowRight' })
      })
      expect(document.activeElement).toBe(tabs[0])
    })
  })

  describe('Interaction', () => {
    it('onTabChange fires on click', () => {
      const onTabChange = jest.fn()
      render(
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={onTabChange} />,
      )
      const tabs = screen.getAllByRole('tab')

      fireEvent.click(tabs[0])
      expect(onTabChange).toHaveBeenCalledTimes(1)
      expect(onTabChange).toHaveBeenCalledWith(tabsOptions[0].value)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <>
          <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
          <div id={`${tabsOptions[0].value}-tabpanel`}>TabPanel</div>
        </>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
