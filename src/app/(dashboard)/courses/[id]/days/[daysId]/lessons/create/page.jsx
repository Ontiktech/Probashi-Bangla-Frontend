import { getDayDetails } from '@/actions/day.server.action'
import { Avatar, Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import CreateLesson from './_components/CreateLesson'

const CreateLessonPage = async ({ params: { id, daysId } }) => {
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
            <Typography variant='h6'>Create Lesson for {day?.title}</Typography>
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
            href={`/courses/${id}/days/${daysId}`}
            startIcon={<i className='ri-arrow-left-line'></i>}
            size='small'
          >
            Back
          </Button>
        }
      />
      <CardContent>
        <CreateLesson courseId={id} daysId={daysId} />
      </CardContent>
    </Card>
  )
}
export default CreateLessonPage
