import { Box, CircularProgress } from '@mui/material'

const TableLoader = () => {
  return (
    <Box className='aspect-[16/5] flex items-center justify-center'>
      <CircularProgress color='primary' size={50} />
    </Box>
  )
}

export default TableLoader
