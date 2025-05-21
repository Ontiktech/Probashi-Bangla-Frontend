'use client'
import { deleteLesson } from '@/actions/lesson.server.action'
import BlankMessage from '@/components/common/BlankMessage'
import Modal from '@/components/common/Modal'
import { toCapitalize } from '@/utils/common'
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

const LessonLists = ({ lessons, courseId, daysId }) => {
  const [state, setState] = useState({
    open: false,
    lessonId: null,
    isLoading: false,
    lessonLists: lessons ?? []
  })

  const { open, lessonId, isLoading, lessonLists } = state

  const handleDelete = async e => {
    e.preventDefault()
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await deleteLesson(lessonId, courseId, daysId)

      if (response?.status === 'success') {
        setState(prev => ({
          ...prev,
          lessonLists: prev.lessonLists.filter(lesson => lesson?.id !== lessonId),
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
        Course Lessons
      </Typography>

      <TableContainer component={Card} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='center'>Estimated Minutes</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell align='center'>Xp Reward</TableCell>
              <TableCell align='center'>Lesson Order</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessonLists?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <BlankMessage message='No lessons found.' />
                </TableCell>
              </TableRow>
            ) : (
              lessonLists?.map(lesson => (
                <TableRow key={lesson?.id}>
                  <TableCell>{lesson?.title}</TableCell>
                  <TableCell align='center'>{lesson?.estimatedMinutes}</TableCell>
                  <TableCell>{toCapitalize(lesson?.difficulty)}</TableCell>
                  <TableCell align='center'>{lesson?.xpReward}</TableCell>
                  <TableCell align='center'>{lesson?.lessonOrder}</TableCell>
                  <TableCell align='center'>
                    <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                      <IconButton component={Link} href={`/courses/${courseId}/days/${daysId}/lessons/${lesson?.id}`}>
                        <i className='ri-eye-fill'></i>
                      </IconButton>
                      <IconButton
                        component={Link}
                        href={`/courses/${courseId}/days/${daysId}/lessons/${lesson?.id}/update`}
                      >
                        <i className='ri-edit-box-fill'></i>
                      </IconButton>
                      <IconButton
                        color='error'
                        onClick={() => setState({ ...state, open: true, lessonId: lesson?.id })}
                      >
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
        title='Are you sure to delete this lesson?'
        action={handleDelete}
        loading={isLoading}
      />
    </>
  )
}
export default LessonLists
