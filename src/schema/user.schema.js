import * as yup from 'yup'
// Define the enums locally since they're not imported
// const ProficiencyLevel = {
//   BEGINNER: 'BEGINNER',
//   INTERMEDIATED: 'INTERMEDIATE',
//   ADVANCED: 'ADVANCED'
// }

export const createUserSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').nullable()
  //   nativeLanguage: yup.string().required('Native language is required'),
  //   learningGoal: yup.string().required('Learning goal is required')
  // proficiencyLevel: yup
  //   .string()
  //   .oneOf([ProficiencyLevel.BEGINNER, ProficiencyLevel.INTERMEDIATE, ProficiencyLevel.ADVANCED])
  //   .required('Proficiency level is required')
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
