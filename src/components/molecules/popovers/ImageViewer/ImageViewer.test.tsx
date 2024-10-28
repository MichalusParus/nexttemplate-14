import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import ImageViewer from '.'

describe('ImageViewer', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <ImageViewer name="viewerTest" className="className">
          Image
        </ImageViewer>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('ImageViewer')).toBeTruthy()
    expect(screen.getByTestId('ImageViewer')).toHaveClass('className')
  })
})
