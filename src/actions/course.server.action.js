'use server'

import { apiResponse, fetchData } from '@/utils/api'

/**
 * Get all courses with pagination and search
 * @param {number} page - The page number to retrieve
 * @param {number} limit - The number of items per page
 * @param {string} [search] - The search query
 * @param {string} [sortOrder=desc] - The sort order
 * @param {string} [sortBy=createdAt] - The field to sort by
 * @returns {Promise<{status: 'success', items: Course[]}|{status: 'error', message: string}>}
 */
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

/**
 * get course details
 * @param {*} id
 * @returns
 */
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

/**
 * delete course
 * @param {*} id
 * @returns
 */
export const deleteCourse = async id => {
  try {
    const response = await fetchData(`admin/courses/${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    })

    return apiResponse(response, '/course', 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}
