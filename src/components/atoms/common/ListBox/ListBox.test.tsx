import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { options } from '../../../../../.storybook/helpers'
import ListBox from '.'

describe('ListBox', () => {
  it('default', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={[]}
        options={options}
        onClick={() => {}}
      />,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByRole('listbox')).toHaveClass('className')
    expect(screen.getByRole('listbox')).toHaveAttribute('id', 'listboxTest')
    expect(screen.getAllByTestId('FakeCheckboxWrap')[0]).toBeInTheDocument()
  })

  it('value', () => {
    render(
      <ListBox
        className="className"
        name="listboxTest"
        value={['value1']}
        options={options}
        onClick={() => {}}
      />,
    )
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })
})
