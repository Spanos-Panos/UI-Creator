import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface AvatarProps {
  style: ComponentStyle
  src?: string
  alt?: string
  initials?: string
}

const Avatar: React.FC<AvatarProps> = ({ style, src, alt = "Avatar", initials = "JD" }) => {
  const size = style.fontSize * 3
  
  const avatarStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: style.borderRadius > 20 ? '50%' : `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
    overflow: 'hidden',
  }

  const hoverStyle = style.hoverEffects ? {
    transform: 'scale(1.1)',
    boxShadow: style.shadows ? '12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff' : 'none',
  } : {}

  return (
    <div
      style={avatarStyle}
      onMouseEnter={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, { ...avatarStyle, ...hoverStyle })
        }
      }}
      onMouseLeave={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, avatarStyle)
        }
      }}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      ) : (
        <span style={{ fontSize: `${style.fontSize * 0.8}px`, fontWeight: '600' }}>
          {initials}
        </span>
      )}
    </div>
  )
}

export default Avatar
