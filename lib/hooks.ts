import { useEffect } from 'react'

export const useFixMobileVH = () => {
  function calculateViewHeight() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  useEffect(() => {
    calculateViewHeight()
    window.addEventListener('resize', calculateViewHeight)
    return () => window.removeEventListener('resize', calculateViewHeight)
  }, [])
}
