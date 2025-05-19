'use client'

import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const Input = ({ name, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => <TextField {...field} {...rest} />}
    />
  )
}

export default Input