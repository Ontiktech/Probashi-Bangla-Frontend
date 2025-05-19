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
    data: { flash_card }
  } = response
  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>{flash_card?.frontText}</Typography>}
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
                  <Image
                    src={flash_card?.imageUrl ?? '/images/avatars/1.png'}
                    width={100}
                    height={100}
                    alt='Flash Card'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Audio</TableCell>
                <TableCell>{flash_card?.audioUrl}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Front Text</TableCell>
                <TableCell>{flash_card?.frontText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Front Subtext</TableCell>
                <TableCell>{flash_card?.frontSubtext}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Back Text</TableCell>
                <TableCell>{flash_card?.backText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Back Subtext</TableCell>
                <TableCell>{flash_card?.backSubtext}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Example</TableCell>
                <TableCell>{flash_card?.example}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Example Translation</TableCell>
                <TableCell>{flash_card?.exampleTranslation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Usage Notes</TableCell>
                <TableCell>{flash_card?.usageNotes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Card Order</TableCell>
                <TableCell>{flash_card?.cardOrder}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default FlashCardPage
