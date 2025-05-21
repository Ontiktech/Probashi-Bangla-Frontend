import { getCurrentUser } from '@/actions/updateProfile.action'
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { notFound } from 'next/navigation'
import UpdateProfile from './_components/UpdateProfile'

const page = async () => {
  const response = await getCurrentUser()

  if (response?.status === 'notFound') {
    notFound()
  } else if (response?.status === 'error') {
    throw new Error(response?.message)
  }

  const {
    data: { user }
  } = response

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>User Profile</Typography>}
        subheader='Course catalog showcasing topics, durations, and enrollments.'
        avatar={
          <Avatar>
            <i className='ri-book-line'></i>
          </Avatar>
        }
      />
      <CardContent>
        <UpdateProfile user={user} />
      </CardContent>
    </Card>
  )
}
export default page
