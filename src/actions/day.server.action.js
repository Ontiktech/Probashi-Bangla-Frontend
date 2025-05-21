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

    return apiResponse(populatedResponse, `/courses/${data?.courseId}`, 'path')
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

export const deleteDay = async (id, courseId) => {
  try {
    const response = await fetchData(`admin/days/${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    })

    return apiResponse(response, `/courses/${courseId}`, 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}

export const updateDay = async (data, courseId) => {
  try {
    const response = await fetchData(`admin/days/${data?.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      cache: 'no-store'
    })

    return apiResponse(response, `/courses/${courseId}/days/${data?.id}`, 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}
