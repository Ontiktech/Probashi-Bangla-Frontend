'use client'

import { deleteLanguage, getAllLanguages } from '@/actions/language.action'
import CustomTableBody from '@/components/common/CustomTableBody'
import CustomTableHeader from '@/components/common/CustomTableHeader'
import Modal from '@/components/common/Modal'
import { toCapitalize } from '@/utils/common'
import { Chip, Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material'
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { toast } from 'react-toastify'
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
  totalLanguages: 0,
  languages: [],
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
    case 'SET_TOTAL_LANGUAGES':
      return { ...state, totalLanguages: action.payload }
    case 'SET_LANGUAGES':
      return { ...state, languages: action.payload }
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

const getStatus = status => {
  switch (status) {
    case true:
      return <Chip label='Active' color='success' size='small' icon={<i className='ri-checkbox-circle-fill'></i>} />
    case false:
      return <Chip label='Inactive' color='error' size='small' icon={<i className='ri-close-circle-fill'></i>} />
    default:
      return <Chip label='N/A' color='error' size='small' icon={<i className='ri-close-circle-fill'></i>} />
  }
}

export default function LanguageLists() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    page,
    limit,
    loading,
    totalLanguages,
    languages,
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
   * fetch languages function
   */
  const fetchLanguages = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'RESET_ERROR' })

    try {
      const response = await getAllLanguages(page, limit, search, sortOrder, sortBy)

      if (response?.status === 'success' && response?.items?.length > 0) {
        dispatch({ type: 'SET_LANGUAGES', payload: response?.items })
        dispatch({ type: 'SET_TOTAL_LANGUAGES', payload: response?.totalItems ?? 0 })
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
      fetchLanguages()
    }, 500)

    debouncedFetch()

    return () => {
      debouncedFetch.cancel()
    }
  }, [fetchLanguages])

  /**
   * define react table rows
   */
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'name',
        cell: ({ row }) => toCapitalize(row?.original?.name ?? '')
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
    data: languages,
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
   * handle delete action
   * @param {*} event
   */
  const handleDelete = async e => {
    e.preventDefault()
    dispatch({ type: 'SET_DELETE_LOADING', payload: true })

    try {
      const response = await deleteLanguage(selectedDeleteId)

      if (response?.status === 'success') {
        dispatch({ type: 'TOGGLE_DELETE' })
        dispatch({ type: 'SET_SELECTED_DELETE_ID', payload: null })
        fetchLanguages()
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
            <CustomTableHeader table={table} />
          </TableHead>
          <TableBody>
            <CustomTableBody
              table={table}
              loading={loading}
              isError={isError}
              error={error}
              columns={columns}
              data={languages}
              noDataMessage='No Language found!'
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={totalLanguages}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
      <Modal open={openDelete} setOpen={closeDeleteModalHandler} action={handleDelete} loading={deleteLoading} />
    </>
  )
}
