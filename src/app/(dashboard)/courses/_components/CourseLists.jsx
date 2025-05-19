'use client'
import { useMemo, useReducer } from 'react'

import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material'

import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import CustomTableBody from '@/components/common/CustomTableBody'
import CustomTableHeader from '@/components/common/CustomTableHeader'
import ActionDropdown from './ActionDropdown'

const dummyData = [
  {
    id: 1,
    name: 'Course 1',
    duration: '2 hours'
  },
  {
    id: 2,
    name: 'Course 2',
    duration: '2 hours'
  },
  {
    id: 3,
    name: 'Course 3',
    duration: '2 hours'
  }
]

/**
 * set initial state
 */
const initialState = {
  openDelete: false,
  deleteLoading: false,
  search: '',
  page: 1,
  limit: 10,
  loading: false,
  totalCourses: dummyData.length ?? 0,
  courses: dummyData ?? [],
  isError: false,
  error: null
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
    default:
      return state
  }
}

const CourseLists = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { page, limit, loading, totalCourses, courses, isError, error, sortOrder, sortBy } = state

  /**
   * fetch courses function
   */
  //   const fetchCourses = useCallback(async () => {
  //     dispatch({ type: 'SET_LOADING', payload: true })
  //     dispatch({ type: 'RESET_ERROR' })

  //     try {
  //       const response = await getAllCourses(page, limit, search)

  //       if (response?.items) {
  //         dispatch({ type: 'SET_COURSES', payload: response?.items })
  //         dispatch({ type: 'SET_TOTAL_COURSES', payload: response?.totalItems })
  //       }
  //     } catch (error) {
  //       dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to fetch users.' })
  //     } finally {
  //       dispatch({ type: 'SET_LOADING', payload: false })
  //     }
  //   }, [page, limit, search, selectedStatus, sortBy, sortOrder, isPopular])

  //   /**
  //    * debouncing fetch categories by useEffect
  //    */
  //   useEffect(() => {
  //     const debouncedFetch = debounce(() => {
  //       fetchCourses()
  //     }, 500)

  //     debouncedFetch()

  //     return () => {
  //       debouncedFetch.cancel()
  //     }
  //   }, [fetchCourses])

  /**
   * define react table rows
   */
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => row?.original?.name
      }),
      columnHelper.accessor('duration', {
        header: 'Name',
        cell: ({ row }) => row?.original?.duration
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => <ActionDropdown id={row?.original?.id} />,
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
   * create category toggler
   */
  const toggleCreateCategory = () => {
    dispatch({ type: 'TOGGLE_CREATE_CATEGORY_MODAL' })
  }

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
   * toggle edit modal handler
   * @param e
   * @param id
   */
  const handleEditModal = (e, id) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch({ type: 'TOGGLE_EDIT_CATEGORY_MODAL' })
    dispatch({ type: 'SET_SELECTED_EDIT_ID', payload: id ?? null })
  }

  /**
   * toggle delete modal handler
   * @param e
   * @param id
   */
  const toggleDeleteModal = (e, id) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch({ type: 'TOGGLE_DELETE' })
    dispatch({ type: 'SET_SELECTED_DELETE_ID', payload: id ?? null })
  }

  /**
   * search type handler
   * @param event
   * @returns
   */
  const handleSearch = event => dispatch({ type: 'SET_SEARCH', payload: event.target.value })
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
              noDataMessage='No courses found!'
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
    </>
  )
}

export default CourseLists
