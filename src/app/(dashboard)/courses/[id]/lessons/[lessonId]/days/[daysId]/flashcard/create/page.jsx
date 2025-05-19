import { getDayDetails } from '@/actions/day.server.action'
import { Avatar, Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import CreateFlashCard from './_components/CreateFlashCard'

const CreateFlashCardPage = async ({ params: { id, lessonId, daysId } }) => {
  const response = await getDayDetails(daysId)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { day }
  } = response
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h6'>Create new flash card for {day?.title}</Typography>
            <Chip label='New' size='small' color='primary' />
          </Stack>
        }
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Create and customize a new course day.'
        action={
          <Button
            variant='outlined'
            component={Link}
            href={`/courses/${id}/lessons/${lessonId}/days/${daysId}`}
            startIcon={<i className='ri-arrow-left-line'></i>}
          >
            Back
          </Button>
        }
      />
      <CardContent>
        <CreateFlashCard courseId={id} lessonId={lessonId} daysId={daysId} />
      </CardContent>
    </Card>
  )
}
export default CreateFlashCardPage
