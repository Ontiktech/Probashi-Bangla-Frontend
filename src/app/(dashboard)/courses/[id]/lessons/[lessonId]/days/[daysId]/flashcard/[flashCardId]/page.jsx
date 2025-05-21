import { getFlashCardDetails } from '@/actions/flashCard.server.action'
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
import { notFound } from 'next/navigation'

const FlashCardPage = async ({ params: { id, lessonId, daysId, flashCardId } }) => {
  const response = await getFlashCardDetails(flashCardId)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  console.log({ response })

  const {
    data: { flashCard }
  } = response
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>{flashCard?.frontText}</Typography>}
        avatar={
          <Avatar>
            <i className='ri-add-circle-fill'></i>
          </Avatar>
        }
        subheader='Show and manage flash card details.'
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
                  <Image
                    src={flashCard?.imageUrl ?? '/images/avatars/1.png'}
                    width={100}
                    height={100}
                    alt='Flash Card'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Audio</TableCell>
                <TableCell>{flashCard?.audioUrl}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Front Text</TableCell>
                <TableCell>{flashCard?.frontText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Front Subtext</TableCell>
                <TableCell>{flashCard?.frontSubtext}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Back Text</TableCell>
                <TableCell>{flashCard?.backText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Back Subtext</TableCell>
                <TableCell>{flashCard?.backSubtext}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Example</TableCell>
                <TableCell>{flashCard?.example}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Example Translation</TableCell>
                <TableCell>{flashCard?.exampleTranslation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Usage Notes</TableCell>
                <TableCell>{flashCard?.usageNotes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Card Order</TableCell>
                <TableCell>{flashCard?.cardOrder}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default FlashCardPage
