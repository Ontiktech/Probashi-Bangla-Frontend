'use client'
import { createNewLanguage } from '@/actions/language.action'
import Input from '@/components/common/form/Input'
import { createLanguage } from '@/schema/language.schema'
import { populateValidationErrors } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const CreateLanguage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm({
    defaultValues: {
      name: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(createLanguage)
  })

  const onSubmit = async data => {
    setLoading(true)

    try {
      const response = await createNewLanguage(data)

      if (response?.status === 'validationError') {
        populateValidationErrors(response?.errors, setError)
      } else if (response?.status === 'success') {
        router.push('/courses/languages')
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Input
            control={control}
            name='name'
            label='Name'
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={loading}
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
export default CreateLanguage
