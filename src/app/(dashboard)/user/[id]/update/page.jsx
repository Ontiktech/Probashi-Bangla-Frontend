import { getAppUserById } from '@/actions/user.action'
import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EditUser from './_components/EditUser'

const EditUserPage = async ({ params: { id } }) => {
  const response = await getAppUserById(id)

  if (response === 'notFound') {
    notFound()
  }

  const {
    data: { user }
  } = response
  return (
    <Box>
      <Typography variant='h3' color='primary' fontWeight={700}>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 10 }}>
        <Link color='inherit' href='/'>
          Home
        </Link>
        <Link color='inherit' href='/users'>
          Users
        </Link>
        <Typography sx={{ color: 'text.primary' }}>
          {user?.firstName} {user?.lastName}
        </Typography>
      </Breadcrumbs>
      <Card>
        <CardHeader
          title='Create User'
          subheader='Create a new user account with essential details.'
          avatar={<i className='ri-add-box-fill' style={{ fontSize: '3rem' }}></i>}
          action={
            <Button variant='outlined' startIcon={<i className='ri-arrow-left-line'></i>} component={Link} href='/user'>
              Back to Users
            </Button>
          }
        />
        <CardContent>
          <EditUser userId={id} user={user} />
        </CardContent>
      </Card>
    </Box>
  )
}

export default EditUserPage
