'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/libs/auth'

/**
 * Extended fetch function with authentication
 * @param {string} url - The API endpoint to fetch
 * @param {object} options - Optional fetch options
 * @returns {Promise<object>} - Fetch response with status code and data
 */
export const fetchData = async (url, options = {}) => {
  console.log('Starting fetchData with:', { url, options })

  try {
    let fetchOpt = { ...options }
    console.log('Initial fetch options:', fetchOpt)

    const session = await getServerSession(authOptions)
    console.log('Session data:', session)

    if (session) {
      fetchOpt = {
        ...fetchOpt,
        headers: {
          ...fetchOpt.headers,
          Authorization: `Bearer ${session?.token}`
        }
      }
      console.log('Updated fetch options with auth:', fetchOpt)
    }

    fetchOpt = {
      ...fetchOpt,
      headers: {
        ...fetchOpt.headers,
        'Content-Type': 'application/json',
        Origin: process.env.BASE_URL || ''
      },
      credentials: 'include'
    }
    console.log('Final fetch options:', fetchOpt)

 
    console.log('Full API URL:', `${url}`)

    const response = await fetch(`${url}`, fetchOpt)
    console.log('Response status:', response.status)
    console.log('Response', response);

    const data = await response.json()
    console.log('Response data:', data)

    return {
      status: response.status,
      statusCode: response.status,
      ...data
    }
  } catch (error) {
    console.error('Full fetch error:', error)
    throw error
  }
}

/**
 * Helper function to handle API responses
 */
export const apiResponse = (response, path = null, type = null) => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    if (path && type === 'path') {
      revalidatePath(path)
    } else if (path && type === 'tag') {
      revalidateTag(path)
    }
    return response
  }

  if (response.statusCode === 422) {
    return {
      status: 'validationError',
      errors: response.errors || {},
      message: response.message || 'Validation failed'
    }
  }

  return {
    status: 'error',
    message: response.message || 'Request failed'
  }
}
