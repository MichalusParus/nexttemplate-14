import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../../../.storybook/helpers'
import { SelectValue } from '.'

describe('SelectValue', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <SelectValue
          selectedOptions={[]}
          multiValue={undefined}
          placeholder="placeholder"
          handleOnChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('SelectPlaceholder')).toBeInTheDocument()
    expect(screen.getByTestId('SelectPlaceholder')).toHaveTextContent('placeholder')
  })

  it('handleOnChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <SelectValue
          selectedOptions={[{ label: 'label1', value: 'value1' }]}
          multiValue={undefined}
          placeholder="placeholder"
          handleOnChange={spy}
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('SelectValue')).toHaveTextContent('label1')
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
