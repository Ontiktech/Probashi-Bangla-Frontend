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

const CourseDetails = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h6'>Course 1</Typography>
            <Chip label='New' size='small' color='primary' />
          </Stack>
        }
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Show and manage course details.'
        action={
          <Button
            variant='outlined'
            component={Link}
            href='/courses'
            startIcon={<i className='ri-arrow-left-line'></i>}
          >
            Back
          </Button>
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
                    <Image src='/images/avatars/1.png' alt='avatar' width={50} height={50} />
                  </Avatar>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Course 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem eum omnis sit autem reprehenderit
                  dignissimos error nobis velit animi praesentium?
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Days</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell>Bangla</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Target Language</TableCell>
                <TableCell>English</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Difficulty</TableCell>
                <TableCell>
                  <Chip label='Beginner' size='small' color='primary' icon={<i className='ri-star-line'></i>} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Hours</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant='h6' sx={{ mt: 6 }}>
          Course Schedule
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
                    <Button variant='contained' component={Link} href='/courses/1/days/1' size='small'>
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
export default CourseDetails
