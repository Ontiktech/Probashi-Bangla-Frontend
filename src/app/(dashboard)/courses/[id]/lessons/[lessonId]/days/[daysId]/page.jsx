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
import Link from 'next/link'

const DaysPage = ({ params: { id, lessonId, daysId } }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h6'>Day 1</Typography>
            <Chip label='New' size='small' color='primary' />
          </Stack>
        }
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
                <TableCell>1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Day 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Description 1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant='h6' sx={{ mt: 6 }}>
          Course Flash Cards
        </Typography>

        <TableContainer component={Card} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Front Text</TableCell>
                <TableCell>Front Subtext</TableCell>
                <TableCell>Back Text</TableCell>
                <TableCell>Back Subtext</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='center'>Lorem, ipsum.</TableCell>
                <TableCell>Lorem ipsum dolor sit amet.</TableCell>
                <TableCell>Lorem, ipsum.</TableCell>
                <TableCell>Lorem ipsum dolor sit amet.</TableCell>
                <TableCell align='center'>
                  <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                    <Button
                      variant='contained'
                      component={Link}
                      href={`/courses/${id}/lessons/${lessonId}/days/${daysId}/flashcard/1`}
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
export default DaysPage
