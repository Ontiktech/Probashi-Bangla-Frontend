'use client'
import { assignUserToCourse } from '@/actions/user.action'
import CourseAutoComplete from '@/components/common/form/CourseAutoCompleteForm'
import { assignCourseSchema } from '@/schema/user.schema'
import { populateValidationErrors } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const AssignCourse = ({ userId, courses }) => {
  const [loading, setLoading] = useState(false)

  const defaultValues =
    courses?.length > 0
      ? {
          courses: courses?.map(course => ({
            courseId: course?.id
          }))
        }
      : {
          courses: [
            {
              courseId: ''
            }
          ]
        }

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm({
    defaultValues,
    resolver: yupResolver(assignCourseSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
    keyName: 'id'
  })

  const onSubmit = async data => {
    setLoading(true)
    try {
      const courseIds = data?.courses?.map(course => course?.courseId)
      const response = await assignUserToCourse({
        appUserId: userId,
        courseIds
      })
      if (response?.status === 'validationError') {
        populateValidationErrors(response?.errors, setError)
      } else if (response?.status === 'success') {
        toast.success(response?.message)
      } else {
        throw new Error(response?.message)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to assign course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((field, index) => (
              <TableRow key={field?.id}>
                <TableCell>
                  <CourseAutoComplete
                    control={control}
                    name={`courses.${index}.courseId`}
                    disabled={loading}
                    error={!!errors?.courses?.[index]?.courseId}
                    helperText={errors?.courses?.[index]?.courseId?.message}
                    defaultCourseName={courses?.find(course => course?.id === field?.courseId)?.title ?? ''}
                  />
                </TableCell>
                <TableCell align='center'>
                  {index !== fields?.length - 1 ? (
                    <Button variant='outlined' color='error' onClick={() => remove(index)} disabled={loading}>
                      <i className='ri-delete-bin-7-fill'></i>
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() =>
                        append({
                          courseId: ''
                        })
                      }
                      disabled={loading}
                    >
                      <i className='ri-add-line'></i>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack justifyContent='end' direction='row' alignItems='center' sx={{ mt: 3 }}>
        <Button
          type='submit'
          variant='contained'
          startIcon={loading ? <CircularProgress size={20} color='inherit' /> : <i className='ri-save-fill'></i>}
        >
          Save
        </Button>
      </Stack>
    </form>
  )
}
export default AssignCourse
