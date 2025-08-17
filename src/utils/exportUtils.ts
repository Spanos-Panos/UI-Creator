import { Component } from '../stores/componentStore'

export const generateCSS = (component: Component): string => {
  const { style } = component
  
  const css = `
.${component.type}-component {
  background-color: ${style.backgroundColor || '#ffffff'};
  color: ${style.color || '#374151'};
  padding: ${style.padding || '12px'};
  border-radius: ${style.borderRadius || '8px'};
  margin: ${style.margin || '8px'};
  font-size: ${style.fontSize || '14px'};
  font-weight: ${style.fontWeight || '400'};
  font-family: ${style.fontFamily || 'Inter, system-ui, sans-serif'};
  border: ${style.border || 'none'};
  transition: ${style.transition || 'all 0.2s ease'};
  box-shadow: ${style.boxShadow || 'none'};
  cursor: pointer;
  width: ${style.width || 'auto'};
  height: ${style.height || 'auto'};
  display: ${style.display || 'inline-block'};
  opacity: ${style.opacity || 1};
}

${component.hoverEffects && component.hoverEffects.length > 0 ? `
.${component.type}-component:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
` : ''}

${component.animations && component.animations.length > 0 ? `
.${component.type}-component {
  animation: ${component.animations.map(id => {
    const animationMap: Record<string, string> = {
      bounce: 'bounceIn 0.6s ease-out',
      fade: 'fadeInUp 0.6s ease-out',
      slide: 'slideInLeft 0.5s ease-out',
      scale: 'scaleIn 0.4s ease-out'
    }
    return animationMap[id] || ''
  }).filter(Boolean).join(', ')};
}
` : ''}
`.trim()

  return css
}

export const generateHTML = (component: Component): string => {
  const { type, name, properties } = component
  
  // Get the text content from properties or fallback to component name
  const getText = (fallback: string) => properties?.text || properties?.title || fallback
  
  switch (type) {
    case 'button':
      return `<button class="${type}-component">${getText('Sample Button')}</button>`
    case 'card':
      return `
<div class="${type}-component">
  <h3>${properties?.title || 'Sample Card'}</h3>
  <p>${properties?.description || 'This is a sample card component with customizable styling.'}</p>
</div>`.trim()
    case 'input':
      const inputType = properties?.type || 'text'
      const placeholder = properties?.placeholder || 'Enter text here...'
      const label = properties?.label
      return label 
        ? `<label for="${type}-${component.id}">${label}</label>\n<input type="${inputType}" id="${type}-${component.id}" class="${type}-component" placeholder="${placeholder}" />`
        : `<input type="${inputType}" class="${type}-component" placeholder="${placeholder}" />`
    case 'badge':
      return `<span class="${type}-component">${getText('Badge')}</span>`
    case 'avatar':
      return `<div class="${type}-component">${properties?.initials || properties?.text || 'JD'}</div>`
    case 'alert':
      return `
<div class="${type}-component" role="alert">
  <svg class="alert-icon" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
  </svg>
  <span>${getText('Alert message')}</span>
</div>`.trim()
    case 'modal':
      return `
<div class="modal-backdrop">
  <div class="${type}-component" role="dialog" aria-modal="true">
    <button class="modal-close" aria-label="Close modal">×</button>
    <h3>${properties?.title || 'Sample Modal'}</h3>
    <p>${properties?.description || 'This is a sample modal component.'}</p>
    <div class="modal-actions">
      <button class="confirm-btn">Confirm</button>
      <button class="cancel-btn">Cancel</button>
    </div>
  </div>
</div>`.trim()
    default:
      return `<div class="${type}-component">${name}</div>`
  }
}

export const generateReactComponent = (component: Component): string => {
  const { type, name, style, properties } = component
  
  const styleObject = `{
  backgroundColor: '${style.backgroundColor || '#ffffff'}',
  color: '${style.color || '#374151'}',
  padding: '${style.padding || '12px'}',
  borderRadius: '${style.borderRadius || '8px'}',
  margin: '${style.margin || '8px'}',
  fontSize: '${style.fontSize || '14px'}',
  fontWeight: '${style.fontWeight || '400'}',
  fontFamily: '${style.fontFamily || 'Inter, system-ui, sans-serif'}',
  border: '${style.border || 'none'}',
  transition: '${style.transition || 'all 0.2s ease'}',
  boxShadow: '${style.boxShadow || 'none'}',
  cursor: 'pointer',
  width: '${style.width || 'auto'}',
  height: '${style.height || 'auto'}',
  display: '${style.display || 'inline-block'}',
  opacity: ${style.opacity || 1}
}`

  const getText = (fallback: string) => properties?.text || properties?.title || fallback
  const componentName = name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '') || 'CustomComponent'

  switch (type) {
    case 'button':
      return `
import React from 'react'

interface ${componentName}Props {
  onClick?: () => void
  children?: React.ReactNode
  disabled?: boolean
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  onClick, 
  children = '${getText('Sample Button')}',
  disabled = false 
}) => {
  return (
    <button 
      style={${styleObject}}
      onClick={onClick}
      disabled={disabled}
      className="${type}-component"
    >
      {children}
    </button>
  )
}

export default ${componentName}`.trim()
    
    case 'card':
      return `
import React from 'react'

interface ${componentName}Props {
  title?: string
  description?: string
  children?: React.ReactNode
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  title = '${properties?.title || 'Sample Card'}',
  description = '${properties?.description || 'This is a sample card component with customizable styling.'}',
  children 
}) => {
  return (
    <div style={${styleObject}} className="${type}-component">
      {children || (
        <>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>
            {title}
          </h3>
          <p style={{ margin: '0', opacity: 0.8, lineHeight: 1.5 }}>
            {description}
          </p>
        </>
      )}
    </div>
  )
}

export default ${componentName}`.trim()

    case 'input':
      return `
import React, { useState } from 'react'

interface ${componentName}Props {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  label?: string
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  type = '${properties?.type || 'text'}',
  placeholder = '${properties?.placeholder || 'Enter text...'}',
  value: controlledValue,
  onChange,
  label = '${properties?.label || ''}'
}) => {
  const [internalValue, setInternalValue] = useState('')
  const value = controlledValue !== undefined ? controlledValue : internalValue
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (onChange) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  return (
    <div>
      {label && (
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={${styleObject}}
        className="${type}-component"
      />
    </div>
  )
}

export default ${componentName}`.trim()
    
    default:
      return `
import React from 'react'

interface ${componentName}Props {
  children?: React.ReactNode
}

const ${componentName}: React.FC<${componentName}Props> = ({ children }) => {
  return (
    <div style={${styleObject}} className="${type}-component">
      {children || '${name}'}
    </div>
  )
}

export default ${componentName}`.trim()
  }
}

export const downloadFile = (content: string, filename: string, type: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Validate inputs
      if (!content || !filename || !type) {
        console.error('Invalid parameters for downloadFile')
        resolve(false)
        return
      }

      const blob = new Blob([content], { type })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      
      link.href = url
      link.download = filename
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        resolve(true)
      }, 100)
      
    } catch (error) {
      console.error('Error downloading file:', error)
      resolve(false)
    }
  })
}

export const copyToClipboard = async (text: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validate input
    if (!text) {
      return { success: false, error: 'No content to copy' }
    }

    // Check if clipboard API is available
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        return { success: successful }
      } catch (err) {
        document.body.removeChild(textArea)
        return { success: false, error: 'Fallback copy method failed' }
      }
    }

    await navigator.clipboard.writeText(text)
    return { success: true }
    
  } catch (err) {
    const error = err as Error
    console.error('Failed to copy text: ', error)
    
    // Provide user-friendly error messages
    if (error.name === 'NotAllowedError') {
      return { success: false, error: 'Clipboard access denied. Please check your browser permissions.' }
    } else if (error.name === 'SecurityError') {
      return { success: false, error: 'Clipboard access blocked by security policy.' }
    } else {
      return { success: false, error: 'Failed to copy to clipboard. Please try again.' }
    }
  }
}

// Utility function to validate component before export
export const validateComponentForExport = (component: Component): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!component) {
    errors.push('No component provided')
    return { valid: false, errors }
  }
  
  if (!component.type) {
    errors.push('Component type is required')
  }
  
  if (!component.name) {
    errors.push('Component name is required')
  }
  
  if (!component.style) {
    errors.push('Component style is required')
  }
  
  return { valid: errors.length === 0, errors }
}
