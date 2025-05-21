'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'

// MUI Imports
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import { signIn } from 'next-auth/react'

import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { userLoginSchema } from '@/schema/userLogin.schema'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { LoadingButton } from '@mui/lab'
import { CircularProgress, FormControl } from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const LoginV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(userLoginSchema)
  })

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-1-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-1-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const searchParams = useSearchParams()

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleLogin = async data => {
    setLoading(true)

    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (res && res.ok && res.error === null) {
        const redirectURL = searchParams.get('callbackUrl') ?? '/home'

        router.push(redirectURL)
      } else {
        if (res?.error) {
          const error = JSON.parse(res.error)

          setError('email', {
            type: 'manual',
            message: error?.message
          })
        }
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong! Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='pli-6 max-lg:mbs-40 lg:mbe-24'>
          <Image
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[673px] max-is-full bs-auto'
            width={696}
            height={673}
          />
        </div>
        <Image
          src={authBackground}
          className='absolute bottom-[4%] z-[-1] is-full max-md:hidden'
          alt='auth-background'
          width={1920}
          height={582}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-5'>
            <FormControl>
              <TextField
                autoFocus
                fullWidth
                label='Email'
                {...register('email')}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            </FormControl>
            <FormControl>
              <TextField
                fullWidth
                label='Password'
                type={isPasswordShown ? 'text' : 'password'}
                {...register('password')}
                error={Boolean(errors?.password)}
                helperText={errors?.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>

            <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                Forgot password?
              </Typography>
            </div>
            <LoadingButton
              loading={loading}
              fullWidth
              variant='contained'
              type='submit'
              loadingIndicator={
                <CircularProgress
                  size={20}
                  sx={{
                    color: theme => theme.palette.primary.contrastText // Use a valid theme color
                  }}
                />
              }
            >
              Log In
            </LoadingButton>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <Typography component={Link} color='primary'>
                Create an account
              </Typography>
            </div>
            <Divider className='gap-3 text-textPrimary'>or</Divider>
            <div className='flex justify-center items-center gap-2'>
              <IconButton size='small' className='text-facebook'>
                <i className='ri-facebook-fill' />
              </IconButton>
              <IconButton size='small' className='text-twitter'>
                <i className='ri-twitter-fill' />
              </IconButton>
              <IconButton size='small' className='text-textPrimary'>
                <i className='ri-github-fill' />
              </IconButton>
              <IconButton size='small' className='text-googlePlus'>
                <i className='ri-google-fill' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
