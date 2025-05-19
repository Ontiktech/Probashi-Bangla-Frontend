'use client'
import Input from '@/components/common/form/Input'
import SingleImageUploader from '@/components/common/form/SingleImageUploader'
import { createFlashCardSchema } from '@/schema/flashCard.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateFlashCard = () => {
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      frontText: '',
      frontSubtext: '',
      backText: '',
      backSubtext: '',
      example: '',
      exampleTranslation: '',
      usageNotes: '',
      cardOrder: 0,
      imageUrl: null,
      audioUrl: null
    },
    mode: 'onBlur',
    resolver: yupResolver(createFlashCardSchema)
  })

  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <SingleImageUploader
            setValue={setValue}
            errors={errors}
            watch={watch}
            control={control}
            name='imageUrl'
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
            defaultMessage='Only .jpg, .jpeg and .png files are allowed'
            disabled={loading}
            formats={['.mp3']}
            dragActiveText='Drop the image here...'
            dragInActiveText='Drag and drop an image here or click to upload'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SingleImageUploader
            setValue={setValue}
            errors={errors}
            watch={watch}
            control={control}
            name='audioUrl'
            error={!!errors.audioUrl}
            helperText={errors.audioUrl?.message}
            defaultMessage='Only .mp3 files are allowed'
            disabled={loading}
            formats={['.mp3']}
            dragActiveText='Drop the audio here...'
            dragInActiveText='Drag and drop an audio here or click to upload'
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Front Text'
            control={control}
            errors={!!errors.frontText}
            name='frontText'
            error={!!errors.frontText}
            helperText={errors.frontText?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Front Subtext'
            control={control}
            errors={!!errors.frontSubtext}
            name='frontSubtext'
            error={!!errors.frontSubtext}
            helperText={errors.frontSubtext?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Back Text'
            control={control}
            errors={!!errors.backText}
            name='backText'
            error={!!errors.backText}
            helperText={errors.backText?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Back Subtext'
            control={control}
            errors={!!errors.backSubtext}
            name='backSubtext'
            error={!!errors.backSubtext}
            helperText={errors.backSubtext?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Example'
            control={control}
            errors={!!errors.example}
            name='example'
            error={!!errors.example}
            helperText={errors.example?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Example Translation'
            control={control}
            errors={!!errors.exampleTranslation}
            name='exampleTranslation'
            error={!!errors.exampleTranslation}
            helperText={errors.exampleTranslation?.message}
            disabled={loading}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Usage Notes'
            control={control}
            errors={!!errors.usageNotes}
            name='usageNotes'
            error={!!errors.usageNotes}
            helperText={errors.usageNotes?.message}
            disabled={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label='Card Order'
            control={control}
            errors={!!errors.cardOrder}
            name='cardOrder'
            error={!!errors.cardOrder}
            helperText={errors.cardOrder?.message}
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
export default CreateFlashCard
