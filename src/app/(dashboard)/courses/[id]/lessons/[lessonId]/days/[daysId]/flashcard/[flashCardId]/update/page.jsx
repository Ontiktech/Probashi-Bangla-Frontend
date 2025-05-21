import { getFlashCardDetails } from '@/actions/flashCard.server.action'
import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import UpdateFlashCard from './_component/UpdateFlashCard'

const UpdateFlashCardPage = async ({ params: { id, lessonId, daysId, flashCardId } }) => {
  const response = await getFlashCardDetails(flashCardId)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { flashCard }
  } = response
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>{flashCard?.frontText}</Typography>}
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Show and manage flash card details.'
        action={
          <Stack direction='row' spacing={1}>
            <Button
              variant='outlined'
              component={Link}
              href={`/courses/${id}/lessons/${lessonId}/days/${daysId}`}
              startIcon={<i className='ri-arrow-left-line'></i>}
            >
              Back
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <UpdateFlashCard
          flashCard={flashCard}
          courseId={id}
          lessonId={lessonId}
          daysId={daysId}
          flashCardId={flashCardId}
        />
      </CardContent>
    </Card>
  )
}
export default UpdateFlashCardPage
