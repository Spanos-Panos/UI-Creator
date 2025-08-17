import React, { useState } from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface AlertProps {
  style: ComponentStyle
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message?: string
  dismissible?: boolean
}

const Alert: React.FC<AlertProps> = ({ 
  style, 
  type = 'info',
  title = "Alert Title",
  message = "This is an alert message with important information.",
  dismissible = true
}) => {
  const [visible, setVisible] = useState(true)
  
  if (!visible) return null

  const getTypeColor = () => {
    switch (type) {
      case 'success': return '#22c55e'
      case 'warning': return '#f59e0b'
      case 'error': return '#ef4444'
      default: return style.accentColor
    }
  }

  const alertStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    padding: `${style.padding}px`,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${getTypeColor()}` : `1px solid ${getTypeColor()}`,
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
    minWidth: '300px',
    position: 'relative' as const,
  }

  const iconStyle = {
    color: getTypeColor(),
    marginRight: `${style.padding * 0.5}px`,
  }

  const closeButtonStyle = {
    position: 'absolute' as const,
    top: `${style.padding * 0.5}px`,
    right: `${style.padding * 0.5}px`,
    backgroundColor: 'transparent',
    border: 'none',
    color: style.textColor,
    cursor: 'pointer',
    fontSize: `${style.fontSize}px`,
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <div style={alertStyle}>
      <div className="flex items-start">
        <div style={iconStyle}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 style={{ 
            margin: '0 0 4px 0', 
            fontSize: `${style.fontSize * 1.1}px`, 
            fontWeight: '600' 
          }}>
            {title}
          </h4>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            {message}
          </p>
        </div>
      </div>
      {dismissible && (
        <button style={closeButtonStyle} onClick={() => setVisible(false)}>
          ×
        </button>
      )}
    </div>
  )
}

export default Alert
