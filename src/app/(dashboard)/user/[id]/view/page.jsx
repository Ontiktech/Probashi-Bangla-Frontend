import { getAppUserById } from '@/actions/user.action'
import { Avatar, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AssignCourse from './_components/AssignCourse'

const UserViewPage = async ({ params: { id } }) => {
  const response = await getAppUserById(id)

  if (response === 'notFound') {
    notFound()
  }

  const {
    data: { user }
  } = response

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6'>
            {user?.firstName} {user?.lastName}
          </Typography>
        }
        subheader='View and manage user details.'
        avatar={<i className='ri-add-box-fill' style={{ fontSize: '3rem' }}></i>}
        action={
          <Button
            variant='outlined'
            startIcon={<i className='ri-arrow-left-line'></i>}
            component={Link}
            href='/user'
            size='small'
          >
            Back
          </Button>
        }
      />
      <CardContent>
        <Stack direction='column' spacing={2} justifyContent='center' alignItems='center'>
          <Avatar sx={{ width: 200, height: 200 }}>
            <Image
              src={user?.avatarUrl ?? '/images/avatars/1.png'}
              alt={user?.firstName + ' ' + user?.lastName}
              width={200}
              height={200}
            />
          </Avatar>
          <Typography variant='h5'>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant='body2'>{user?.email}</Typography>
          <Typography variant='body2'>{user?.phoneNumber}</Typography>
        </Stack>
        <AssignCourse userId={id} courses={user?.courses} />
      </CardContent>
    </Card>
  )
}
export default UserViewPage
