import { TableCell, TableRow } from '@mui/material'
import { flexRender } from '@tanstack/react-table'
import classNames from 'classnames'

const CustomTableHeader = ({
  table,
  handleSort,
  isSortable
}: {
  table: any
  handleSort?: (column: any) => void
  isSortable?: boolean
}) => {
  return isSortable
    ? table.getHeaderGroups().map((headerGroup: any) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <TableCell key={header.id} align={header.column.columnDef.meta?.alignHeader || 'left'}>
              {header.isPlaceholder ? null : (
                <div
                  className={classNames({
                    'flex items-center': header.column.getIsSorted(),
                    'justify-center': header.column.columnDef.meta?.alignHeader === 'center',
                    'cursor-pointer select-none': header.column.getCanSort()
                  })}
                  onClick={() => header.column.getCanSort() && handleSort?.(header.column)}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (
                    <i
                      className={`${header.column.getIsSorted() === 'desc' ? 'ri-arrow-down-line' : 'ri-arrow-up-line'} ml-2 text-base`}
                    ></i>
                  )}
                </div>
              )}
            </TableCell>
          ))}
        </TableRow>
      ))
    : table.getHeaderGroups().map((headerGroup: any) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <TableCell key={header.id} align={header.column.columnDef.meta?.alignHeader || 'left'}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
}

export default CustomTableHeader
