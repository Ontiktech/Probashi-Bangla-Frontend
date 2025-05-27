'use server'

const API_URL = process.env.API_URL

import { apiResponse, fetchData } from '../utils/api'

/**
 * Handles API responses consistently
 */
// const handleApiResponse = async response => {
//   const contentType = response.headers.get('content-type')
//   const isJson = contentType && contentType.includes('application/json')
//   const data = isJson ? await response.json() : await response.text()

//   if (!response.ok) {
//     const error = new Error(isJson ? data.message || 'Request failed' : data)
//     error.status = response.status
//     throw error
//   }

//   return data
// }

/**
 * Creates a new app user
 */
export const createAppUser = async userData => {
  try {
    const response = await fetchData(`admin/app-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      cache: 'no-store'
    })

    // Let apiResponse handle errors
    return apiResponse(response)
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to create user'
    }
  }
}

/**
 * Fetches all app users
 */

export const getAllAppUsers = async (page, limit, search, sortOrder = 'desc', sortBy = 'createdAt') => {
  try {
    let url = `admin/app-users?page=${page}&limit=${limit}&sort_order=${sortOrder}&sort_by=${sortBy}`

    if (search) url += `&search=${search}`

    const response = await fetchData(url, {
      method: 'GET'
    })

    if (response?.statusCode === 200) {
      return {
        status: 'success',
        items: response?.data?.users
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
 * Gets a single app user by ID
 */
export const getAppUserById = async userId => {
  try {
    const response = await fetchData(`admin/app-users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    return apiResponse(response)
  } catch (error) {
    throw error
  }
}

/**
 * Updates an app user
 */
export const updateAppUser = async (data, id) => {
  try {
    const response = await fetchData(`admin/app-users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      cache: 'no-store'
    })

    return apiResponse(response)
  } catch (error) {
    throw error
  }
}

/**
 * Deletes an app user
 */
export const deleteAppUser = async userId => {
  try {
    const response = await fetchData(`admin/app-users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    return apiResponse(response, '/users', 'path')
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error'
    }
  }
}

export const assignUserToCourse = async data => {
  try {
    const response = await fetchData(`admin/app-users/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      cache: 'no-store'
    })
    console.log({ response })
    return apiResponse(response)
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error'
    }
  }
}
