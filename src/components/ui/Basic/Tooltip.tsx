import React from 'react'

interface TooltipProps {
  style?: React.CSSProperties
  children?: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip: React.FC<TooltipProps> = ({ 
  style, 
  children, 
  content,
  position = 'top' 
}) => {
  const [visible, setVisible] = React.useState(false)

  const defaultStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    ...style
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontFamily: 'Inter, system-ui, sans-serif',
    whiteSpace: 'nowrap',
    zIndex: 1000,
    opacity: visible ? 1 : 0,
    visibility: visible ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease',
    ...getPositionStyles(position)
  }

  function getPositionStyles(pos: string) {
    switch (pos) {
      case 'top':
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '5px' }
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '5px' }
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '5px' }
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '5px' }
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '5px' }
    }
  }

  return (
    <div 
      style={defaultStyle}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div style={tooltipStyle}>
        {content}
      </div>
    </div>
  )
}

export default Tooltip