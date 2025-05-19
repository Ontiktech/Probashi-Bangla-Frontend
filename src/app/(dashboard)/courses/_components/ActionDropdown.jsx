'use client'
import { useState } from 'react'

import Link from 'next/link'

import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'

const ActionDropdown = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  /**
   * click handler
   * @param event
   */
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * onClose handler
   */
  const handleClose = () => {
    setAnchorEl(null)
  }

  /**
   * define menu props
   */
  const MenuProps = {
    id: 'action-dropdown',
    anchorEl: anchorEl,
    open,
    onClose: handleClose,
    MenuListProps: {
      'aria-labelledby': 'basic-button'
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  }

  return (
    <Box component='div'>
      <IconButton aria-label='menu' aria-controls='action-dropdown' aria-haspopup='true' onClick={handleClick}>
        <i className='ri-more-fill'></i>
      </IconButton>
      <Menu {...MenuProps}>
        <MenuItem component={Link} href={`/courses/${id}`}>
          <ListItemIcon>
            <i className='ri-eye-line'></i>
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href={`/courses/${id}/update`}>
          <ListItemIcon>
            <i className='ri-edit-box-line'></i>
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <i className='ri-delete-bin-7-line text-red-500'></i>
          </ListItemIcon>
          <ListItemText>
            <Typography className='text-red-500'>Delete</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ActionDropdown
