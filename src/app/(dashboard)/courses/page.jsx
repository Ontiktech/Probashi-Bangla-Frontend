import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import CourseLists from './_components/CourseLists'

const CoursePage = () => {
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Courses</Typography>}
        subheader='List of courses'
        avatar={
          <Avatar>
            <i className='ri-book-line'></i>
          </Avatar>
        }
        action={
          <Button variant='contained' startIcon={<i className='ri-add-line'></i>}>
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
