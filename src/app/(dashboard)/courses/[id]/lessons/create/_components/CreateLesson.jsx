'use client'
import { createNewLesson } from '@/actions/lesson.client.action'
import Input from '@/components/common/form/Input'
import Select from '@/components/common/form/Select'
import SingleImageUploader from '@/components/common/form/SingleImageUploader'
import { difficulties } from '@/schema/course.schema'
import { createLessonSchema } from '@/schema/lesson.schema'
import { populateValidationErrors, toCapitalize } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const CreateLesson = ({ courseId }) => {
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
      estimatedMinutes: 0,
      difficulty: '',
      lessonOrder: 0,
      audioIntro: null
    },
    mode: 'onBlur',
    resolver: yupResolver(createLessonSchema)
  })

  const onSubmit = async data => {
    setLoading(true)

    try {
      const response = await createNewLesson({ courseId, ...data })

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
          <SingleImageUploader
            setValue={setValue}
            errors={errors}
            watch={watch}
            control={control}
            name='audioIntro'
            error={!!errors.audioIntro}
            helperText={errors.audioIntro?.message}
            defaultMessage='Only .mp3 files are allowed'
            disabled={loading}
            formats={['.mp3']}
            dragActiveText='Drop the audio here...'
            dragInActiveText='Drag and drop an audio here or click to upload'
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Title'
            control={control}
            name='title'
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Description'
            control={control}
            name='description'
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={loading}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Estimated Minutes'
            control={control}
            name='estimatedMinutes'
            error={!!errors.estimatedMinutes}
            helperText={errors.estimatedMinutes?.message}
            disabled={loading}
            type='number'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
            control={control}
            name='lessonOrder'
            label='Lesson Order'
            error={!!errors.lessonOrder}
            helperText={errors.lessonOrder?.message}
            disabled={loading}
            type='number'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            control={control}
            name='xpReward'
            label='Xp Reward'
            error={!!errors.xpReward}
            helperText={errors.xpReward?.message}
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
export default CreateLesson
