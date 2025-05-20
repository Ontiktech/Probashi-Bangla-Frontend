import { getLessonDetails } from '@/actions/lesson.server.action'
import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import UpdateLesson from './_components/UpdateLesson'

const UpdateLessonPage = async ({ params: { id, lessonId } }) => {
  const response = await getLessonDetails(lessonId)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { lesson }
  } = response
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>{lesson?.title}</Typography>}
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Show and manage course days.'
        action={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Button
              variant='contained'
              component={Link}
              href={`/courses/${id}/lessons/${lessonId}/days/create`}
              startIcon={<i className='ri-add-large-line'></i>}
            >
              Create Days
            </Button>
            <Button
              variant='outlined'
              component={Link}
              href={`/courses/${id}`}
              startIcon={<i className='ri-arrow-left-line'></i>}
            >
              Back
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <UpdateLesson lesson={lesson} courseId={id} lessonId={lessonId} />
      </CardContent>
    </Card>
  )
}
export default UpdateLessonPage
