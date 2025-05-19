'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useMemo } from 'react'
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { getAllAppUsers, deleteAppUser } from '@/actions/user.action'

const ProficiencyLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
}

const AppUserVerificationStatus = {
  VERIFIED: 'VERIFIED',
  UNVERIFIED: 'UNVERIFIED',
  BANNED: 'BANNED'
}

const UserListTable = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const result = await getAllAppUsers()
        setUsers(result)
      } catch (err) {
        setError(err.message)
        setSnackbar({
          open: true,
          message: `Failed to fetch users: ${err.message}`,
          severity: 'error'
        })
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Enhanced search functionality
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users

    const lowercasedSearch = searchTerm.toLowerCase()

    return users.filter(user => {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase()
      const email = user.email?.toLowerCase() || ''
      const phone = user.phoneNumber || ''
      const language = user.nativeLanguage?.toLowerCase() || ''
      const proficiency = user.proficiencyLevel?.toLowerCase() || ''
      const status = user.verified?.toLowerCase() || ''

      return (
        fullName.includes(lowercasedSearch) ||
        email.includes(lowercasedSearch) ||
        phone.includes(searchTerm) || // Keep phone number search as-is for better number matching
        language.includes(lowercasedSearch) ||
        proficiency.includes(lowercasedSearch) ||
        status.includes(lowercasedSearch)
      )
    })
  }, [users, searchTerm])

  // Reset to first page when search term changes
  useEffect(() => {
    setPage(0)
  }, [searchTerm])

  // Pagination
  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [filteredUsers, page, rowsPerPage])

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

  const handleEdit = userId => {
    router.push(`/user/${userId}`)
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const confirmDelete = async () => {
    if (!selectedUser?.id) {
      setSnackbar({
        open: true,
        message: 'No user selected for deletion',
        severity: 'error'
      })
      setDeleteDialogOpen(false)
      return
    }

    try {
      setLoading(true)
      const userId = selectedUser.id
      const result = await deleteAppUser(userId)

      if (result?.statusCode === 200) {
        setUsers(prev => prev.filter(user => user.id !== userId))
        setSnackbar({
          open: true,
          message: result.data?.message || 'User deleted successfully',
          severity: 'success'
        })
      } else {
        throw new Error(result?.message || 'Failed to delete user')
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'An unexpected error occurred',
        severity: 'error'
      })
    } finally {
      setLoading(false)
      setDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const formatDate = dateString => {
    if (!dateString) return 'Never logged in'
    try {
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Invalid date'
    }
  }

  if (loading && users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error'>{error}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Search Filter */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label='Search Users'
            variant='outlined'
            size='small'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search by name, email, phone, etc.'
            InputProps={{
              sx: { backgroundColor: 'background.paper' }
            }}
          />
        </Grid>
      </Grid>

      {/* Users Table */}
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell align='center'>Language</TableCell>
                <TableCell align='center'>Proficiency Level</TableCell>
                <TableCell align='center'>Activity</TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map(user => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack direction='row' alignItems='center' spacing={2}>
                        <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                        <Box>
                          <Typography fontWeight='medium'>
                            {user.firstName} {user.lastName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {user.nativeLanguage} speaker
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography>{user.email || 'No email'}</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {user.phoneNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight='medium' align='center'>
                        {user.nativeLanguage}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Chip
                        label={user.proficiencyLevel}
                        color={
                          user.proficiencyLevel === ProficiencyLevel.BEGINNER
                            ? 'info'
                            : user.proficiencyLevel === ProficiencyLevel.INTERMEDIATE
                              ? 'primary'
                              : 'success'
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Box>
                        <Typography>XP: {user.xpPoints}</Typography>
                        <Typography>Streak: {user.streak} days</Typography>
                        <Typography variant='body2'>Last: {formatDate(user.lastLoginAt)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='center'>
                      <Chip
                        label={user.verified}
                        color={
                          user.verified === AppUserVerificationStatus.VERIFIED
                            ? 'success'
                            : user.verified === AppUserVerificationStatus.UNVERIFIED
                              ? 'warning'
                              : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton aria-label='actions' onClick={e => handleMenuOpen(e, user)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align='center' sx={{ py: 4 }}>
                    <Typography variant='body1'>
                      {searchTerm ? 'No matching users found' : 'No users available'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={e => {
            setRowsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
        />
      </Paper>

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleEdit(selectedUser?.id)}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedUser?.firstName} {selectedUser?.lastName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmDelete}
            color='error'
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant='filled'
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default UserListTable
