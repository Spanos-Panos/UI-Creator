import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface SpinnerProps {
  style: ComponentStyle
  size?: 'sm' | 'md' | 'lg'
}

const Spinner: React.FC<SpinnerProps> = ({ style, size = 'md' }) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return style.fontSize * 1.5
      case 'lg': return style.fontSize * 3
      default: return style.fontSize * 2
    }
  }

  const spinnerSize = getSize()
  
  const spinnerStyle = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    border: `${Math.max(2, style.borderWidth * 2)}px solid ${style.backgroundColor}`,
    borderTop: `${Math.max(2, style.borderWidth * 2)}px solid ${style.accentColor}`,
    borderRadius: '50%',
    margin: `${style.margin}px`,
    animation: style.animations ? 'spin 1s linear infinite' : 'none',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff' : 'none',
  }

  // Add keyframes for spin animation
  React.useEffect(() => {
    const styleSheet = document.styleSheets[0]
    const keyframes = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
    } catch (e) {
      // Keyframes already exist
    }
  }, [])

  return <div style={spinnerStyle} />
}

export default Spinner
