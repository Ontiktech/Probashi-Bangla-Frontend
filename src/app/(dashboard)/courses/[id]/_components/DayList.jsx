'use client'

import { deleteDay } from '@/actions/day.server.action'
import BlankMessage from '@/components/common/BlankMessage'
import Modal from '@/components/common/Modal'
import {
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'

const DayList = ({ days, courseId }) => {
  const [state, setState] = useState({
    open: false,
    dayId: null,
    isLoading: false,
    dayLists: days ?? []
  })

  const { open, dayId, isLoading, dayLists } = state

  const handleDelete = async e => {
    e.preventDefault()
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await deleteDay(dayId, courseId)

      if (response?.status === 'success') {
        setState(prev => ({
          ...prev,
          dayLists: prev.dayLists.filter(day => day?.id !== dayId),
          open: false
        }))
        toast.success(response?.message)
      } else {
        throw new Error(response?.message)
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong')
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }
  return (
    <>
      <Typography variant='h6' sx={{ mt: 6 }}>
        Course Days
      </Typography>

      <TableContainer component={Card} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Day</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dayLists?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <BlankMessage message='No days found.' />
                </TableCell>
              </TableRow>
            ) : (
              dayLists?.map(day => (
                <TableRow key={day?.id}>
                  <TableCell align='center'>{day?.dayNumber}</TableCell>
                  <TableCell>{day?.title}</TableCell>
                  <TableCell align='center'>
                    <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                      <IconButton component={Link} href={`/courses/${courseId}/days/${day?.id}`}>
                        <i className='ri-eye-fill'></i>
                      </IconButton>
                      <IconButton component={Link} href={`/courses/${courseId}/days/${day?.id}/update`}>
                        <i className='ri-edit-box-fill'></i>
                      </IconButton>
                      <IconButton color='error' onClick={() => setState({ ...state, open: true, dayId: day?.id })}>
                        <i className='ri-delete-bin-6-line'></i>
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        setOpen={() => setState(prev => ({ ...prev, open: false }))}
        title='Are you sure to delete this day?'
        action={handleDelete}
        loading={isLoading}
      />
    </>
  )
}
export default DayList
