import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface ModalProps {
  style: ComponentStyle
  isOpen?: boolean
  title?: string
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ 
  style, 
  isOpen = true, 
  title = "Sample Modal", 
  children 
}) => {
  const modalStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    padding: `${style.padding}px`,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.3s ease' : 'none',
    boxShadow: style.shadows ? '20px 20px 40px #d1d9e6, -20px -20px 40px #ffffff' : 'none',
    minWidth: '300px',
    maxWidth: '400px',
    position: 'relative' as const,
  }

  const headerStyle = {
    fontSize: `${style.fontSize * 1.2}px`,
    fontWeight: '600',
    marginBottom: `${style.padding * 0.5}px`,
    paddingBottom: `${style.padding * 0.5}px`,
    borderBottom: `1px solid ${style.accentColor}20`,
  }

  const closeButtonStyle = {
    position: 'absolute' as const,
    top: `${style.padding * 0.5}px`,
    right: `${style.padding * 0.5}px`,
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: `${style.fontSize * 1.2}px`,
    color: style.textColor,
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={modalStyle}>
        <button style={closeButtonStyle}>×</button>
        <div style={headerStyle}>{title}</div>
        <div style={{ lineHeight: 1.5 }}>
          {children || (
            <p style={{ margin: 0 }}>
              This is a sample modal component. You can customize its appearance using the customization panel on the left.
            </p>
          )}
        </div>
        <div style={{ 
          marginTop: `${style.padding}px`, 
          display: 'flex', 
          gap: `${style.padding * 0.5}px`,
          justifyContent: 'flex-end'
        }}>
          <button style={{
            backgroundColor: style.accentColor,
            color: 'white',
            border: 'none',
            padding: `${style.padding * 0.5}px ${style.padding}px`,
            borderRadius: `${style.borderRadius * 0.5}px`,
            fontSize: `${style.fontSize * 0.9}px`,
            cursor: 'pointer',
          }}>
            Confirm
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: style.textColor,
            border: `1px solid ${style.textColor}40`,
            padding: `${style.padding * 0.5}px ${style.padding}px`,
            borderRadius: `${style.borderRadius * 0.5}px`,
            fontSize: `${style.fontSize * 0.9}px`,
            cursor: 'pointer',
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
