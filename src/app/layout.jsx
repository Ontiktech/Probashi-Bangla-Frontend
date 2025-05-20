// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import { toastConfig } from '@/configs/toastConfig'
import '@assets/iconify-icons/generated-icons.css'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'Probashi Kollan - A simple web app',
  description: 'Probashi Kollan - A simple web app'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        {children}
        <ToastContainer {...toastConfig} />
      </body>
    </html>
  )
}

export default RootLayout
