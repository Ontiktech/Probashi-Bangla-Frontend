import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import Link from 'next/link'
import LanguageLists from './_components/LanguageLists'

const CourseLanguagePage = () => {
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Languages</Typography>}
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
            size='small'
            component={Link}
            href='/courses/languages/create'
          >
            Create New
          </Button>
        }
      />
      <CardContent>
        <LanguageLists />
      </CardContent>
    </Card>
  )
}
export default CourseLanguagePage
