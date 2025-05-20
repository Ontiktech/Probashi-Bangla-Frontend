import AppReactDropzone from '@/app/libs/AppReactDropzone'
import { Button, IconButton, List, ListItem, styled } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

const FileUploader = ({ multiple = false, maxFiles = 5 }) => {
  const [files, setFiles] = useState([])

  const allowedExtensions = ['.mp3', '.wav', '.ogg', '.m4a']

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: multiple ? maxFiles : 1,
    multiple,
    maxSize: 5 * 1024 * 1024,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/ogg': ['.ogg'],
      'audio/x-m4a': ['.m4a'],
      'audio/mp4': ['.m4a']
    },
    onDrop: acceptedFiles => {
      const filtered = acceptedFiles.filter(file =>
        allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
      )

      if (filtered.length === 0) {
        toast.error('Only .mp3, .wav, .ogg, .m4a files are allowed.', { autoClose: 3000 })
        return
      }

      setFiles(prev => (multiple ? [...prev, ...filtered] : [filtered[0]]))
    },
    onDropRejected: () => {
      toast.error(
        multiple
          ? `You can upload multiple audio files (each under 5MB) and max ${maxFiles}.`
          : 'Only one audio file is allowed. Max size: 5MB.',
        { autoClose: 3000 }
      )
    }
  })

  const renderFilePreview = file => {
    if (file?.type?.startsWith('audio')) {
      return <i className='ri-music-line text-2xl' />
    }
    return <i className='ri-file-line text-2xl' />
  }

  const handleRemoveFile = file => {
    setFiles(files.filter(i => i.name !== file.name))
  }

  const handleRemoveAllFiles = () => setFiles([])

  const fileList = files.map(file => (
    <ListItem key={file?.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file?.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {(file?.size / 1024).toFixed(1)} KB
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='ri-close-line text-xl' />
      </IconButton>
    </ListItem>
  ))

  return (
    <Dropzone>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='flex items-center flex-col'>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
            <i className='ri-upload-2-line' />
          </Avatar>
          <Typography variant='h4' className='mbe-2.5'>
            Drop audio file here or click to upload
          </Typography>
          <Typography color='text.secondary'>Allowed *.mp3, *.wav, *.ogg, *.m4a</Typography>
          <Typography color='text.secondary'>Max 1 file. Max size 5 MB</Typography>
        </div>
      </div>

      {files.length > 0 && (
        <>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove File
            </Button>
            <Button variant='contained'>Upload File</Button>
          </div>
        </>
      )}
    </Dropzone>
  )
}

export default FileUploader
