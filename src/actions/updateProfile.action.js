'use server'

import { authOptions } from '@/app/libs/auth'
import { apiResponse, fetchData } from '@/utils/api'
import { getServerSession } from 'next-auth'

export const updateProfile = async data => {
  try {
    const session = await getServerSession(authOptions)
    const response = await fetchData(`admin/admin-users/${session?.user?.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      cache: 'no-store'
    })

    return apiResponse(response, '/profile', 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions)
    const response = await fetchData(`admin/admin-users/${session?.user?.id}`, {
      method: 'GET'
    })

    return apiResponse(response)
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}
