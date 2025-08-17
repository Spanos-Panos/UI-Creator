import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface ProgressProps {
  style: ComponentStyle
  value?: number
  max?: number
  label?: string
}

const Progress: React.FC<ProgressProps> = ({ 
  style, 
  value = 65, 
  max = 100,
  label = "Progress"
}) => {
  const percentage = (value / max) * 100
  
  const containerStyle = {
    backgroundColor: style.backgroundColor,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff' : 'none',
    width: '250px',
    height: `${style.fontSize * 1.5}px`,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  }

  const fillStyle = {
    backgroundColor: style.accentColor,
    height: '100%',
    width: `${percentage}%`,
    borderRadius: `${style.borderRadius}px`,
    transition: style.transitions ? 'width 0.5s ease' : 'none',
    boxShadow: style.shadows ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none',
  }

  const labelStyle = {
    color: style.textColor,
    fontSize: `${style.fontSize * 0.9}px`,
    fontWeight: style.fontWeight,
    marginBottom: `${style.padding * 0.3}px`,
    display: 'block',
  }

  const valueStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: percentage > 50 ? 'white' : style.textColor,
    fontSize: `${style.fontSize * 0.8}px`,
    fontWeight: '600',
    textShadow: percentage > 50 ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
  }

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={containerStyle}>
        <div style={fillStyle} />
        <div style={valueStyle}>
          {value}%
        </div>
      </div>
    </div>
  )
}

export default Progress
