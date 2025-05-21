'use client'
import { createNewDay } from '@/actions/day.server.action'
import Input from '@/components/common/form/Input'
import { daySchema } from '@/schema/days.schema'
import { populateValidationErrors } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const CreateDays = ({ courseId }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm({
    defaultValues: {
      dayNumber: 0,
      title: '',
      description: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(daySchema)
  })

  const onSubmit = async data => {
    setLoading(true)

    try {
      const response = await createNewDay({ courseId, ...data })

      if (response?.status === 'validationError') {
        populateValidationErrors(response?.errors, setError)
      } else if (response?.status === 'success') {
        router.push(`/courses/${courseId}`)
        toast.success(response?.message)
      } else {
        throw new Error(response?.message)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create lesson')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Input
            label='Total Days'
            control={control}
            name='dayNumber'
            error={!!errors.dayNumber}
            helperText={errors.dayNumber?.message}
            disabled={loading}
            type='number'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            control={control}
            name='title'
            label='Title'
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            control={control}
            name='description'
            label='Description'
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={loading}
            multiline
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
export default CreateDays
