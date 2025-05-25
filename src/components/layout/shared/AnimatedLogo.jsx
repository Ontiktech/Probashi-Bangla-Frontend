import { useSettings } from '@/@core/hooks/useSettings'
import useVerticalNav from '@/@menu/hooks/useVerticalNav'
import Link from 'next/link'

const AnimatedLogo = ({ size = 'md', animated = false, className = '' }) => {
  const { settings } = useSettings()
  const { isHovered, transitionDuration, isBreakpointReached } = useVerticalNav()

  const { mode, layout } = settings
  // Size classes for the logo container
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20'
  }

  // Font size classes for the text
  const fontSizeClasses = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  // Theme-specific colors
  const logoColors = {
    system: {
      primary: '#10b981',
      secondary: 'text-emerald-500',
      icon: '#10b981', // emerald-500
      accent: '#065f46' // emerald-800
    },
    dark: {
      primary: 'text-zinc-300',
      secondary: 'text-emerald-400',
      icon: '#34d399', // emerald-400
      accent: '#047857' // emerald-700
    },
    light: {
      primary: 'text-zinc-900',
      secondary: 'text-emerald-600',
      icon: '#059669', // emerald-600
      accent: '#10b981' // emerald-500
    }
  }

  const colorSet = logoColors[mode]

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} aspect-square relative`}>
        <svg
          viewBox='0 0 100 100'
          xmlns='http://www.w3.org/2000/svg'
          className={`w-full h-full ${animated ? 'animate-pulse' : ''}`}
        >
          {/* Outer Circle */}
          <circle cx='50' cy='50' r='48' fill='none' stroke={colorSet.accent} strokeWidth='2' opacity='0.3' />

          {/* Inner Circle with Gradient */}
          <circle
            cx='50'
            cy='50'
            r='38'
            fill='none'
            stroke={colorSet.icon}
            strokeWidth='4'
            strokeDasharray={animated ? '239.56,239.56' : ''}
            strokeDashoffset={animated ? '239.56' : ''}
            opacity='0.8'
            className={animated ? 'animate-dash' : ''}
          />

          {/* Abstract Language Connections */}
          <path d='M30,35 Q50,25 70,35' stroke={colorSet.icon} fill='none' strokeWidth='3' strokeLinecap='round' />
          <path d='M30,50 Q50,40 70,50' stroke={colorSet.icon} fill='none' strokeWidth='3' strokeLinecap='round' />
          <path d='M30,65 Q50,55 70,65' stroke={colorSet.icon} fill='none' strokeWidth='3' strokeLinecap='round' />

          {/* Central "L" */}
          <path
            d='M45,30 L45,70 L65,70'
            stroke={colorSet.icon}
            fill='none'
            strokeWidth='5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>

      {/* Logo Text */}
      {isHovered && (
        <h2 className={`${fontSizeClasses[size]} font-bold ml-2`}>
          <span className={colorSet.primary}>Lingua</span>
          <span className={colorSet.secondary}>Learn</span>
        </h2>
      )}
    </div>
  )
}

export const LogoLink = ({ href = '/', ...props }) => {
  return (
    <Link href={href} className='no-underline'>
      <AnimatedLogo {...props} />
    </Link>
  )
}

export default AnimatedLogo
