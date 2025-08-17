import React from 'react'

interface AvatarProps {
  style?: React.CSSProperties
  src?: string
  alt?: string
  initials?: string
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({ 
  style, 
  src, 
  alt = "Avatar", 
  initials = "U",
  size = 48 
}) => {
  const defaultStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6b7280',
    color: '#ffffff',
    fontSize: size * 0.4,
    fontWeight: '600',
    fontFamily: 'Inter, system-ui, sans-serif',
    overflow: 'hidden',
    ...style
  }

  if (src) {
    return (
      <img 
        src={src} 
        alt={alt} 
        style={defaultStyle}
      />
    )
  }

  return (
    <div style={defaultStyle}>
      {initials}
    </div>
  )
}

export default Avatar