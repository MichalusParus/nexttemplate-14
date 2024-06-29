import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import SearchBar from '.'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: () => {} }),
}))

describe('SearchBar', () => {
  it('default', () => {
    render(<SearchBar name="searchTest" className="className" />)
    expect(screen.getByRole('search')).toBeTruthy()
    expect(screen.getByRole('search')).toHaveClass('className')
    expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<SearchBar name="searchTest" className="className" onChange={spy} />)
    fireEvent.change(screen.getByRole('searchbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('disabled', () => {
    render(<SearchBar name="searchTest" className="className" disabled />)
    expect(screen.getByRole('searchbox')).toHaveAttribute('disabled', '')
  })
})
