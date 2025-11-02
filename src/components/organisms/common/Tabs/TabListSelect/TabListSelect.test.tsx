import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { tabs } from '../../../../../../.storybook/helpers'
import { TabListSelect } from '.'

expect.extend(toHaveNoViolations)

describe('TabListSelect', () => {
  it('default', async () => {
    render(
      <TabListSelect
        className="className"
        selectedTab={tabs[0]}
        tabs={tabs}
        onTabChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    const tablistQuery = screen.queryByRole('tablist')
    const tabsQuery = screen.queryAllByRole('tab')

    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveTextContent(tabs[0].label)
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-controls', 'select-tablist-listbox')
    expect(comboboxRole).toHaveAttribute('aria-owns', 'select-tablist-listbox')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'listbox')
    expect(tablistQuery).toBeNull()
    expect(tabsQuery).toHaveLength(0)
    await act(async () => {
      comboboxRole.focus()
    })
    expect(document.activeElement).toBe(comboboxRole)
  })

  it('open/close', async () => {
    render(<TabListSelect selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')
    await act(async () => {
      fireEvent.click(comboboxRole)
    })
    const dropdownTestId = screen.getByTestId('Dropdown')
    const tablistQuery = screen.queryByRole('tablist')
    const tabsQuery = screen.queryAllByRole('tab')

    expect(tablistQuery).toBeInTheDocument()
    expect(tablistQuery).toHaveAttribute('aria-hidden', 'false')
    expect(tabsQuery).toHaveLength(tabs.length)
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveTextContent(tabs[0].label)
    expect(dropdownTestId).toBeInTheDocument()
    expect(tabsQuery[0]).toHaveTextContent(tabs[0].label)
    expect(tabsQuery[1]).toHaveTextContent(tabs[1].label)
    expect(tabsQuery[2]).toHaveTextContent(tabs[2].label)
    expect(tabsQuery[0]).toHaveAttribute('aria-controls', `${tabs[0].value}-tabpanel`)
    expect(tabsQuery[0]).toHaveClass('selected')
    expect(tabsQuery[0]).toHaveAttribute('aria-selected', 'true')
    act(() => {
      tabsQuery[0].focus()
    })
    expect(document.activeElement).toBe(tabsQuery[0])
  })

  it('hidden', async () => {
    render(
      <TabListSelect
        selectedTab={tabs[1]}
        tabs={tabs.map((tab, i) => ({ ...tab, isHidden: i === 0 })).filter(tab => !tab.isHidden)}
        onTabChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    await act(async () => {
      fireEvent.click(comboboxRole)
    })
    const tabsQuery = screen.queryAllByRole('tab')
    const firstTabText = screen.queryByText(tabs[0].label)

    expect(tabsQuery).toHaveLength(tabs.length - 1)
    expect(firstTabText).toBeNull()
    expect(tabsQuery[0]).toHaveTextContent(tabs[1].label)
    expect(tabsQuery[1]).toHaveTextContent(tabs[2].label)
  })

  it('children', async () => {
    render(
      <TabListSelect selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}}>
        <li>
          <button data-testid="button">button</button>
        </li>
      </TabListSelect>,
    )
    const comboboxRole = screen.getByRole('combobox')
    await act(async () => {
      fireEvent.click(comboboxRole)
    })
    const buttonTestId = screen.getByTestId('button')

    expect(buttonTestId).toBeInTheDocument()
  })

  it('onTabChange', async () => {
    const spy = jest.fn()
    render(<TabListSelect selectedTab={tabs[0]} tabs={tabs} onTabChange={spy} />)
    const comboboxRole = screen.getByRole('combobox')
    fireEvent.click(comboboxRole)
    const tabRoles = screen.getAllByRole('tab')

    await act(async () => {
      fireEvent.click(tabRoles[0])
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(tabs[0].value)
  })

  it('tabButtonProps/selectProps', async () => {
    render(
      <TabListSelect
        selectedTab={tabs[0]}
        tabs={tabs}
        tabButtonProps={{ className: 'tabButtonClass' }}
        selectProps={{ className: 'selectClass' }}
        onTabChange={() => {}}
      />,
    )
    const selectTestId = screen.getByTestId('TabListSelect')
    await act(async () => {
      fireEvent.click(selectTestId)
    })
    const tabRoles = screen.getAllByRole('tab')

    expect(tabRoles[0]).toHaveClass('tabButtonClass')
    expect(selectTestId).toHaveClass('selectClass')
  })

  it('axe', async () => {
    const { container } = render(
      <>
        <TabListSelect
          selectedTab={tabs[0]}
          tabs={tabs}
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
