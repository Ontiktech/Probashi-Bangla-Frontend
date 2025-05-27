'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, Stack } from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Input from '@components/common/form/Input'

import { createAppUser } from '@/actions/user.action'
import { createUserSchema } from '@/schema/user.schema'
import { populateValidationErrors } from '@/utils/common'

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
      email: ''
    },
    mode: 'onBlur',
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
      } else if (response?.status === 'success') {
        router.replace('/user')
        toast.success(response.message) // Use the message from response
      } else {
        throw new Error(response?.message || 'Failed to create user')
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
        {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}
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
