'use client'
import { Box, Typography } from '@mui/material'

const BlankMessage = ({
  message = 'No data found',
  isError = false,
  iconClass = 'ri-close-circle-fill',
  showBorder = true
}) => {
  return (
    <Box
      component='div'
      className={`aspect-[16/5] rounded-md flex items-center justify-center text-center ${showBorder && 'border border-dashed'} ${isError ? 'border-red-500' : 'border-dark'}`}
    >
      <div className='mx-auto p-3'>
        <i className={`${iconClass} text-3xl md:text-5xl ${isError ? 'text-red-500' : ''}`}></i>
        <Typography
          fontWeight={700}
          textAlign='center'
          fontSize={{
            xs: 14,
            md: 16
          }}
          color={isError ? 'error' : 'secondary'}
        >
          {message}
        </Typography>
        <Typography
          textAlign='center'
          fontSize={{
            xs: 12,
            md: 14
          }}
          color='secondary'
          sx={{ mt: 2, maxWidth: 500, mx: 'auto' }}
        >
          {isError
            ? "We're sorry, an unexpected error occurred; the page you're looking for isn't available. Please check the URL or try again."
            : 'Welcome to our site! Explore, connect, and discover amazing features tailored just for you. Let us make your experience unforgettable!'}
        </Typography>
      </div>
    </Box>
  )
}

export default BlankMessage
