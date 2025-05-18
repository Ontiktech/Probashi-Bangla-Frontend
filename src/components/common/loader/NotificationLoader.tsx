import { Skeleton, Stack } from '@mui/material'
import classNames from 'classnames'

const NotificationLoader = () => {
  return (
    <>
      <div className={classNames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group')}>
        <div className='flex flex-col flex-auto'>
          <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='75%' />
            <Skeleton variant='circular' width={16} height={16} />
          </Stack>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='50%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={100} />
        </div>
      </div>
      <div className={classNames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group')}>
        <div className='flex flex-col flex-auto'>
          <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='75%' />
            <Skeleton variant='circular' width={16} height={16} />
          </Stack>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='50%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={100} />
        </div>
      </div>
      <div className={classNames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group')}>
        <div className='flex flex-col flex-auto'>
          <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='75%' />
            <Skeleton variant='circular' width={16} height={16} />
          </Stack>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='50%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={100} />
        </div>
      </div>
      <div className={classNames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group')}>
        <div className='flex flex-col flex-auto'>
          <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='75%' />
            <Skeleton variant='circular' width={16} height={16} />
          </Stack>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='50%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={100} />
        </div>
      </div>
      <div className={classNames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group')}>
        <div className='flex flex-col flex-auto'>
          <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='75%' />
            <Skeleton variant='circular' width={16} height={16} />
          </Stack>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='50%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={100} />
        </div>
      </div>
      <div className={classNames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group')}>
        <div className='flex flex-col flex-auto'>
          <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='75%' />
            <Skeleton variant='circular' width={16} height={16} />
          </Stack>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='50%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={100} />
        </div>
      </div>
      <div className={classNames('flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group')}>
        <div className='flex flex-col flex-auto'>
          <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='75%' />
            <Skeleton variant='circular' width={16} height={16} />
          </Stack>
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='50%' />
          <Skeleton variant='text' sx={{ fontSize: '1rem' }} width={100} />
        </div>
      </div>
    </>
  )
}

export default NotificationLoader
