import React, { useState } from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface RadioProps {
  style: ComponentStyle
  options?: string[]
  name?: string
}

const Radio: React.FC<RadioProps> = ({ 
  style, 
  options = ['Option 1', 'Option 2', 'Option 3'],
  name = 'radio-group'
}) => {
  const [selected, setSelected] = useState(options[0])
  
  const radioStyle = {
    width: `${style.fontSize * 1.2}px`,
    height: `${style.fontSize * 1.2}px`,
    backgroundColor: style.backgroundColor,
    borderRadius: '50%',
    margin: `${style.margin}px`,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : `2px solid ${style.accentColor}`,
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff' : 'none',
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

  const dotStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    backgroundColor: style.accentColor,
    borderRadius: '50%',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
  }

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <div
            style={radioStyle}
            onClick={() => setSelected(option)}
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
            {selected === option && <div style={dotStyle} />}
          </div>
          <label style={labelStyle} onClick={() => setSelected(option)}>
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Radio
