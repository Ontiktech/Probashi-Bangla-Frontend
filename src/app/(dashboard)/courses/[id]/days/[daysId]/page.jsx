import { getDayDetails } from '@/actions/day.server.action'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import Link from 'next/link'
import LessonLists from './_components/LessonLists'

const DaysPage = async ({ params: { id, daysId } }) => {
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
        subheader='Show and manage days details.'
        action={
          <Stack direction='row' spacing={1}>
            <Button
              variant='contained'
              component={Link}
              href={`/courses/${id}/days/${daysId}/lessons/create`}
              startIcon={<i className='ri-add-large-line'></i>}
              size='small'
            >
              Create Lesson
            </Button>
            <Button
              variant='contained'
              component={Link}
              href={`/courses/${id}/days/${daysId}/update`}
              startIcon={<i className='ri-edit-box-fill'></i>}
              color='error'
              size='small'
            >
              Edit
            </Button>
            <Button
              variant='outlined'
              component={Link}
              href={`/courses/${id}`}
              startIcon={<i className='ri-arrow-left-line'></i>}
              size='small'
            >
              Back
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Day Number</TableCell>
                <TableCell>{day?.dayNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{day?.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{day?.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <LessonLists daysId={daysId} courseId={id} lessons={day?.lessons} />
      </CardContent>
    </Card>
  )
}
export default DaysPage
