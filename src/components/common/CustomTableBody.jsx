'use client'
import { TableCell, TableRow } from '@mui/material'

import { flexRender } from '@tanstack/react-table'

import BlankMessage from './BlankMessage'
import TableLoader from './loader/TableLoader'

const CustomTableBody = ({ loading, isError, error, data, columns, table, noDataMessage = 'No data found!' }) => {
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
    table.getRowModel().rows.map(row => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id} align={cell.column.columnDef.meta?.alignHeader || 'left'}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  )
}

export default CustomTableBody
