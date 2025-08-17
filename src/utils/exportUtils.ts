import { ComponentStyle, SelectedComponent } from '../stores/componentStore'

export const generateCSS = (component: SelectedComponent): string => {
  const { style } = component
  
  const css = `
.${component.type}-component {
  background-color: ${style.backgroundColor};
  color: ${style.textColor};
  padding: ${style.padding}px ${style.padding * 1.5}px;
  border-radius: ${style.borderRadius}px;
  margin: ${style.margin}px;
  font-size: ${style.fontSize}px;
  font-weight: ${style.fontWeight};
  ${style.borderWidth > 0 ? `border: ${style.borderWidth}px ${style.borderStyle} ${style.accentColor};` : 'border: none;'}
  ${style.transitions ? 'transition: all 0.2s ease;' : ''}
  ${style.shadows ? 'box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff;' : ''}
  cursor: pointer;
}

${style.hoverEffects ? `
.${component.type}-component:hover {
  transform: scale(1.05);
  ${style.shadows ? 'box-shadow: 12px 12px 24px #d1d9e6, -12px -12px 24px #ffffff;' : ''}
}
` : ''}
`.trim()

  return css
}

export const generateHTML = (component: SelectedComponent): string => {
  const { type, name } = component
  
  switch (type) {
    case 'button':
      return `<button class="${type}-component">Sample Button</button>`
    case 'card':
      return `
<div class="${type}-component">
  <h3>Sample Card</h3>
  <p>This is a sample card component with customizable styling.</p>
</div>`.trim()
    case 'input':
      return `<input type="text" class="${type}-component" placeholder="Enter text here..." />`
    case 'badge':
      return `<span class="${type}-component">Badge</span>`
    case 'avatar':
      return `<div class="${type}-component">JD</div>`
    case 'modal':
      return `
<div class="modal-backdrop">
  <div class="${type}-component">
    <button class="modal-close">×</button>
    <h3>Sample Modal</h3>
    <p>This is a sample modal component.</p>
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

export const generateReactComponent = (component: SelectedComponent): string => {
  const { type, name, style } = component
  
  const styleObject = `{
  backgroundColor: '${style.backgroundColor}',
  color: '${style.textColor}',
  padding: '${style.padding}px ${style.padding * 1.5}px',
  borderRadius: '${style.borderRadius}px',
  margin: '${style.margin}px',
  fontSize: '${style.fontSize}px',
  fontWeight: '${style.fontWeight}',
  ${style.borderWidth > 0 ? `border: '${style.borderWidth}px ${style.borderStyle} ${style.accentColor}',` : 'border: "none",'}
  ${style.transitions ? 'transition: "all 0.2s ease",' : ''}
  ${style.shadows ? 'boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",' : ''}
  cursor: 'pointer'
}`

  switch (type) {
    case 'button':
      return `
import React from 'react'

const Custom${name} = () => {
  return (
    <button style={${styleObject}}>
      Sample Button
    </button>
  )
}

export default Custom${name}`.trim()
    
    case 'card':
      return `
import React from 'react'

const Custom${name} = () => {
  return (
    <div style={${styleObject}}>
      <h3>Sample Card</h3>
      <p>This is a sample card component with customizable styling.</p>
    </div>
  )
}

export default Custom${name}`.trim()
    
    default:
      return `
import React from 'react'

const Custom${name} = () => {
  return (
    <div style={${styleObject}}>
      {name}
    </div>
  )
}

export default Custom${name}`.trim()
  }
}

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}
