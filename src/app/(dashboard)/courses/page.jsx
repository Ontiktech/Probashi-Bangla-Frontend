import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import Link from 'next/link'
import CourseLists from './_components/CourseLists'

const CoursePage = () => {
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Course Lists</Typography>}
        subheader='Course catalog showcasing topics, durations, and enrollments.'
        avatar={
          <Avatar>
            <i className='ri-book-line'></i>
          </Avatar>
        }
        action={
          <Button
            variant='contained'
            startIcon={<i className='ri-add-line'></i>}
            component={Link}
            href='/courses/create'
            size='small'
          >
            Create New
          </Button>
        }
      />
      <CardContent>
        <CourseLists />
      </CardContent>
    </Card>
  )
}
export default CoursePage
