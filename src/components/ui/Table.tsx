import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface TableProps {
  style: ComponentStyle
  headers?: string[]
  data?: string[][]
}

const Table: React.FC<TableProps> = ({ 
  style, 
  headers = ['Name', 'Email', 'Role', 'Status'],
  data = [
    ['John Doe', 'john@example.com', 'Admin', 'Active'],
    ['Jane Smith', 'jane@example.com', 'User', 'Active'],
    ['Bob Johnson', 'bob@example.com', 'User', 'Inactive'],
  ]
}) => {
  const tableStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
    borderCollapse: 'collapse' as const,
    width: '100%',
    maxWidth: '500px',
  }

  const headerStyle = {
    backgroundColor: style.accentColor,
    color: 'white',
    padding: `${style.padding}px`,
    borderBottom: `1px solid ${style.accentColor}`,
    fontWeight: '600',
  }

  const cellStyle = {
    padding: `${style.padding * 0.8}px`,
    borderBottom: `1px solid ${style.accentColor}20`,
  }

  const rowStyle = {
    transition: style.transitions ? 'all 0.2s ease' : 'none',
  }

  const rowHoverStyle = style.hoverEffects ? {
    backgroundColor: `${style.accentColor}10`,
    transform: 'scale(1.01)',
  } : {}

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={headerStyle}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            style={rowStyle}
            onMouseEnter={(e) => {
              if (style.hoverEffects) {
                Object.assign(e.currentTarget.style, { ...rowStyle, ...rowHoverStyle })
              }
            }}
            onMouseLeave={(e) => {
              if (style.hoverEffects) {
                Object.assign(e.currentTarget.style, rowStyle)
              }
            }}
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={cellStyle}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
