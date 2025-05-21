'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, Stack } from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Input from '@components/common/form/Input'
import Select from '@components/common/form/Select'

import { createAppUser } from '@/actions/user.action'
import { populateValidationErrors } from '@/utils/common'

// Define the enums locally since they're not imported
const ProficiencyLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATED: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
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
    .required('Proficiency level is required')
})

const CreateUser = ({ session }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: null,
      nativeLanguage: '',
      learningGoal: '',
      proficiencyLevel: ProficiencyLevel.BEGINNER
    },
    resolver: yupResolver(createUserSchema)
  })

  const onSubmit = async data => {
    setLoading(true)

    try {
      const response = await createAppUser({
        ...data,
        updatedBy: session?.user?.id
      })

      if (response?.status === 'validationError') {
        populateValidationErrors(response?.errors, setError)
        toast.error('Please fix the validation errors')
      } else if (response?.status === 'success') {
        router.replace('/user')
        toast.success(response.message) // Use the message from response
      } else {
        toast.error(response?.message || 'Failed to create user')
      }
    } catch (error) {
      toast.error(error?.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
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
          Create User
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default CreateUser
