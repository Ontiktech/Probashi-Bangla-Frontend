'use client'

import { Avatar, Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller } from 'react-hook-form'

const SingleImageUploader = ({
  name,
  watch,
  control,
  setValue,
  errors,
  defaultMessage = 'Only .jpg, .jpeg and .png files are allowed',
  defaultImage = null,
  disabled = false,
  formats = ['.png', '.jpg', '.jpeg'],
  dragActiveText = 'Drop the image here...',
  dragInActiveText = 'Drag and drop an image here or click to upload'
}) => {
  const profileImage = watch(name)
  const [selectedImage, setSelectedImage] = useState(null)
  const onChangeRef = useRef(null)

  useEffect(() => {
    if (profileImage instanceof File || (Array.isArray(profileImage) && profileImage[0] instanceof File)) {
      const file = Array.isArray(profileImage) ? profileImage[0] : profileImage
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [profileImage])

  useEffect(() => {
    if (defaultImage) {
      setSelectedImage(defaultImage)
    }
  }, [defaultImage])

  const handleFileInputReset = e => {
    e.preventDefault()
    e.stopPropagation()
    setValue(name, null)
    setSelectedImage(null)
  }

  const handleFileSelect = file => {
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setSelectedImage(previewUrl)
      onChangeRef.current?.(file)
    }
  }

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      handleFileSelect(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled,
    accept: {
      'image/*': formats
    }
  })

  return (
    <Box component='div'>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => {
          onChangeRef.current = onChange

          return (
            <>
              <Box
                {...getRootProps()}
                className={`aspect-[16/5] border border-dashed ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md hover:${errors[name] ? 'border-red-50' : 'bg-gray-50'} cursor-pointer transition delay-75 relative overflow-hidden w-full h-full`}
              >
                <input {...getInputProps()} />
                {selectedImage && (
                  <>
                    <Image
                      height={200}
                      width={200}
                      src={selectedImage}
                      alt='Profile'
                      className='w-full h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    />
                    <Button
                      variant='contained'
                      color='error'
                      className='absolute top-2 right-2 z-10'
                      onClick={handleFileInputReset}
                      disabled={disabled}
                    >
                      <i className='ri-delete-bin-7-fill'></i>
                    </Button>
                  </>
                )}
                <Box
                  component='div'
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                >
                  <Avatar sx={{ borderRadius: 1, width: 60, height: 60 }}>
                    <i className='ri-image-line'></i>
                  </Avatar>
                  <p className={errors[name] ? 'text-red-500' : 'text-gray-500'}>
                    {isDragActive ? dragActiveText : dragInActiveText}
                  </p>
                </Box>
              </Box>
            </>
          )
        }}
      />

      <Typography color={errors[name] ? 'error' : 'text.secondary'} sx={{ mt: 2 }}>
        {errors[name] ? errors[name].message : defaultMessage}
      </Typography>
    </Box>
  )
}

export default SingleImageUploader
