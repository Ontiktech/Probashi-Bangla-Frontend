'use client'
import Input from '@/components/common/form/Input'
import Select from '@/components/common/form/Select'
import SingleImageUploader from '@/components/common/form/SingleImageUploader'
import { courseSchema, difficulties, languages } from '@/schema/course.schema'
import { toCapitalize } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateNewCourse = () => {
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
          <SingleImageUploader
            setValue={setValue}
            errors={errors}
            watch={watch}
            control={control}
            name='imagePath'
            error={!!errors.imagePath}
            helperText={errors.imagePath?.message}
            defaultMessage='Only .jpg, .jpeg and .png files are allowed'
            disabled={loading}
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <Select
            name='language'
            control={control}
            error={!!errors?.language}
            helperText={errors?.language?.message || ''}
            label='Language'
            data={[
              { text: 'None', value: '' },
              ...languages.map(language => ({
                text: toCapitalize(language),
                value: language
              }))
            ]}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            name='targetLanguage'
            control={control}
            error={!!errors?.targetLanguage}
            helperText={errors?.targetLanguage?.message || ''}
            label='Target Language'
            data={[
              { text: 'None', value: '' },
              ...languages.map(language => ({
                text: toCapitalize(language),
                value: language
              }))
            ]}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            name='difficulty'
            control={control}
            error={!!errors?.difficulty}
            helperText={errors?.difficulty?.message || ''}
            label='Difficulty'
            data={[
              { text: 'None', value: '' },
              ...difficulties.map(difficulty => ({
                text: toCapitalize(difficulty),
                value: difficulty
              }))
            ]}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Estimated Hours'
            control={control}
            errors={!!errors.estimatedHours}
            name='estimatedHours'
            error={!!errors.estimatedHours}
            helperText={errors.estimatedHours?.message}
            disabled={loading}
            type='number'
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
export default CreateNewCourse
