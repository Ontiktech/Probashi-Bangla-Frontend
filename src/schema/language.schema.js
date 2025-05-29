import * as yup from 'yup'

export const createLanguage = yup.object().shape({
  name: yup
    .string()
    .required('Language name is required')
    .min(2, 'Language name must be at least 2 characters')
    .max(50, 'Language name must be at most 50 characters')
})
