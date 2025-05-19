import { Avatar, Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import CreateLesson from './_components/CreateLesson'

const CreateLessonPage = ({ params: { id, dayId } }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h6'>Create Lesson for Course 1</Typography>
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
        <CreateLesson />
      </CardContent>
    </Card>
  )
}
export default CreateLessonPage
