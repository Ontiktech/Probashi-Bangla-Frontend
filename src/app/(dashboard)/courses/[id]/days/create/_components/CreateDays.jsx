'use client'
import Input from '@/components/common/form/Input'
import { courseSchema } from '@/schema/course.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateDays = () => {
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      totalDays: 0,
      language: '',
      targetLanguage: '',
      difficulty: '',
      estimatedHours: 0,
      imagePath: null
    },
    mode: 'onBlur',
    resolver: yupResolver(courseSchema)
  })

  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Input
            label='Total Days'
            control={control}
            errors={!!errors.totalDays}
            name='totalDays'
            error={!!errors.totalDays}
            helperText={errors.totalDays?.message}
            disabled={loading}
            type='number'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            control={control}
            errors={!!errors.title}
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
            errors={!!errors.description}
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
          <Button type='submit' variant='contained' startIcon={<i className='ri-save-fill'></i>}>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
export default CreateDays
