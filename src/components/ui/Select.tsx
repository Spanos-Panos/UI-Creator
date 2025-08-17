import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface SelectProps {
  style: ComponentStyle
  options?: string[]
}

const Select: React.FC<SelectProps> = ({ 
  style, 
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'] 
}) => {
  const selectStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    padding: `${style.padding}px`,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    outline: 'none',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff' : 'none',
    width: '200px',
    cursor: 'pointer',
  }

  const focusStyle = {
    boxShadow: style.shadows ? 'inset 6px 6px 12px #d1d9e6, inset -6px -6px 12px #ffffff, 0 0 0 2px rgba(99, 102, 241, 0.2)' : '0 0 0 2px rgba(99, 102, 241, 0.2)',
  }

  return (
    <select
      style={selectStyle}
      onFocus={(e) => {
        if (style.hoverEffects) {
          Object.assign(e.currentTarget.style, { ...selectStyle, ...focusStyle })
        }
      }}
      onBlur={(e) => {
        Object.assign(e.currentTarget.style, selectStyle)
      }}
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Select
