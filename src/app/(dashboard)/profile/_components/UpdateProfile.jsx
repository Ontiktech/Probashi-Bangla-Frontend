'use client'
import { updateProfile } from '@/actions/updateProfile.action'
import Input from '@/components/common/form/Input'
import { updateProfileSchema } from '@/schema/updateProfile.schema'
import { populateValidationErrors } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const UpdateProfile = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const { update } = useSession()

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    password: '',
    confirmPassword: ''
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(updateProfileSchema)
  })

  const onSubmit = async data => {
    setLoading(true)

    try {
      const response = await updateProfile(data)

      if (response?.status === 'validationError') {
        populateValidationErrors(response?.errors, setError)
      } else if (response?.status === 'success') {
        await update({
          firstName: data?.firstName,
          lastName: data?.lastName
        })
        toast.success(response?.message)
      } else {
        throw new Error(response?.message)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Input
            control={control}
            name='firstName'
            label='First Name'
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            control={control}
            name='lastName'
            label='Last Name'
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            control={control}
            name='password'
            label='Password'
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
            type='password'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            control={control}
            name='passwordConfirmation'
            label='Confirm Password'
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
            disabled={loading}
            type='password'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button
            type='submit'
            variant='contained'
            startIcon={loading ? <CircularProgress size={20} color='inherit' /> : <i className='ri-save-fill'></i>}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
export default UpdateProfile
