'use client'

import { deleteFlashCard } from '@/actions/flashCard.server.action'
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

const FlashCardList = ({ flashCards, courseId, lessonId, dayId }) => {
  const [state, setState] = useState({
    open: false,
    flashCardId: null,
    isLoading: false,
    flashCardLists: flashCards ?? []
  })

  const { open, flashCardId, isLoading, flashCardLists } = state

  const handleDelete = async e => {
    e.preventDefault()
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await deleteFlashCard(flashCardId, dayId, courseId, lessonId)

      if (response?.status === 'success') {
        setState(prev => ({
          ...prev,
          flashCardLists: prev.flashCardLists.filter(flashCard => flashCard?.id !== flashCardId),
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
        Course Flash Cards
      </Typography>

      <TableContainer component={Card} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Front Text</TableCell>
              <TableCell>Front Subtext</TableCell>
              <TableCell>Back Text</TableCell>
              <TableCell>Back Subtext</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flashCardLists?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <BlankMessage message='No flash cards found.' />
                </TableCell>
              </TableRow>
            ) : (
              flashCardLists?.map(flashCard => (
                <TableRow key={flashCard?.id}>
                  <TableCell>{flashCard?.frontText}</TableCell>
                  <TableCell>{flashCard?.frontSubtext}</TableCell>
                  <TableCell>{flashCard?.backText}</TableCell>
                  <TableCell>{flashCard?.backSubtext}</TableCell>
                  <TableCell align='center'>
                    <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                      <IconButton
                        component={Link}
                        href={`/courses/${courseId}/lessons/${lessonId}/days/${dayId}/flashcard/${flashCard?.id}`}
                      >
                        <i className='ri-eye-fill'></i>
                      </IconButton>
                      <IconButton
                        component={Link}
                        href={`/courses/${courseId}/lessons/${lessonId}/days/${dayId}/flashcard/${flashCard?.id}/update`}
                      >
                        <i className='ri-edit-box-fill'></i>
                      </IconButton>
                      <IconButton
                        color='error'
                        onClick={() => setState({ ...state, open: true, flashCardId: flashCard?.id })}
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
        title='Are you sure to delete this flash card?'
        action={handleDelete}
        loading={isLoading}
      />
    </>
  )
}
export default FlashCardList
