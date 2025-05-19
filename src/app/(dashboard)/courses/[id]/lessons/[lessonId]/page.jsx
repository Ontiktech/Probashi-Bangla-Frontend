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

const LessonDetailsPage = ({ params: { id, lessonId } }) => {
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Lesson 1</Typography>}
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
                <TableCell>Lesson 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Minutes</TableCell>
                <TableCell>150</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Difficulty</TableCell>
                <TableCell>Beginner</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Xp Reward</TableCell>
                <TableCell>30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lesson Order</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>audioIntro</TableCell>
                <TableCell>Demo Audio.mp3</TableCell>
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
              <TableRow>
                <TableCell align='center'>2</TableCell>
                <TableCell>Course Day 1</TableCell>
                <TableCell align='center'>
                  <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                    <Button
                      variant='contained'
                      component={Link}
                      href={`/courses/${id}/lessons/${lessonId}/days/1`}
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
              <TableRow>
                <TableCell align='center'>5</TableCell>
                <TableCell>Course Day 2</TableCell>
                <TableCell align='center'>
                  <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                    <Button
                      variant='contained'
                      component={Link}
                      href={`/courses/${id}/lessons/${lessonId}/days/2`}
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
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default LessonDetailsPage
