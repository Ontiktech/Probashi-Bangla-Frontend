import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import LanguageFormModal from './LanguageFormModal'

export default function LanguageActionDropdown({ id, toggleDeleteModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const closeDeleteModalHandler = e => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * onClose handler
   */
  const handleClose = () => {
    setAnchorEl(null)
  }

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
        <MenuItem onClick={() => setIsModalOpen(true)}>
          <ListItemIcon>
            <i className='ri-edit-box-line'></i>
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={e => toggleDeleteModal(e, id)}>
          <ListItemIcon>
            <i className='ri-delete-bin-7-line text-red-500'></i>
          </ListItemIcon>
          <ListItemText>
            <Typography className='text-red-500'>Delete</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      <LanguageFormModal
        open={isModalOpen}
        setOpen={closeDeleteModalHandler}
        loading={loading}
        setLoading={setLoading}
        type={'edit'}
        id={id}
      />
    </Box>
  )
}
