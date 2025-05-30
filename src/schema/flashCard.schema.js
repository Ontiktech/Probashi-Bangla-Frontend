import * as yup from 'yup'

const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
const SUPPORTED_AUDIO_FORMATS = ['audio/mpeg']
const IMAGE_MAX_SIZE = 5 * 1024 * 1024
const AUDIO_SIZE = 1024 * 1024
const baseSchema = {
  frontText: yup
    .string()
    .required('Please enter a front text!')
    .max(255, 'Front text must be less than 255 characters!'),
  frontSubtext: yup
    .string()
    .required('Please enter a front subtext!')
    .max(255, 'Front subtext must be less than 255 characters!'),
  backText: yup.string().required('Please enter a back text!').max(255, 'Back text must be less than 255 characters!'),
  backSubtext: yup
    .string()
    .required('Please enter a back subtext!')
    .max(255, 'Back subtext must be less than 255 characters!'),
  example: yup.string().required('Please enter an example!').max(255, 'Example must be less than 255 characters!'),
  exampleTranslation: yup
    .string()
    .required('Please enter an example translation!')
    .max(5000, 'Example translation must be less than 5000 characters!'),
  usageNotes: yup
    .string()
    .required('Please enter usage notes!')
    .max(5000, 'Usage notes must be less than 5000 characters!'),
  cardOrder: yup.number().required('Please enter a card order!').min(1, 'Card order must be greater than 0!')
}

export const createFlashCardSchema = yup.object().shape({
  ...baseSchema,
  imageUrl: yup
    .mixed()
    .required('Please select an image!')
    .test('fileType', 'Unsupported File Format. Supported formats: jpg, jpeg, png', value => {
      if (!value) return true

      return value && SUPPORTED_IMAGE_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true

      return value && value.size <= IMAGE_MAX_SIZE
    }),
  audioUrl: yup
    .mixed()
    .required('Please select an audio!')
    .test('fileType', 'Unsupported File Format. Supported formats: mp3', value => {
      if (!value) return true

      return value && SUPPORTED_AUDIO_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true

      return value && value.size <= IMAGE_MAX_SIZE
    })
})

export const updateFlashCardSchema = yup.object().shape({
  ...baseSchema,
  imageUrl: yup
    .mixed()
    .nullable()
    .test('fileType', 'Unsupported File Format. Supported formats: jpg, jpeg, png', value => {
      if (!value) return true

      return value && SUPPORTED_IMAGE_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true

      return value && value.size <= IMAGE_MAX_SIZE
    }),
  audioUrl: yup
    .mixed()
    .nullable()
    .test('fileType', 'Unsupported File Format. Supported formats: mp3', value => {
      if (!value) return true

      return value && SUPPORTED_AUDIO_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true

      return value && value.size <= AUDIO_SIZE
    })
})
