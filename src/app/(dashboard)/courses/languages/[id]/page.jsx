import { getLanguageDetails } from '@/actions/language.action'
import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import UpdateLanguage from './_components/UpdateLanguage'

const EditLanguagePage = async ({ params: { id } }) => {
  const response = await getLanguageDetails(id)

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { language }
  } = response

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>{language?.name}</Typography>}
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
              href='/courses/languages'
              startIcon={<i className='ri-arrow-left-line'></i>}
              size='small'
            >
              Back
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <UpdateLanguage language={language} id={id} />
      </CardContent>
    </Card>
  )
}
export default EditLanguagePage
