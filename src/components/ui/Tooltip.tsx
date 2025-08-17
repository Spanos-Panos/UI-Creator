import React, { useState } from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface TooltipProps {
  style: ComponentStyle
  text?: string
  children?: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ 
  style, 
  text = "This is a tooltip",
  children = "Hover me"
}) => {
  const [visible, setVisible] = useState(false)
  
  const triggerStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    padding: `${style.padding}px`,
    borderRadius: `${style.borderRadius}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff' : 'none',
    cursor: 'pointer',
    position: 'relative' as const,
    display: 'inline-block',
  }

  const tooltipStyle = {
    position: 'absolute' as const,
    bottom: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: style.textColor,
    color: style.backgroundColor,
    padding: `${style.padding * 0.5}px ${style.padding}px`,
    borderRadius: `${style.borderRadius * 0.5}px`,
    fontSize: `${style.fontSize * 0.8}px`,
    whiteSpace: 'nowrap' as const,
    boxShadow: style.shadows ? '4px 4px 8px rgba(0,0,0,0.2)' : 'none',
    opacity: visible ? 1 : 0,
    visibility: visible ? 'visible' as const : 'hidden' as const,
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    zIndex: 1000,
  }

  const arrowStyle = {
    position: 'absolute' as const,
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: `5px solid ${style.textColor}`,
  }

  return (
    <div
      style={triggerStyle}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div style={tooltipStyle}>
        {text}
        <div style={arrowStyle} />
      </div>
    </div>
  )
}

export default Tooltip
