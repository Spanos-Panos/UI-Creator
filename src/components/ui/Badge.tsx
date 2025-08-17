import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface BadgeProps {
  style: ComponentStyle
  children?: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({ style, children = "Badge" }) => {
  const badgeStyle = {
    backgroundColor: style.accentColor,
    color: style.textColor,
    padding: `${style.padding * 0.5}px ${style.padding}px`,
    borderRadius: `${style.borderRadius * 2}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize * 0.8}px`,
    fontWeight: '500',
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.backgroundColor}` : 'none',
    display: 'inline-block',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff' : 'none',
  }

  const hoverStyle = style.hoverEffects ? {
    transform: 'scale(1.1)',
    boxShadow: style.shadows ? '6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff' : 'none',
  } : {}

  return (
    <span
      style={badgeStyle}
      onMouseEnter={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, { ...badgeStyle, ...hoverStyle })
        }
      }}
      onMouseLeave={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, badgeStyle)
        }
      }}
    >
      {children}
    </span>
  )
}

export default Badge
