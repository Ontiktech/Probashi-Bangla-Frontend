'use client'

import Input from '@/components/common/form/Input'
import Select from '@/components/common/form/Select'
import { yupResolver } from '@hookform/resolvers/yup'
// MUI Imports
import { CircularProgress, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export const languageFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Language name is required')
    .min(2, 'Language name must be at least 2 characters')
    .max(50, 'Language name must be at most 50 characters'),

  status: yup
    .mixed()
    .oneOf(['active', 'inactive'], 'Status must be either active or inactive')
    .required('Status is required')
})

const LanguageFormModal = ({
  open,
  setOpen,
  action,
  loading = false,
  setLoading,
  title = 'Add New Language',
  type,
  id
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      language: '',
      status: 'active'
    },
    mode: 'onBlur',
    resolver: yupResolver(languageFormSchema)
  })

  const onSubmit = async data => {
    setLoading(true)

    try {
      // const response = await createNewCourse(data)
      // if (response?.status === 'validationError') {
      //   populateValidationErrors(response?.errors, setError)
      // } else if (response?.status === 'success') {
      //   router.push('/courses')
      //   toast.success(response?.message)
      // } else {
      //   throw new Error(response?.message)
      // }
    } catch (error) {
      toast.error(error.message || 'Failed to add language')
    } finally {
      setLoading(false)
    }
  }

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
            <form onSubmit={handleSubmit(onSubmit)} className='pt-4'>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Input
                    control={control}
                    name='language'
                    label='Language'
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    disabled={loading}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    name='status'
                    control={control}
                    error={!!errors?.status}
                    helperText={errors?.status?.message || ''}
                    label='Status'
                    data={[
                      {
                        text: 'Active',
                        value: 'active'
                      },
                      {
                        text: 'InActive',
                        value: 'inactive'
                      }
                    ]}
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={setOpen} variant='outlined' color='secondary'>
              Cancel
            </Button>
            <Button onClick={action} variant='contained' disabled={loading}>
              Save
              {loading && <CircularProgress size={20} sx={{ ml: 1 }} color='inherit' />}
            </Button>
          </DialogActions>
        </Dialog>,
        document.body
      )
    : null
}

export default LanguageFormModal
