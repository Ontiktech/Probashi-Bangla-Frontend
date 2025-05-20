import { getCourseDetails } from '@/actions/course.server.action'
import BlankMessage from '@/components/common/BlankMessage'
import { toCapitalize } from '@/utils/common'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const CourseDetails = async ({ params: { id } }) => {
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
              variant='contained'
              component={Link}
              href={`/courses/${id}/lessons/create`}
              startIcon={<i className='ri-add-large-line'></i>}
              size='small'
            >
              Create Lesson
            </Button>
            <Button
              variant='contained'
              component={Link}
              href={`/courses/${id}/update`}
              startIcon={<i className='ri-edit-box-fill'></i>}
              color='error'
              size='small'
            >
              Edit
            </Button>
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
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>
                  <Avatar variant='rounded'>
                    <Image src={course?.imagePath || '/images/avatars/1.png'} alt='avatar' width={50} height={50} />
                  </Avatar>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{course?.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{course?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell>{toCapitalize(course?.language)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Target Language</TableCell>
                <TableCell>{toCapitalize(course?.targetLanguage)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Difficulty</TableCell>
                <TableCell>
                  <Chip
                    label={toCapitalize(course?.difficulty)}
                    size='small'
                    color='primary'
                    icon={<i className='ri-star-line'></i>}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Hours</TableCell>
                <TableCell>{course?.estimatedHours}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created AT</TableCell>
                <TableCell>{dayjs(course?.createdAt).format('DD MMM, YYYY')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant='h6' sx={{ mt: 6 }}>
          Course Lessons
        </Typography>

        <TableContainer component={Card} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align='center'>Estimated Minutes</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell align='center'>Xp Reward</TableCell>
                <TableCell align='center'>Lesson Order</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {course?.lessons?.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <BlankMessage message='No lessons found.' />
                  </TableCell>
                </TableRow>
              ) : (
                course?.lessons?.map(lesson => (
                  <TableRow key={lesson?.id}>
                    <TableCell>{lesson?.title}</TableCell>
                    <TableCell align='center'>{lesson?.estimatedMinutes}</TableCell>
                    <TableCell>{toCapitalize(lesson?.difficulty)}</TableCell>
                    <TableCell align='center'>{lesson?.xpReward}</TableCell>
                    <TableCell align='center'>{lesson?.lessonOrder}</TableCell>
                    <TableCell align='center'>
                      <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                        <Button
                          variant='contained'
                          component={Link}
                          href={`/courses/${id}/lessons/${lesson?.id}`}
                          size='small'
                        >
                          <i className='ri-eye-fill'></i>
                        </Button>
                        <Button variant='contained' size='small' color='error'>
                          <i class='ri-delete-bin-6-line'></i>
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
export default CourseDetails
