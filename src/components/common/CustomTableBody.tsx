'use client'
import { TableCell, TableRow } from '@mui/material'

import { flexRender } from '@tanstack/react-table'

import TableLoader from './loader/TableLoader'
import BlankMessage from './BlankMessage'

const CustomTableBody = ({
  loading,
  isError,
  error,
  data,
  columns,
  table,
  noDataMessage = 'No data found!'
}: {
  loading: boolean
  isError: boolean
  error: string
  data: never[]
  columns: any
  table: any
  noDataMessage?: string
}) => {
  return loading ? (
    <TableRow>
      <TableCell colSpan={columns.length} align='center'>
        <TableLoader />
      </TableCell>
    </TableRow>
  ) : isError && error ? (
    <TableRow>
      <TableCell colSpan={columns.length} align='center'>
        <BlankMessage message={error} isError={true} />
      </TableCell>
    </TableRow>
  ) : data?.length === 0 ? (
    <TableRow>
      <TableCell colSpan={columns.length} align='center'>
        <BlankMessage message={noDataMessage} iconClass='ri-file-close-line' />
      </TableCell>
    </TableRow>
  ) : (
    table.getRowModel().rows.map((row: any) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell: any) => (
          <TableCell key={cell.id} align={cell.column.columnDef.meta?.alignHeader || 'left'}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  )
}

export default CustomTableBody
