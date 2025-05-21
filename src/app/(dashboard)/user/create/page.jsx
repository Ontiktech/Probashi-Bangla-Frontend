import Link from 'next/link'
import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import CreateUser from './_components/CreateUser'

const CreateUserPage = () => {
  return (
    <Box>
      <Typography variant='h3' color='primary' fontWeight={700}>
        Create New User
      </Typography>
      <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 10 }}>
        <Link color='inherit' href='/'>
          Home
        </Link>
        <Link color='inherit' href='/users'>
          Users
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Create New</Typography>
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
          <CreateUser />
        </CardContent>
      </Card>
    </Box>
  )
}

export default CreateUserPage
