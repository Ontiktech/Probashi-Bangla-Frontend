import { getDayDetails } from '@/actions/day.server.action'
import BlankMessage from '@/components/common/BlankMessage'
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

  console.log(day)
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

        <Typography variant='h6' sx={{ mt: 6 }}>
          Course Flash Cards
        </Typography>

        <TableContainer component={Card} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Front Text</TableCell>
                <TableCell>Front Subtext</TableCell>
                <TableCell>Back Text</TableCell>
                <TableCell>Back Subtext</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {day?.flash_cards?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <BlankMessage message='No flash cards found.' />
                  </TableCell>
                </TableRow>
              ) : (
                day?.flash_cards?.map(flashCard => (
                  <TableRow key={flashCard?.id}>
                    <TableCell>{flashCard?.frontText}</TableCell>
                    <TableCell>{flashCard?.frontSubtext}</TableCell>
                    <TableCell>{flashCard?.backText}</TableCell>
                    <TableCell>{flashCard?.backSubtext}</TableCell>
                    <TableCell align='center'>
                      <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                        <Button
                          variant='contained'
                          component={Link}
                          href={`/courses/${id}/lessons/${lessonId}/days/${daysId}/flashcard/${flashCard?.id}`}
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
export default DaysPage
