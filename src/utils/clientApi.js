'use client'
import axios from 'axios'
const postFormData = async (endpoint, data, params, headers) => {
  try {
    const response = await axios.postForm(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, data, {
      params,
      headers: {
        ...headers,
        Authorization: `Bearer ${headers?.Authorization}`
      }
    })

    console.log(response)

    return {
      status: response?.status,
      data: response?.data,
      message: response?.data?.data?.message
    }
  } catch (error) {
    return {
      message: error?.response?.data?.message || 'An error occurred',
      status: error?.response?.status || 500,
      errors: error?.response?.data?.error?.errors || null
    }
  }
}

const patchFormData = async (endpoint, data, params, headers) => {
  try {
    const response = await axios.patchForm(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, data, {
      params,
      headers: {
        ...headers,
        Authorization: `Bearer ${headers?.Authorization}`
      }
    })

    return {
      status: response?.status,
      data: response?.data,
      message: response?.data?.data?.message
    }
  } catch (error) {
    return {
      message: error?.response?.data?.error?.message || 'An error occurred',
      status: error?.response?.status || 500,
      errors: error?.response?.data?.error?.errors || null
    }
  }
}

export const clientApi = { postFormData, patchFormData }
