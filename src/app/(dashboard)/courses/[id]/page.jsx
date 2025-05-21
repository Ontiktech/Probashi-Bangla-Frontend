import { getCourseDetails } from '@/actions/course.server.action'
import { toCapitalize } from '@/utils/common'
import {
  Avatar,
  Box,
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
  TableRow,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DayList from './_components/DayList'

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
              href={`/courses/${id}/days/create`}
              startIcon={<i className='ri-add-large-line'></i>}
              size='small'
            >
              Create Day
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
        <Box component='div' className='aspect-[16/7]' sx={{ mb: 5 }}>
          <Image
            src={course?.imagePath || '/images/blank/no-image.png'}
            alt='avatar'
            width={1000}
            height={700}
            className='w-full h-full object-cover'
          />
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
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

        <DayList days={course?.days} courseId={id} />
      </CardContent>
    </Card>
  )
}
export default CourseDetails
