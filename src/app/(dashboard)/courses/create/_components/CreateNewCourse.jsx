'use client'
import { createNewCourse } from '@/actions/course.client.action'
import Input from '@/components/common/form/Input'
import LanguageAutocompleteForm from '@/components/common/form/LanguageAutocompleteForm'
import Select from '@/components/common/form/Select'
import SingleImageUploader from '@/components/common/form/SingleImageUploader'
import { createCourseSchema, difficulties } from '@/schema/course.schema'
import { populateValidationErrors, toCapitalize } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const CreateNewCourse = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      totalDays: 0,
      languageId: '',
      targetLanguageId: '',
      difficulty: '',
      estimatedHours: 0,
      imagePath: null
    },
    mode: 'onBlur',
    resolver: yupResolver(createCourseSchema)
  })

  const onSubmit = async data => {
    setLoading(true)

    try {
      const response = await createNewCourse(data)

      if (response?.status === 'validationError') {
        populateValidationErrors(response?.errors, setError)
      } else if (response?.status === 'success') {
        router.push('/courses')
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
        <Grid item xs={12}>
          <Input
            control={control}
            name='totalDays'
            label='Total Days'
            error={!!errors.totalDays}
            helperText={errors.totalDays?.message}
            disabled={loading}
            type='number'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LanguageAutocompleteForm
            name='languageId'
            control={control}
            disabled={loading}
            error={!!errors?.languageId}
            helperText={errors.languageId?.message}
            label='Language'
            placeholder='Select language...'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LanguageAutocompleteForm
            name='targetLanguageId'
            control={control}
            disabled={loading}
            error={!!errors?.targetLanguageId}
            helperText={errors.targetLanguageId?.message}
            label='Target Language'
            placeholder='Select target language...'
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
        <Grid item xs={12} md={6}>
          <Input
            label='Estimated Hours'
            control={control}
            name='estimatedHours'
            error={!!errors.estimatedHours}
            helperText={errors.estimatedHours?.message}
            disabled={loading}
            type='number'
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
export default CreateNewCourse
