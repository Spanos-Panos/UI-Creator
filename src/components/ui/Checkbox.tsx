import React, { useState } from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface CheckboxProps {
  style: ComponentStyle
  label?: string
}

const Checkbox: React.FC<CheckboxProps> = ({ style, label = "Checkbox Label" }) => {
  const [checked, setChecked] = useState(false)
  
  const checkboxStyle = {
    width: `${style.fontSize * 1.2}px`,
    height: `${style.fontSize * 1.2}px`,
    backgroundColor: checked ? style.accentColor : style.backgroundColor,
    borderRadius: `${style.borderRadius * 0.3}px`,
    margin: `${style.margin}px`,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? 
      (checked ? 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff' : '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff') 
      : 'none',
    cursor: 'pointer',
    position: 'relative' as const,
  }

  const labelStyle = {
    color: style.textColor,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    marginLeft: `${style.padding * 0.5}px`,
    cursor: 'pointer',
  }

  const checkmarkStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: style.textColor,
    fontSize: `${style.fontSize * 0.8}px`,
    opacity: checked ? 1 : 0,
    transition: style.transitions ? 'opacity 0.2s ease' : 'none',
  }

  return (
    <div className="flex items-center">
      <div
        style={checkboxStyle}
        onClick={() => setChecked(!checked)}
        onMouseEnter={(e) => {
          if (style.hoverEffects) {
            e.currentTarget.style.transform = 'scale(1.1)'
          }
        }}
        onMouseLeave={(e) => {
          if (style.hoverEffects) {
            e.currentTarget.style.transform = 'scale(1)'
          }
        }}
      >
        <span style={checkmarkStyle}>✓</span>
      </div>
      <label style={labelStyle} onClick={() => setChecked(!checked)}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
