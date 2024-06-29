import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import ImageViewer from '.'

describe('ImageViewer', () => {
  it('default', () => {
    render(
      <ImageViewer alt="viewerTest" className="className">
        Image
      </ImageViewer>,
    )
    expect(screen.getByTestId('ImageViewer')).toBeTruthy()
    expect(screen.getByTestId('ImageViewer')).toHaveClass('className')
  })
})
