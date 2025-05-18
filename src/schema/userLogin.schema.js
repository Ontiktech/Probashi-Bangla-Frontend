import * as yup from 'yup'

export const userLoginSchema = yup.object().shape({
  email: yup.string().required('Please enter an email!').email('Please enter a valid email!'),
  password: yup.string().required('Please enter a password!')
})
