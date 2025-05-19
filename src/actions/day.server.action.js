'use server'
import { apiResponse, fetchData } from '@/utils/api'

export const createNewDay = async data => {
  try {
    const response = await fetchData('admin/days', {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-store'
    })

    const populatedResponse = {
      statusCode: response?.statusCode,
      errors: response?.error?.errors,
      message: response?.error?.message || response?.data?.message || response?.message || 'An error occurred'
    }

    return apiResponse(populatedResponse, `/courses/${data?.courseId}/lesson/${data?.lessonId}`, 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}

export const getDayDetails = async id => {
  try {
    const response = await fetchData(`admin/days/${id}`, {
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
