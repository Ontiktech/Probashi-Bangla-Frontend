import { getCourseDetails } from '@/actions/course.server.action'
import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import UpdateCourse from './_components/UpdateCourse'

const CourseUpdatePage = async ({ params: { id } }) => {
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
        title={<Typography variant='h6'>{course?.title}</Typography>}
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Show and manage course details.'
        action={
          <Stack direction='row' spacing={1}>
            <Button
              variant='outlined'
              component={Link}
              href='/courses'
              startIcon={<i className='ri-arrow-left-line'></i>}
              size='small'
            >
              Back
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <UpdateCourse course={course} />
      </CardContent>
    </Card>
  )
}
export default CourseUpdatePage
