import * as yup from 'yup'
export const daySchema = yup.object().shape({
  dayNumber: yup.number().required('Please enter a day number!').min(1, 'Day number must be greater than 0!'),
  title: yup.string().required('Please enter a title!').max(255, 'Title must be less than 255 characters!'),
  description: yup
    .string()
    .required('Please enter a description!')
    .max(5000, 'Description must be less than 5000 characters!')
})
