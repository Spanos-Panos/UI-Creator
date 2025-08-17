import React from 'react'

interface BadgeProps {
  style?: React.CSSProperties
  children?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const Badge: React.FC<BadgeProps> = ({ style, children = "Badge", variant = 'default' }) => {
  const variantStyles = {
    default: { backgroundColor: '#6b7280', color: '#ffffff' },
    success: { backgroundColor: '#10b981', color: '#ffffff' },
    warning: { backgroundColor: '#f59e0b', color: '#ffffff' },
    error: { backgroundColor: '#ef4444', color: '#ffffff' }
  }

  const defaultStyle: React.CSSProperties = {
    ...variantStyles[variant],
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'Inter, system-ui, sans-serif',
    display: 'inline-block',
    ...style
  }

  return (
    <span style={defaultStyle}>
      {children}
    </span>
  )
}

export default Badge