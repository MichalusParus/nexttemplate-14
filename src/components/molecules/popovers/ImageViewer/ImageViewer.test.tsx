import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { ImageViewer } from '.'

describe('ImageViewer', () => {
  it('default', () => {
    render(
      <ImageViewer name="viewerTest" className="className">
        Image
      </ImageViewer>,
    )
    expect(screen.getByTestId('ImageViewer')).toBeInTheDocument()
    expect(screen.getByTestId('ImageViewer')).toHaveClass('className')
  })
})
