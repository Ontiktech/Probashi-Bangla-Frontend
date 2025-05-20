import * as yup from 'yup'

export const difficulties = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const SUPPORTED_FORMATS = ['audio/mpeg']
const IMAGE_MAX_SIZE = 5 * 1024 * 1024

const baseSchema = {
  title: yup.string().required('Please enter a title!').max(255, 'Title must be less than 255 characters!'),
  estimatedMinutes: yup
    .number()
    .required('Please enter a estimated minutes!')
    .min(1, 'Estimated minutes must be greater than 0!'),
  difficulty: yup
    .string()
    .required('Please select a difficulty!')
    .oneOf(difficulties, 'Please select a valid difficulty!'),
  xpReward: yup.number().required('Please enter a xp reward!').min(1, 'Xp reward must be greater than 0!'),
  lessonOrder: yup.number().required('Please enter a lesson order!').min(1, 'Lesson order must be greater than 0!')
}

export const createLessonSchema = yup.object().shape({
  ...baseSchema,
  audioIntro: yup
    .mixed()
    .required('Please select an audio!')
    .test('fileType', 'Unsupported File Format. Supported formats: mp3', value => {
      if (!value) return true

      return value && SUPPORTED_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true

      return value && value.size <= IMAGE_MAX_SIZE
    })
})

export const updateLessonSchema = yup.object().shape({
  ...baseSchema,
  audioIntro: yup
    .mixed()
    .nullable()
    .test('fileType', 'Unsupported File Format. Supported formats: mp3', value => {
      if (!value) return true

      return value && SUPPORTED_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true

      return value && value.size <= IMAGE_MAX_SIZE
    })
})
