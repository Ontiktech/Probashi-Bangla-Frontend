import { getCourseDetails } from '@/actions/course.server.action'
import { Avatar, Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import CreateDays from './_components/CreateDays'

const CreateDaysPage = async ({ params: { id } }) => {
  const response = await getCourseDetails(id)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { course }
  } = response
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h6'>Create day for {course?.title}</Typography>
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
            href={`/courses/${id}`}
            startIcon={<i className='ri-arrow-left-line'></i>}
          >
            Back
          </Button>
        }
      />
      <CardContent>
        <CreateDays courseId={id} />
      </CardContent>
    </Card>
  )
}
export default CreateDaysPage
