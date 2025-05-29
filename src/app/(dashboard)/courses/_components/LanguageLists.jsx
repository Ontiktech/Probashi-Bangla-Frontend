'use client'

import CustomTableBody from '@/components/common/CustomTableBody'
import CustomTableHeader from '@/components/common/CustomTableHeader'
import Modal from '@/components/common/Modal'
import {
  Avatar,
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Typography
} from '@mui/material'
import Image from 'next/image'
import ActionDropdown from './ActionDropdown'
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { debounce } from 'lodash'
import { getAllCourses } from '@/actions/course.server.action'
import { toCapitalize } from '@/utils/common'
import LanguageActionDropdown from './LanguageActionDropdown'

/**
 * set initial state
 */
const initialState = {
  openDelete: false,
  deleteLoading: false,
  selectedDeleteId: null,
  search: '',
  page: 1,
  limit: 10,
  loading: true,
  totalCourses: 0,
  courses: [],
  isError: false,
  error: null,
  sortOrder: 'desc',
  sortBy: 'createdAt'
}

/**
 * initialize column helper for react table
 */
const columnHelper = createColumnHelper()

/**
 * reducer function
 * @param state
 * @param action
 * @returns
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_LIMIT':
      return { ...state, limit: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action?.payload }
    case 'SET_TOTAL_COURSES':
      return { ...state, totalCourses: action.payload }
    case 'SET_COURSES':
      return { ...state, courses: action.payload }
    case 'SET_ERROR':
      return { ...state, isError: true, error: action.payload }
    case 'RESET_ERROR':
      return { ...state, isError: false, error: null }
    case 'TOGGLE_DELETE':
      return { ...state, openDelete: !state?.openDelete }
    case 'TOGGLE_DELETE_LOADING':
      return { ...state, deleteLoading: !state?.deleteLoading }
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder }
    case 'SET_DELETE_LOADING':
      return { ...state, deleteLoading: action.payload }
    case 'SET_SELECTED_DELETE_ID':
      return { ...state, selectedDeleteId: action.payload }
    default:
      return state
  }
}

export default function LanguageLists() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    page,
    limit,
    loading,
    totalCourses,
    courses,
    isError,
    search,
    error,
    sortOrder,
    sortBy,
    selectedDeleteId,
    openDelete,
    deleteLoading
  } = state

  /**
   * fetch courses function
   */
  const fetchCourses = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'RESET_ERROR' })

    try {
      const response = await getAllCourses(page, limit, search, sortOrder, sortBy)

      if (response?.status === 'success' && response?.items?.length > 0) {
        dispatch({ type: 'SET_COURSES', payload: response?.items })
        dispatch({ type: 'SET_TOTAL_COURSES', payload: response?.totalItems ?? 0 })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to fetch users.' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [page, limit, search, sortBy, sortOrder])

  /**
   * debouncing fetch categories by useEffect
   */
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchCourses()
    }, 500)

    debouncedFetch()

    return () => {
      debouncedFetch.cancel()
    }
  }, [fetchCourses])

  /**
   * define react table rows
   */
  const columns = useMemo(
    () => [
      columnHelper.accessor('language', {
        header: 'Language',
        cell: ({ row }) => toCapitalize(row?.original?.difficulty ?? ''),
        meta: {
          alignHeader: 'center'
        }
      }),
      columnHelper.accessor('status', {
        header: 'status',
        cell: ({ row }) => toCapitalize(row?.original?.language ?? ''),
        meta: {
          alignHeader: 'center'
        }
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => <LanguageActionDropdown id={row?.original?.id} toggleDeleteModal={toggleDeleteModal} />,
        meta: {
          alignHeader: 'center'
        }
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  /**
   * define react table
   */
  const table = useReactTable({
    data: courses,
    columns,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit
      },
      sorting: [{ id: sortBy, desc: sortOrder === 'desc' }]
    },
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  /**
   * page change handler for react table
   * @param event
   * @param newPage
   */
  const handlePageChange = (_, newPage) => {
    dispatch({ type: 'SET_PAGE', payload: Number(newPage + 1) })
  }

  /**
   * page limit handler for react table
   * @param event
   */
  const handleLimitChange = event => {
    dispatch({ type: 'SET_LIMIT', payload: Number(event.target.value) })
    dispatch({ type: 'SET_PAGE', payload: 1 })
  }

  /**
   * handle sort event
   * @param column the column to sort by
   */
  const handleSort = column => {
    const newSortBy = column.id
    const newSortOrder = sortBy === newSortBy && sortOrder === 'asc' ? 'desc' : 'asc'

    dispatch({ type: 'SET_SORT', payload: { sortOrder: newSortOrder, sortBy: newSortBy } })
  }

  /**
   * handle delete action
   * @param {*} event
   */
  const handleDelete = async e => {
    e.preventDefault()
    dispatch({ type: 'SET_DELETE_LOADING', payload: true })

    try {
      const response = await deleteCourse(selectedDeleteId)

      if (response?.status === 'success') {
        dispatch({ type: 'TOGGLE_DELETE' })
        dispatch({ type: 'SET_SELECTED_DELETE_ID', payload: null })
        fetchCourses()
        toast.success(response?.message)
      } else {
        throw new Error(response?.message)
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong')
    } finally {
      dispatch({ type: 'SET_DELETE_LOADING', payload: false })
    }
  }

  /**
   * close delete modal
   * @param {*} e
   */
  const closeDeleteModalHandler = e => {
    e.preventDefault()
    dispatch({ type: 'TOGGLE_DELETE' })
    dispatch({ type: 'SET_SELECTED_DELETE_ID', payload: null })
  }

  /**
   * toggle delete modal
   * @param {*} e
   * @param {*} id
   */
  const toggleDeleteModal = (e, id) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch({ type: 'TOGGLE_DELETE' })
    dispatch({ type: 'SET_SELECTED_DELETE_ID', payload: id ?? null })
  }

  return (
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <CustomTableHeader table={table} handleSort={handleSort} isSortable={true} />
          </TableHead>
          <TableBody>
            <CustomTableBody
              table={table}
              loading={loading}
              isError={isError}
              error={error}
              columns={columns}
              data={courses}
              noDataMessage='No Language found!'
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={totalCourses}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
      <Modal open={openDelete} setOpen={closeDeleteModalHandler} action={handleDelete} loading={deleteLoading} />
    </>
  )
}
