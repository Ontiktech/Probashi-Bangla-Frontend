'use client'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const Input = ({ name, control, type = 'text', ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={type === 'number' ? 0 : ''}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          type={type}
          onChange={e => {
            const value = type === 'number' ? +e.target.value : e.target.value

            field.onChange(value)
          }}
        />
      )}
    />
  )
}

export default Input
