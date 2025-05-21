'use server'

import { apiResponse, fetchData } from '@/utils/api'

export const getFlashCardDetails = async id => {
  try {
    const response = await fetchData(`admin/flash-cards/${id}`, {
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

export const deleteFlashCard = async (id, courseId, lessonId, dayId) => {
  try {
    const response = await fetchData(`admin/flash-cards/${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    })

    return apiResponse(response, `/courses/${courseId}/lesson/${lessonId}/days/${dayId}`, 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}
