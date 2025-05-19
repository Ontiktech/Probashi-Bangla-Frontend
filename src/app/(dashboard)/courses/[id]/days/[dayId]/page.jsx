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

const DaysPage = () => {
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Days 1</Typography>}
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
              href='/courses/1/days/1/lesson/create'
              startIcon={<i className='ri-add-large-line'></i>}
            >
              Create Lesson
            </Button>
            <Button
              variant='outlined'
              component={Link}
              href='/courses/1'
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
                <TableCell>Total Days 1</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Days 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem eum omnis sit autem reprehenderit
                  dignissimos error nobis velit animi praesentium?
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant='h6' sx={{ mt: 6 }}>
          Days Lessons
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
                    <Button variant='contained' component={Link} href='/courses/1/days/1' size='small'>
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
export default DaysPage
