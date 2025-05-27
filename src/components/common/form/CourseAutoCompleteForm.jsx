'use client'

import { useCallback, useEffect, useReducer, useRef } from 'react'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { debounce } from 'lodash'
import { Controller } from 'react-hook-form'
import { getAllCourses } from '../../../actions/course.server.action'

/**
 * initial state
 */
const initialState = {
  isLoading: true,
  page: 1,
  hasMore: true,
  search: '',
  courses: [],
  isError: false,
  error: null
}

/**
 * reducer function for useReducer hook
 * @param state
 * @param action
 * @returns
 */
function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload }
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_COURSES':
      return {
        ...state,
        courses: action.payload.reset ? action.payload.data : [...state.courses, ...action.payload.data]
      }
    case 'SET_ERROR':
      return { ...state, isError: true, error: action.payload }
    case 'RESET_ERROR':
      return { ...state, isError: false, error: null }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

const CourseAutoComplete = ({
  control,
  name,
  label = 'Select Course',
  placeholder = 'Start typing to search...',
  disabled = false,
  size = 'medium',
  error = false,
  helperText = '',
  defaultCourseName = ''
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const debouncedSearch = useRef(
    debounce((searchValue, fetchFunction) => {
      fetchFunction(1, searchValue)
    }, 500)
  )

  /**
   * load more results
   */
  const loadMoreResults = useCallback(async (currentPage, searchQuery = '') => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'RESET_ERROR' })

    try {
      const response = await getAllCourses(currentPage, 10, searchQuery)

      if (response?.items) {
        dispatch({
          type: 'SET_COURSES',
          payload: { data: response.items, reset: currentPage === 1 }
        })
        dispatch({ type: 'SET_HAS_MORE', payload: response.items.length > 0 })
        dispatch({ type: 'SET_PAGE', payload: currentPage })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  /**
   * initial fetch
   */
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      loadMoreResults(1)
    }, 500)

    if (defaultCourseName) {
      dispatch({ type: 'SET_SEARCH', payload: defaultCourseName })
      debouncedSearch.current(defaultCourseName, loadMoreResults)
    } else {
      debouncedFetch()
    }

    return () => {
      debouncedFetch.cancel()
    }
  }, [loadMoreResults, defaultCourseName])

  /**
   * scroll handler
   * @param event
   */
  const handleScroll = event => {
    const listBoxNode = event.currentTarget
    const scrollTop = listBoxNode.scrollTop
    const scrollHeight = listBoxNode.scrollHeight
    const clientHeight = listBoxNode.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - 5 && state.hasMore && !state.isLoading) {
      loadMoreResults(state.page + 1, state.search)
    }
  }

  /**
   * search handler
   * @param e
   */
  const handleSearch = e => {
    const { value } = e.target

    dispatch({ type: 'SET_SEARCH', payload: value })
    debouncedSearch.current(value, loadMoreResults)
  }

  /**
   * handle onchange autocomplete
   * @param field
   * @param event
   * @param newValue
   * @param reason
   */
  const handleOnChange = (field, event, newValue, reason) => {
    if (reason === 'clear') {
      field.onChange(null)
      dispatch({ type: 'SET_SEARCH', payload: '' })
      debouncedSearch.current('', loadMoreResults)
    } else if (reason === 'selectOption') {
      field.onChange(newValue?.id || null)
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          options={state.courses}
          autoHighlight
          loading={state.isLoading}
          disabled={disabled}
          value={state.courses.find(course => course.id === field.value) || null}
          onChange={(e, newValue, reason) => handleOnChange(field, e, newValue, reason)}
          getOptionLabel={option => option?.title || ''}
          isOptionEqualToValue={(option, newValue) => option?.id === newValue?.id}
          renderOption={(props, option) => (
            <li {...props} key={option?.id}>
              {option?.title}
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              size={size}
              label={label}
              placeholder={placeholder}
              error={error}
              helperText={helperText}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {state.isLoading ? <CircularProgress color='inherit' size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
                onChange: handleSearch
              }}
            />
          )}
          ListboxProps={{
            onScroll: handleScroll,
            style: { maxHeight: 300, overflowY: 'auto' }
          }}
        />
      )}
    />
  )
}

export default CourseAutoComplete
