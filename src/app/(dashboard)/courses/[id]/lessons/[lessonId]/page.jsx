import { getLessonDetails } from '@/actions/lesson.server.action'
import { toCapitalize } from '@/utils/common'
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
import DayList from './_components/DayList'

const LessonDetailsPage = async ({ params: { id, lessonId } }) => {
  const response = await getLessonDetails(lessonId)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { lesson }
  } = response

  console.log(lesson)

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>{lesson?.title}</Typography>}
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Show and manage course days.'
        action={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Button
              variant='contained'
              component={Link}
              href={`/courses/${id}/lessons/${lessonId}/days/create`}
              startIcon={<i className='ri-add-large-line'></i>}
            >
              Create Days
            </Button>
            <Button
              variant='outlined'
              component={Link}
              href={`/courses/${id}`}
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
                <TableCell>Title</TableCell>
                <TableCell>{lesson?.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{lesson?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Minutes</TableCell>
                <TableCell>{lesson?.estimatedMinutes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Difficulty</TableCell>
                <TableCell>{toCapitalize(lesson?.difficulty)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Xp Reward</TableCell>
                <TableCell>{lesson?.xpReward}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lesson Order</TableCell>
                <TableCell>{lesson?.lessonOrder}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Audio Intro</TableCell>
                <TableCell>{lesson?.audioIntro}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <DayList days={lesson?.days} courseId={id} lessonId={lessonId} />
      </CardContent>
    </Card>
  )
}
export default LessonDetailsPage
