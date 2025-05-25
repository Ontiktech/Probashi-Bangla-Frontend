'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Grid, Stack } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Input from '@components/common/form/Input'

import { updateAppUser } from '@/actions/user.action'
import { createUserSchema } from '@/schema/user.schema'
import { populateValidationErrors } from '@/utils/common'
import { useSession } from 'next-auth/react'

const EditUser = ({ userId, user }) => {
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phoneNumber,
    email: user?.email || null
  }
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(createUserSchema)
  })

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
      } else if (response?.status === 'success') {
        toast.success(response.message)
      } else {
        throw new Error(response?.message || 'Failed to update user')
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
