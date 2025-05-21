import { getDayDetails } from '@/actions/day.server.action'
import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EditDay from './_components/EditDay'

const UpdateDayPage = async ({ params: { id, lessonId, daysId } }) => {
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
        title={<Typography variant='h6'>{day?.title}</Typography>}
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Edit and customize a course day.'
        action={
          <Stack direction='row' spacing={1}>
            <Button
              variant='outlined'
              component={Link}
              href={`/courses/${id}/lessons/${lessonId}`}
              startIcon={<i className='ri-arrow-left-line'></i>}
            >
              Back
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <EditDay day={day} courseId={id} lessonId={lessonId} dayId={daysId} />
      </CardContent>
    </Card>
  )
}
export default UpdateDayPage
