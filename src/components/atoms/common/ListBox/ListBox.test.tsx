import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { getOptions, JestMockProvider } from '../../../../../.storybook/helpers'
import { ListBox } from '.'

describe('ListBox', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <ListBox
          className="className"
          name="listboxTest"
          value={[]}
          options={getOptions('listboxTest', 20)}
          onClick={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('listbox')).toHaveClass('className')
    expect(screen.getByRole('listbox')).toHaveAttribute('id', 'listboxTest')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <ListBox
          className="className"
          name="listboxTest"
          value={['value1listboxTest']}
          options={getOptions('listboxTest', 20)}
          onClick={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })
})
