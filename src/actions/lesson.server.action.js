'use server'
import { apiResponse, fetchData } from '@/utils/api'

export const getLessonDetails = async id => {
  try {
    const response = await fetchData(`admin/lessons/${id}`, {
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

export const deleteLesson = async (id, courseId, daysId) => {
  try {
    const response = await fetchData(`admin/lessons/${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    })

    return apiResponse(response, `/courses/${courseId}/days/${daysId}`, 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}
