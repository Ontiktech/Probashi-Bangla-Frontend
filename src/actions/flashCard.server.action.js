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
