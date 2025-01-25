import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { AutocompleteValue } from '.'

describe('AutocompleteValue', () => {
  it('default', () => {
    render(
      <AutocompleteValue selectedOptions={[]} multiValue={undefined} handleOnChange={() => {}} />,
    )
    expect(screen.getByTestId('SelectedOptionsWrap')).toBeInTheDocument()
  })

  it('handleOnChange', () => {
    const spy = jest.fn()
    render(
      <AutocompleteValue
        selectedOptions={[{ label: 'label1', value: 'value1' }]}
        multiValue={[{ label: 'label1', value: 'value1' }]}
        handleOnChange={spy}
      />,
    )
    expect(screen.getByTestId('SelectedOptionsWrap')).toHaveTextContent('label1')
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
