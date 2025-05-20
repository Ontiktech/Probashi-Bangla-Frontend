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
import Image from 'next/image'
import Link from 'next/link'

const FlashCardPage = async ({ params: { id, lessonId, daysId, flashCardId } }) => {
  const response = await getFlashCardDetails(flashCardId)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { flash_card }
  } = response
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Flash Card 1</Typography>}
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Show and manage course details.'
        action={
          <Stack direction='row' spacing={1}>
            <Button
              variant='outlined'
              component={Link}
              href={`/courses/${id}/lessons/${lessonId}/days/${daysId}`}
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
                  <Image src='/images/avatars/1.png' width={100} height={100} alt='Flash Card' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Audio</TableCell>
                <TableCell>audio.mp3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Front Text</TableCell>
                <TableCell>Text 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Front Subtext</TableCell>
                <TableCell>Subtext 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Back Text</TableCell>
                <TableCell>Back Text 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Back Subtext</TableCell>
                <TableCell>Back subtext 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Example</TableCell>
                <TableCell>Example 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Example Translation</TableCell>
                <TableCell>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, eos.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Usage Notes</TableCell>
                <TableCell>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique impedit, qui quod maxime eius
                  obcaecati quibusdam quaerat neque non repellendus?
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Card Order</TableCell>
                <TableCell>1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default FlashCardPage
