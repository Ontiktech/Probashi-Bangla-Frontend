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
