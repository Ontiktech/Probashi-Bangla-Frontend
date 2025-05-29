'use server'

import { apiResponse, fetchData } from '@/utils/api'

export const getAllLanguages = async (page, limit, search, sortOrder = 'desc', sortBy = 'createdAt') => {
  try {
    let url = `admin/languages?page=${page}&limit=${limit}&sortOrder=${sortOrder}&sortBy=${sortBy}`

    if (search) url += `&search=${search}`

    const response = await fetchData(url, {
      method: 'GET'
    })

    if (response?.statusCode === 200) {
      return {
        status: 'success',
        items: response?.data?.languages?.records ?? [],
        totalItems: response?.data?.languages?.totalCount ?? 0
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

export const createNewLanguage = async data => {
  try {
    const response = await fetchData('admin/languages', {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-store'
    })

    return apiResponse(response, '/courses/languages', 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}

export const updateLanguage = async (data, id) => {
  try {
    const response = await fetchData(`admin/languages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      cache: 'no-store'
    })

    return apiResponse(response, '/courses/languages', 'path')
  } catch (error) {
    return {
      status: 'error',
      message: error?.message
    }
  }
}

export const getLanguageDetails = async id => {
  try {
    const response = await fetchData(`admin/languages/${id}`, {
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

export const deleteLanguage = async id => {
  try {
    const response = await fetchData(`admin/languages/${id}`, {
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
