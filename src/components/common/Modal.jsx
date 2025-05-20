'use client'

// MUI Imports
import { CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { createPortal } from 'react-dom'

const Modal = ({
  open,
  setOpen,
  action,
  loading = false,
  title = 'Are you sure to delete this data?',
  description = "By deleting you can't revert it for the next time. Please hold on and check before deleting this data."
}) => {
  return open
    ? createPortal(
        <Dialog
          open={open}
          onClose={setOpen}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={setOpen} variant='outlined' color='secondary'>
              Disagree
            </Button>
            <Button onClick={action} variant='contained' disabled={loading}>
              Agree
              {loading && <CircularProgress size={20} sx={{ ml: 1 }} color='inherit' />}
            </Button>
          </DialogActions>
        </Dialog>,
        document.body
      )
    : null
}

export default Modal
