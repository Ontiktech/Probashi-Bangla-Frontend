'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const NextProgressBarProvider = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar height='4px' color='#666CFF' options={{ showSpinner: false }} shallowRouting />
    </>
  )
}

export default NextProgressBarProvider
