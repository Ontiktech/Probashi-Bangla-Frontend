import * as yup from 'yup'

export const languages = ['ENGLISH', 'BANGLA', 'FRENCH', 'SPANISH']
export const difficulties = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
const IMAGE_MAX_SIZE = 5 * 1024 * 1024

/**
 * base schema for create and update course
 */
const baseSchema = {
  title: yup.string().required('Please enter a title!').max(255, 'Title must be less than 255 characters!'),
  description: yup.string().nullable().max(5000, 'Description must be less than 5000 characters!'),
  totalDays: yup.number().required('Please enter a total days!').min(1, 'Total days must be greater than 0!'),
  language: yup.string().required('Please enter a language!').oneOf(languages, 'Please select a valid language!'),
  targetLanguage: yup
    .string()
    .required('Please enter a target language!')
    .oneOf(languages, 'Please select a valid language!')
    .test('not-same-as-language', 'Language and Target Language must be different!', function (value) {
      const { language } = this.parent
      return value !== language
    }),
  difficulty: yup
    .string()
    .required('Please enter a difficulty!')
    .oneOf(difficulties, 'Please select a valid difficulty!'),
  estimatedHours: yup
    .number()
    .required('Please enter a estimated hours!')
    .min(1, 'Estimated hours must be greater than 0!')
}

/**
 * create course schema
 */
export const createCourseSchema = yup.object().shape({
  ...baseSchema,
  imagePath: yup
    .mixed()
    .required('Please select an image!')
    .test('fileType', 'Unsupported File Format. Supported formats: jpg, jpeg, png', value => {
      if (!value) return true
      return SUPPORTED_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true
      return value.size <= IMAGE_MAX_SIZE
    })
})

/**
 * update course schema
 */
export const updateCourseSchema = yup.object().shape({
  ...baseSchema,
  imagePath: yup
    .mixed()
    .nullable()
    .test('fileType', 'Unsupported File Format. Supported formats: jpg, jpeg, png', value => {
      if (!value) return true
      return SUPPORTED_FORMATS.includes(value.type)
    })
    .test('fileSize', 'File size is too large. Max size: 5MB', value => {
      if (!value) return true
      return value.size <= IMAGE_MAX_SIZE
    })
})
