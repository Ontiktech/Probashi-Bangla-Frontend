'use client'
import { apiResponse } from '@/utils/api'
import { clientApi } from '@/utils/clientApi'
import { getSession } from 'next-auth/react'

export const createNewLesson = async data => {
  const session = await getSession()

  const response = await clientApi.postFormData('admin/lessons', data, {}, { Authorization: `${session?.token}` })

  return apiResponse(
    {
      ...response,
      statusCode: response?.status
    },
    `/courses/${data?.id}`,
    'path'
  )
}
