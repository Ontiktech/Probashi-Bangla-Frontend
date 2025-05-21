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
import FlashCardList from './_components/FlashCardList'

const DaysPage = async ({ params: { id, lessonId, daysId } }) => {
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
              href={`/courses/${id}/lessons/${lessonId}/days/${daysId}/flashcard/create`}
              startIcon={<i className='ri-add-large-line'></i>}
            >
              Create Flash Card
            </Button>
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

        <FlashCardList dayId={daysId} courseId={id} lessonId={lessonId} flashCards={day?.flash_cards} />
      </CardContent>
    </Card>
  )
}
export default DaysPage
