import { Avatar, Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import Link from 'next/link'
import UserListsTable from './_components/UserListTable'

const UsersPage = () => {
  return (
    <Box>
      <Typography variant='h3' color='primary' fontWeight={700}>
        Manage Users
      </Typography>
      <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 10 }}>
        <Link color='inherit' href='/'>
          Home
        </Link>
        <Typography sx={{ color: 'text.primary' }}>User Lists</Typography>
      </Breadcrumbs>
      <Card>
        <CardHeader
          title='Users'
          subheader='Display sorted, searchable, paginated user lists efficiently.'
          avatar={
            <Avatar>
              <i className='ri-group-line'></i>
            </Avatar>
          }
          action={
            <Button
              component={Link}
              href='/user/create'
              variant='contained'
              startIcon={<i className='ri-add-line'></i>}
            >
              Create New
            </Button>
          }
        />
        <CardContent>
          <UserListsTable />
        </CardContent>
      </Card>
    </Box>
  )
}

export default UsersPage
