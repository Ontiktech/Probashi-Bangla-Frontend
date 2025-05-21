'use client'

import { apiResponse } from '@/utils/api'
import { clientApi } from '@/utils/clientApi'
import { getSession } from 'next-auth/react'

export const createNewFlashCard = async data => {
  const session = await getSession()

  const response = await clientApi.postFormData('admin/flash-cards', data, {}, { Authorization: `${session?.token}` })

  return apiResponse(
    {
      ...response,
      statusCode: response?.status
    },
    `/courses/${data?.id}/lesson/${data?.lessonId}/days/${data?.dayId}`,
    'path'
  )
}

export const updateFlashCard = async data => {
  const session = await getSession()

  const response = await clientApi.patchFormData(
    `admin/flash-cards/${data?.id}`,
    data,
    {},
    { Authorization: `${session?.token}` }
  )

  return apiResponse(
    {
      ...response,
      statusCode: response?.status
    },
    `/courses/${data?.id}/lesson/${data?.lessonId}/days/${data?.dayId}`,
    'path'
  )
}
