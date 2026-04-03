import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { tabsOptions } from '../../../../../../.storybook/helpers'
import { TabListSelect } from '.'

expect.extend(toHaveNoViolations)

describe('TabListSelect', () => {
  describe('Semantics', () => {
    it('renders combobox with className', () => {
      render(
        <TabListSelect
          className="className"
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toBeInTheDocument()
      expect(screen.getByTestId('TabListSelect')).toHaveClass('className')
    })

    it('combobox shows selected tab label', () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent(tabsOptions[0].label)
    })

    it('closed state has no tablist or tabs', () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      expect(combobox).toHaveAttribute('aria-controls', 'select-tab-listbox')
      expect(combobox).toHaveAttribute('aria-owns', 'select-tab-listbox')
      expect(combobox).toHaveAttribute('aria-haspopup', 'listbox')
      expect(screen.queryByRole('tablist')).toBeNull()
      expect(screen.queryAllByRole('tab')).toHaveLength(0)
    })

    it('opens to show tablist with tab roles', async () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => {
        fireEvent.click(combobox)
      })
      const tablist = screen.queryByRole('tablist')
      const tabs = screen.queryAllByRole('tab')
      const dropdown = screen.getByTestId('Dropdown')

      expect(tablist).toBeInTheDocument()
      expect(tablist).toHaveAttribute('aria-hidden', 'false')
      expect(tabs).toHaveLength(tabsOptions.length)
      expect(dropdown).toBeInTheDocument()
      expect(tabs[0]).toHaveTextContent(tabsOptions[0].label)
      expect(tabs[1]).toHaveTextContent(tabsOptions[1].label)
      expect(tabs[2]).toHaveTextContent(tabsOptions[2].label)
    })

    it('tabs have aria-controls linking to tabpanel', async () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => {
        fireEvent.click(combobox)
      })
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveAttribute('aria-controls', `${tabsOptions[0].value}-tabpanel`)
    })

    it('selected tab has aria-selected true and selected class', async () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => {
        fireEvent.click(combobox)
      })
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveClass('selected')
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    })

    it('hidden tabs not rendered', async () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[1]}
          tabs={tabsOptions
            .map((tab, i) => ({ ...tab, isHidden: i === 0 }))
            .filter(tab => !tab.isHidden)}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => {
        fireEvent.click(combobox)
      })
      const tabs = screen.queryAllByRole('tab')
      const firstTabText = screen.queryByText(tabsOptions[0].label)

      expect(tabs).toHaveLength(tabsOptions.length - 1)
      expect(firstTabText).toBeNull()
      expect(tabs[0]).toHaveTextContent(tabsOptions[1].label)
      expect(tabs[1]).toHaveTextContent(tabsOptions[2].label)
    })

    it('selectProps forwarded', () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          selectProps={{ className: 'selectClass' }}
          onTabChange={() => {}}
        />,
      )
      const select = screen.getByTestId('TabListSelect')

      expect(select).toHaveClass('selectClass')
    })

    it('tabButtonProps forwarded', async () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          tabButtonProps={{ className: 'tabButtonClass' }}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => {
        fireEvent.click(combobox)
      })
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveClass('tabButtonClass')
    })

    it('children rendered in dropdown', async () => {
      render(
        <TabListSelect selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}}>
          <li>
            <button data-testid="button">button</button>
          </li>
        </TabListSelect>,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => {
        fireEvent.click(combobox)
      })
      const button = screen.getByTestId('button')

      expect(button).toBeInTheDocument()
    })

    it('combobox is focusable', async () => {
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => {
        combobox.focus()
      })

      expect(document.activeElement).toBe(combobox)
    })
  })

  describe('Interaction', () => {
    it('onTabChange fires on tab selection', async () => {
      const onTabChange = jest.fn()
      render(
        <TabListSelect
          selectedTab={tabsOptions[0]}
          tabs={tabsOptions}
          onTabChange={onTabChange}
        />,
      )
      const combobox = screen.getByRole('combobox')
      fireEvent.click(combobox)
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        fireEvent.click(tabs[0])
      })
      expect(onTabChange).toHaveBeenCalledTimes(1)
      expect(onTabChange).toHaveBeenCalledWith(tabsOptions[0].value)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <>
          <TabListSelect
            selectedTab={tabsOptions[0]}
            tabs={tabsOptions}
            onTabChange={() => {}}
            selectProps={{ title: 'title' }}
          />
          ,<div id="tab-tabpanel">TabPanel</div>
        </>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
