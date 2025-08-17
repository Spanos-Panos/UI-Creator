import React, { useState } from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface SwitchProps {
  style: ComponentStyle
  label?: string
}

const Switch: React.FC<SwitchProps> = ({ style, label = "Switch Label" }) => {
  const [enabled, setEnabled] = useState(false)
  
  const switchWidth = style.fontSize * 3
  const switchHeight = style.fontSize * 1.5
  const thumbSize = switchHeight * 0.8
  
  const switchStyle = {
    width: `${switchWidth}px`,
    height: `${switchHeight}px`,
    backgroundColor: enabled ? style.accentColor : style.backgroundColor,
    borderRadius: `${switchHeight / 2}px`,
    margin: `${style.margin}px`,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.3s ease' : 'none',
    boxShadow: style.shadows ? 
      (enabled ? 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff' : '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff') 
      : 'none',
    cursor: 'pointer',
    position: 'relative' as const,
  }

  const thumbStyle = {
    width: `${thumbSize}px`,
    height: `${thumbSize}px`,
    backgroundColor: style.textColor,
    borderRadius: '50%',
    position: 'absolute' as const,
    top: '50%',
    left: enabled ? `${switchWidth - thumbSize - (switchHeight - thumbSize) / 2}px` : `${(switchHeight - thumbSize) / 2}px`,
    transform: 'translateY(-50%)',
    transition: style.transitions ? 'all 0.3s ease' : 'none',
    boxShadow: style.shadows ? '2px 2px 4px rgba(0,0,0,0.2)' : 'none',
  }

  const labelStyle = {
    color: style.textColor,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    marginLeft: `${style.padding * 0.5}px`,
    cursor: 'pointer',
  }

  return (
    <div className="flex items-center">
      <div
        style={switchStyle}
        onClick={() => setEnabled(!enabled)}
        onMouseEnter={(e) => {
          if (style.hoverEffects) {
            e.currentTarget.style.transform = 'scale(1.05)'
          }
        }}
        onMouseLeave={(e) => {
          if (style.hoverEffects) {
            e.currentTarget.style.transform = 'scale(1)'
          }
        }}
      >
        <div style={thumbStyle} />
      </div>
      <label style={labelStyle} onClick={() => setEnabled(!enabled)}>
        {label}
      </label>
    </div>
  )
}

export default Switch
