'use server'
import { authOptions } from '@/app/libs/auth'
import { getServerSession } from 'next-auth'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Extend fetch function
 * @param url - The API endpoint to fetch
 * @param options - Optional fetch options
 * @returns FetchResponse
 */
export const fetchData = async (url, options = {}) => {
  try {
    /**
     * Define fetch options
     */
    let fetchOpt = {
      ...options
    }

    /**
     * Get current session
     */
    const session = await getServerSession(authOptions)

    /**
     * Check if session is not null
     */
    if (session) {
      fetchOpt = {
        ...fetchOpt,
        headers: {
          ...fetchOpt.headers,
          Authorization: `Bearer ${session?.token}`
        }
      }
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

    const apiUrl = process.env.API_URL

    if (!apiUrl) {
      throw new Error('API URL is not defined in environment variables.')
    }

   
    const response = await fetch(`${apiUrl}/${url}`, fetchOpt)

    const data = await response.json()

    return { statusCode: response.status, ...data }
  } catch (error) {
    throw error
  }
}

/**
 * Handle API response
 * @param {Object} response - API response object
 * @returns {Object} - An object with the status, message and data
 * @throws {Error} - If the response status code is not 201 or 422
 */
export const apiResponse = async (response, str = null, type = 'tag') => {
  if (response?.statusCode === 201 || response?.statusCode === 200) {
    if (str && type === 'tag') {
      revalidateTag(str)
    } else if (str && type === 'path') {
      revalidatePath(str)
    }

    return {
      ...response,
      status: 'success',
      message: response?.data?.data?.message
    }
  } else if (response?.statusCode === 422) {
    return { status: 'validationError', errors: response?.error?.errors }
  } else if (response?.statusCode === 404) {
    return { status: 'notFound', message: response?.error?.message }
  } else {
    return { status: 'error', message: response?.error?.message }
  }
}
