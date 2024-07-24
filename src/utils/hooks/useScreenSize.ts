import { useCallback, useEffect, useState } from 'react'

/** returns screen sizes on client side. */
export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
  }, [setScreenWidth, setScreenHeight])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
  }
}
