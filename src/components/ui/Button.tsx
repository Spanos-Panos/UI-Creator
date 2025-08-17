import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface ButtonProps {
  style: ComponentStyle
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ style, children = "Sample Button" }) => {
  const buttonStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    padding: `${style.padding}px ${style.padding * 1.5}px`,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    cursor: 'pointer',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
  }

  const hoverStyle = style.hoverEffects ? {
    transform: 'scale(1.05)',
    boxShadow: style.shadows ? '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff' : 'none',
  } : {}

  return (
    <button
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, hoverStyle)
        }
      }}
      onMouseLeave={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, buttonStyle)
        }
      }}
    >
      {children}
    </button>
  )
}

export default Button
