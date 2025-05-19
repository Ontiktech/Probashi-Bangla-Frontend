import { Avatar, Button, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import CreateDays from './_components/CreateDays'

const CreateDaysPage = ({ params: { id, lessonId } }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h6'>Create Course Day for Lesson 1</Typography>
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
            href={`/courses/${id}/lessons/${lessonId}`}
            startIcon={<i className='ri-arrow-left-line'></i>}
          >
            Back
          </Button>
        }
      />
      <CardContent>
        <CreateDays />
      </CardContent>
    </Card>
  )
}
export default CreateDaysPage
