'use server'

import { apiResponse, fetchData } from '@/utils/api'

export const getAllCourses = async (page, limit, search, sortOrder = 'desc', sortBy = 'createdAt') => {
  try {
    let url = `admin/courses?page=${page}&limit=${limit}&sort_order=${sortOrder}&sort_by=${sortBy}`

    if (search) url += `&search=${search}`

    const response = await fetchData(url, {
      method: 'GET'
    })

    if (response?.statusCode === 200) {
      return {
        status: 'success',
        items: response?.data?.courses
      }
    } else {
      throw new Error(response?.error?.message)
    }
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}

export const getCourseDetails = async id => {
  try {
    const response = await fetchData(`admin/courses/${id}`, {
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
