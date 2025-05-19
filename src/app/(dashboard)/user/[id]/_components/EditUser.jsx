'use client'

import { useState, useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { toast } from 'react-toastify'
import { useRouter } from 'next-nprogress-bar'
import * as yup from 'yup'

import { Box, CircularProgress } from '@mui/material'
import Input from '@components/common/form/Input'
import Select from '@components/common/form/Select'

import { getAppUserById, updateAppUser } from '@/actions/user.action'

// Define the enums locally since they're not imported
const ProficiencyLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
}

const AppUserVerificationStatus = {
  VERIFIED: 'VERIFIED',
  UNVERIFIED: 'UNVERIFIED',
  BANNED: 'BANNED'
}

const createUserSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').nullable(),
  nativeLanguage: yup.string().required('Native language is required'),
  learningGoal: yup.string().required('Learning goal is required'),
  proficiencyLevel: yup
    .string()
    .oneOf([ProficiencyLevel.BEGINNER, ProficiencyLevel.INTERMEDIATE, ProficiencyLevel.ADVANCED])
    .required('Proficiency level is required'),
  verified: yup
    .string()
    .oneOf([AppUserVerificationStatus.VERIFIED, AppUserVerificationStatus.UNVERIFIED, AppUserVerificationStatus.BANNED])
    .required('Status is required')
})

const EditUser = ({ session, userId }) => {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true) // New loading state for initial fetch
  const router = useRouter()

  const {
    control,
    handleSubmit,
    setError,
    reset, // Add reset from useForm
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: null,
      nativeLanguage: '',
      learningGoal: '',
      proficiencyLevel: ProficiencyLevel.BEGINNER,
      verified: AppUserVerificationStatus.UNVERIFIED
    },
    resolver: yupResolver(createUserSchema)
  })

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          toast.error('User ID is missing')
          return router.replace('/user')
        }

        const response = await getAppUserById(userId)
     

        if (response?.data?.user) {
          const userData = response.data.user
          reset({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            email: userData.email || null, // Handle potential undefined
            nativeLanguage: userData.nativeLanguage,
            learningGoal: userData.learningGoal,
            // Ensure these match the enum values exactly
            proficiencyLevel: userData.proficiencyLevel || ProficiencyLevel.BEGINNER,
            verified: userData.verified || AppUserVerificationStatus.UNVERIFIED
          })
        } else {
          throw new Error('User data not found in response')
        }
      } catch (error) {
        toast.error(error.message || 'Failed to load user data')
        router.replace('/user')
      } finally {
        setInitialLoading(false)
      }
    }

    fetchUserData()
  }, [userId, reset, router])

  const onSubmit = async data => {
    setLoading(true)
    try {
      const response = await updateAppUser(
        {
          ...data,
          updatedBy: session?.user?.id
        },
        userId
      )



      if (response?.status === 'validationError') {
        populateValidationErrors(response?.errors, setError)
        toast.error('Please fix the validation errors')
      } else if (response?.status === 200) {
        router.replace('/user')
        toast.success(response.message)
      } else {
    
        toast.error(response?.message || 'Failed to update user')
      }
    } catch (error) {
      toast.error(error?.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='200px'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Input
            name='firstName'
            control={control}
            error={!!errors?.firstName}
            helperText={errors?.firstName?.message}
            label='First Name'
            placeholder='John'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name='lastName'
            control={control}
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
            label='Last Name'
            placeholder='Doe'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name='phoneNumber'
            control={control}
            error={!!errors?.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            label='Phone Number'
            placeholder='+1234567890'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name='email'
            control={control}
            error={!!errors?.email}
            helperText={errors?.email?.message}
            label='Email (Optional)'
            placeholder='example@email.com'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name='nativeLanguage'
            control={control}
            error={!!errors?.nativeLanguage}
            helperText={errors?.nativeLanguage?.message}
            label='Native Language'
            placeholder='English'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name='learningGoal'
            control={control}
            error={!!errors?.learningGoal}
            helperText={errors?.learningGoal?.message}
            label='Learning Goal'
            placeholder='Improve conversational skills'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            control={control}
            name='proficiencyLevel'
            error={!!errors?.proficiencyLevel}
            helperText={errors?.proficiencyLevel?.message ?? ''}
            label='Proficiency Level'
            data={[
              { value: ProficiencyLevel.BEGINNER, text: 'Beginner' },
              { value: ProficiencyLevel.INTERMEDIATE, text: 'Intermediate' },
              { value: ProficiencyLevel.ADVANCED, text: 'Advanced' }
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            control={control}
            name='verified'
            error={!!errors?.verified}
            helperText={errors?.verified?.message ?? ''}
            label='Status'
            data={[
              { value: AppUserVerificationStatus.VERIFIED, text: 'Verified' },
              { value: AppUserVerificationStatus.UNVERIFIED, text: 'Unverified' },
              { value: AppUserVerificationStatus.BANNED, text: 'Banned' }
            ]}
          />
        </Grid>
      </Grid>
      <Stack direction='row' justifyContent='flex-end' alignItems='center'>
        <LoadingButton
          loading={loading}
          loadingPosition='start'
          startIcon={<i className='ri-save-fill'></i>}
          variant='contained'
          sx={{ mt: 4 }}
          type='submit'
        >
          Edit User
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default EditUser
