import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Tabs from '.'

const tabs = [
  { label: 'Label 1', slug: 'label1', component: <>Content 1</> },
  { label: 'Label 2', slug: 'label2', component: <>Content 2</> },
  { label: 'Label 3', slug: 'label3', component: <>Content 3</> },
]

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => 'label1' }),
}))

describe('Tabs', () => {
  it('default', () => {
    render(<Tabs name="tabsTest" tabs={tabs} className="className" />)
    expect(screen.getByTestId('Tabs')).toBeTruthy()
    expect(screen.getByTestId('Tabs')).toHaveClass('className')
  })
})
