'use client'
import Input from '@/components/common/form/Input'
import Select from '@/components/common/form/Select'
import SingleImageUploader from '@/components/common/form/SingleImageUploader'
import { difficulties } from '@/schema/course.schema'
import { createLessonSchema } from '@/schema/lesson.schema'
import { toCapitalize } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateLesson = () => {
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      estimatedMinutes: 0,
      difficulty: '',
      lessonOrder: 0,
      audioIntro: null
    },
    mode: 'onBlur',
    resolver: yupResolver(createLessonSchema)
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
            label='Estimated Minutes'
            control={control}
            errors={!!errors.estimatedMinutes}
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
            errors={!!errors.lessonOrder}
            name='lessonOrder'
            label='Lesson Order'
            error={!!errors.lessonOrder}
            helperText={errors.lessonOrder?.message}
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
export default CreateLesson
