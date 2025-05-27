import * as yup from 'yup'

export const createUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z]*$/, 'First name must contain only letters with no spaces!'),
  lastName: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z]*$/, 'Last name must contain only letters with no spaces!'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').nullable()
})

export const assignCourseSchema = yup.object().shape({
  courses: yup
    .array()
    .of(
      yup.object().shape({
        courseId: yup.string().required('Course is required')
      })
    )
    .min(1, 'Please select at least one course!')
    .test('unique-course-ids', 'Duplicate course selected', function (courses) {
      if (!courses) return true
      const idCount = new Map()
      const path = this.path

      courses.forEach((course, index) => {
        const id = course?.courseId

        if (id) {
          idCount.set(id, (idCount.get(id) || []).concat(index))
        }
      })

      const duplicates = Array.from(idCount.entries()).filter(([, indexes]) => indexes.length > 1)

      if (duplicates.length > 0) {
        const errors = duplicates.flatMap(([, indexes]) =>
          indexes.map(i =>
            this.createError({
              path: `${path}[${i}].courseId`,
              message: 'Duplicate course selected!'
            })
          )
        )

        throw new yup.ValidationError(errors)
      }

      return true
    })
})
