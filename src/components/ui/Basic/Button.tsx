import React from 'react'

interface ButtonProps {
  style?: React.CSSProperties
  children?: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ style, children = "Button", onClick }) => {
  const defaultStyle: React.CSSProperties = {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'Inter, system-ui, sans-serif',
    transition: 'all 0.2s ease',
    ...style
  }

  return (
    <button style={defaultStyle} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button