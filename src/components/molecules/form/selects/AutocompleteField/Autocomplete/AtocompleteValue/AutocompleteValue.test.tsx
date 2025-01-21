import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../../../.storybook/helpers'
import { AutocompleteValue } from '.'

describe('AutocompleteValue', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <AutocompleteValue selectedOptions={[]} multiValue={undefined} handleOnChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('SelectedOptionsWrap')).toBeInTheDocument()
  })

  it('handleOnChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <AutocompleteValue
          selectedOptions={[{ label: 'label1', value: 'value1' }]}
          multiValue={[{ label: 'label1', value: 'value1' }]}
          handleOnChange={spy}
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('SelectedOptionsWrap')).toHaveTextContent('label1')
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
