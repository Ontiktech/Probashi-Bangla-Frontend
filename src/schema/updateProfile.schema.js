import * as yup from 'yup'

export const updateProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter a first name!')
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters with no spaces!')
    .max(255, 'First name must be less than 255 characters!'),

  lastName: yup
    .string()
    .required('Please enter a last name!')
    .matches(/^[A-Za-z]+$/, 'Last name must contain only letters with no spaces!')
    .max(255, 'Last name must be less than 255 characters!'),

  password: yup
    .string()
    .nullable()
    .transform(value => (value === '' ? null : value))
    .min(8, 'Password must be at least 8 characters!')
    .optional(),

  passwordConfirmation: yup
    .string()
    .nullable()
    .transform(value => (value === '' ? null : value))
    .min(8, 'Password must be at least 8 characters!')
    .oneOf([yup.ref('password'), null], 'Password does not match!')
    .optional()
})
