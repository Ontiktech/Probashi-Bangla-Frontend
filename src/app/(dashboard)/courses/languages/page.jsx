'use client'

import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import Link from 'next/link'
import LanguageLists from '../_components/LanguageLists'
import { useState } from 'react'
import LanguageFormModal from '../_components/LanguageFormModal'

const CourseLanguagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const closeDeleteModalHandler = e => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Languages</Typography>}
        subheader='Course catalog showcasing topics, durations, and enrollments.'
        avatar={
          <Avatar>
            <i className='ri-book-line'></i>
          </Avatar>
        }
        action={
          <Button
            variant='contained'
            startIcon={<i className='ri-add-line'></i>}
            size='small'
            onClick={() => setIsModalOpen(true)}
          >
            Create New
          </Button>
        }
      />
      <CardContent>
        <LanguageLists />
      </CardContent>

      <LanguageFormModal
        open={isModalOpen}
        setOpen={closeDeleteModalHandler}
        loading={loading}
        setLoading={setLoading}
        type={'add'}
      />
    </Card>
  )
}
export default CourseLanguagePage
