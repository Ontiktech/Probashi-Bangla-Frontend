'use client'

import { apiResponse } from '@/utils/api'
import { clientApi } from '@/utils/clientApi'
import { getSession } from 'next-auth/react'

export const createNewCourse = async data => {
  const session = await getSession()

  const response = await clientApi.postFormData('admin/courses', data, {}, { Authorization: `${session?.token}` })

  return apiResponse(
    {
      ...response,
      statusCode: response?.status
    },
    `/courses`,
    'path'
  )
}

export const updateCourse = async (data, courseId) => {
  const session = await getSession()

  const response = await clientApi.patchFormData(
    `admin/courses/${courseId}`,
    data,
    {},
    { Authorization: `${session?.token}` }
  )

  return apiResponse(
    {
      ...response,
      statusCode: response?.status
    },
    `/courses/${courseId}`,
    'path'
  )
}
