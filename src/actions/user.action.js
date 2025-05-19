'use server'

const API_URL = process.env.API_URL

import { fetchData, apiResponse } from '../utils/api'

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
    const response = await fetchData(`${API_URL}/admin/app-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      cache: 'no-store'
    })

    // Standardize the success response
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return {
        status: 'success',
        data: response.data,
        message: response.data?.message || 'User created successfully'
      }
    }

    // Let apiResponse handle errors
    return apiResponse(response)
  } catch (error) {
    console.error('Create user error:', error)
    return {
      status: 'error',
      message: error.message || 'Failed to create user'
    }
  }
}

/**
 * Fetches all app users
 */

export const getAllAppUsers = async () => {
  try {
    const response = await fetchData(`${API_URL}/admin/app-users`)

    if (response?.status !== 200) {
      throw new Error(response.data?.message || 'Failed to fetch users')
    }

    return response.data?.users || []
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
/**
 * Gets a single app user by ID
 */
export const getAppUserById = async userId => {
  try {
    const response = await fetchData(`${API_URL}/admin/app-users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    console.log('Response', response)

    return apiResponse(response)
  } catch (error) {
    console.error('Get user error:', error)
    throw error
  }
}

/**
 * Updates an app user
 */
export const updateAppUser = async (data, id) => {
  try {
    const response = await fetchData(`${API_URL}/admin/app-users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      cache: 'no-store'
    })

    return apiResponse(response)
  } catch (error) {
    console.error('Update user error:', error)
    throw error
  }
}

/**
 * Deletes an app user
 */
export const deleteAppUser = async userId => {
  try {
    const response = await fetchData(`${API_URL}/admin/app-users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    return apiResponse(response);
  } catch (error) {
    console.error('Delete user error:', error)
    return {
      success: false,
      message: error.message || 'Network error'
    }
  }
}
