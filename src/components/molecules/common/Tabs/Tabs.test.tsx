import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { tabs } from '../../../../../.storybook/helpers'
import { Tabs } from '.'

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => 'label1' }),
}))

describe('Tabs', () => {
  it('default', () => {
    render(<Tabs name="tabsTest" param="label1" tabs={tabs} className="className" />)
    expect(screen.getByTestId('Tabs')).toBeTruthy()
    expect(screen.getByTestId('Tabs')).toHaveClass('className')
    expect(screen.getAllByRole('tablist')[0]).toHaveTextContent('Label 1Label 2Label 3')
    expect(screen.getByTestId('tab1Title')).toHaveTextContent('Content 1')
  })

  it('param', () => {
    render(<Tabs name="tabsTest" param="label3" tabs={tabs} className="className" />)
    expect(screen.getByTestId('tab3Title')).toHaveTextContent('Content 3')
  })

  it('ontabClick', () => {
    const spy = jest.fn()
    render(
      <Tabs name="tabsTest" param="label3" tabs={tabs} className="className" onTabClick={spy} />,
    )
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
