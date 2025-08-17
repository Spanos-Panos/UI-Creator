import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface CardProps {
  style: ComponentStyle
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ style, children }) => {
  const cardStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    padding: `${style.padding}px`,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.3s ease' : 'none',
    boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
    minWidth: '200px',
    minHeight: '150px',
  }

  const hoverStyle = style.hoverEffects ? {
    transform: 'scale(1.02)',
    boxShadow: style.shadows ? '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff' : 'none',
  } : {}

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, { ...cardStyle, ...hoverStyle })
        }
      }}
      onMouseLeave={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, cardStyle)
        }
      }}
    >
      {children || (
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: `${style.fontSize * 1.2}px`, fontWeight: '600' }}>
            Sample Card
          </h3>
          <p style={{ margin: '0', opacity: 0.8, lineHeight: 1.5 }}>
            This is a sample card component with customizable styling. You can adjust colors, spacing, and effects using the customization panel.
          </p>
        </div>
      )}
    </div>
  )
}

export default Card
