'use client'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'
import { Controller } from 'react-hook-form'

const Select = ({ name, control, label, data, error = false, helperText = '', disabled = false }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth error={error} disabled={disabled}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <MuiSelect {...field} labelId={`${name}-label`} id={name} label={label}>
            {data?.map((item, index) => (
              <MenuItem value={item?.value} key={index}>
                {item?.text}
              </MenuItem>
            ))}
          </MuiSelect>
          {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default Select
