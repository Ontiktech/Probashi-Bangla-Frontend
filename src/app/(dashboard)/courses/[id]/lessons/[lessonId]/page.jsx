import { getLessonDetails } from '@/actions/lesson.server.action'
import BlankMessage from '@/components/common/BlankMessage'
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
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Link from 'next/link'

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

        <Typography variant='h6' sx={{ mt: 6 }}>
          Course Days
        </Typography>

        <TableContainer component={Card} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Day</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lesson?.days?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <BlankMessage message='No days found.' />
                  </TableCell>
                </TableRow>
              ) : (
                lesson?.days?.map(day => (
                  <TableRow key={day?.id}>
                    <TableCell align='center'>{day?.dayNumber}</TableCell>
                    <TableCell>{day?.title}</TableCell>
                    <TableCell align='center'>
                      <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                        <Button
                          variant='contained'
                          component={Link}
                          href={`/courses/${id}/lessons/${lessonId}/days/${day?.id}`}
                          size='small'
                        >
                          <i className='ri-eye-fill'></i>
                        </Button>
                        <Button variant='contained' size='small' color='error'>
                          <i className='ri-delete-bin-6-line'></i>
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default LessonDetailsPage
