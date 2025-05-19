'use client'

import { apiResponse } from '@/utils/api'
import { clientApi } from '@/utils/clientApi'
import { getSession } from 'next-auth/react'

export const createNewCourse = async data => {
  const session = await getSession()

  const response = await clientApi.postFormData('admin/courses', data, {}, { Authorization: `${session?.token}` })

  console.log({ response })

  return apiResponse(
    {
      ...response,
      statusCode: response?.status
    },
    `/courses`,
    'path'
  )
}
