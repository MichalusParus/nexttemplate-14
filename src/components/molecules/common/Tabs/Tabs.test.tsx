import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { tabs } from '../../../../../.storybook/helpers'
import { Tabs } from '.'

jest.mock('next/navigation', () => ({
  usePathname: () => ({ get: () => 'label1' }),
}))

describe('Tabs', () => {
  it('default', () => {
    render(<Tabs name="tabsTest" param="label1" tabs={tabs} className="className" />)
    expect(screen.getByTestId('Tabs')).toBeInTheDocument()
    expect(screen.getByTestId('Tabs')).toHaveClass('className')
    expect(screen.getAllByRole('tablist')[0]).toHaveTextContent('Label 1Label 2Label 3')
    expect(screen.getByTestId('tab1Title')).toHaveTextContent('Content 1')
  })

  it('param', () => {
    render(<Tabs name="tabsTest" param="label3" tabs={tabs} className="className" />)
    expect(screen.getByTestId('tab3Title')).toHaveTextContent('Content 3')
  })
})
