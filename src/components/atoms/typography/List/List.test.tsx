import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { List } from '.'

describe('List', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <List className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('list')).toBeTruthy()
    expect(screen.getByTestId('ListWrap')).toHaveClass('className')
  })

  it('content', () => {
    render(
      <JestMockProvider>
        <List className="className" content={['1', '2', '3']} />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('1')
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('2')
    expect(screen.getAllByRole('listitem')[2]).toHaveTextContent('3')
  })

  it('title', () => {
    render(
      <JestMockProvider>
        <List className="className" title="title" />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('heading')).toHaveLength(1)
    expect(screen.getByRole('heading')).toHaveTextContent('title')
  })

  it('isloading', () => {
    render(
      <JestMockProvider>
        <List
          className="className"
          title="title"
          titleProps={{ variant: 'h3', isLoading: true }}
          isLoading={true}
          expectedLines={6}
        />
        ,
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('status')).toHaveLength(7)
    expect(screen.getByTestId('ListWrap')).toHaveTextContent('')
  })
})
