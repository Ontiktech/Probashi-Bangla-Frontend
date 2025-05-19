import { getCourseDetails } from '@/actions/course.server.action'
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

  console.log({ course })

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
            >
              Create Lesson
            </Button>
            <Button
              variant='outlined'
              component={Link}
              href='/courses'
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
                <TableCell>{course?.createdAt}</TableCell>
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
                <TableCell align='center'>Estimated Minutes</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell align='center'>Xp Reward</TableCell>
                <TableCell align='center'>Lesson Order</TableCell>
                <TableCell align='center'>Audio Intro</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='center'>10</TableCell>
                <TableCell>Easy</TableCell>
                <TableCell align='center'>5</TableCell>
                <TableCell align='center'>1</TableCell>
                <TableCell align='center'>Yes</TableCell>
                <TableCell align='center'>
                  <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                    <Button variant='contained' component={Link} href={`/courses/${id}/lessons/1`} size='small'>
                      <i className='ri-eye-fill'></i>
                    </Button>
                    <Button variant='contained' size='small' color='error'>
                      <i class='ri-delete-bin-6-line'></i>
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default CourseDetails
