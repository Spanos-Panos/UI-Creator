import React from 'react'
import { ComponentStyle } from '../../stores/componentStore'

interface NavbarProps {
  style: ComponentStyle
  brand?: string
  links?: string[]
}

const Navbar: React.FC<NavbarProps> = ({ 
  style, 
  brand = "Brand",
  links = ['Home', 'About', 'Services', 'Contact']
}) => {
  const navbarStyle = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    padding: `${style.padding}px ${style.padding * 2}px`,
    borderRadius: `${style.borderRadius}px`,
    margin: `${style.margin}px`,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const brandStyle = {
    fontSize: `${style.fontSize * 1.2}px`,
    fontWeight: '700',
    color: style.accentColor,
  }

  const linkStyle = {
    color: style.textColor,
    textDecoration: 'none',
    padding: `${style.padding * 0.3}px ${style.padding * 0.6}px`,
    borderRadius: `${style.borderRadius * 0.5}px`,
    transition: style.transitions ? 'all 0.2s ease' : 'none',
    cursor: 'pointer',
  }

  const linkHoverStyle = {
    backgroundColor: style.accentColor,
    color: 'white',
    transform: style.hoverEffects ? 'scale(1.05)' : 'none',
  }

  return (
    <nav style={navbarStyle}>
      <div style={brandStyle}>
        {brand}
      </div>
      <div style={{ display: 'flex', gap: `${style.padding * 0.5}px` }}>
        {links.map((link, index) => (
          <a
            key={index}
            style={linkStyle}
            onMouseEnter={(e) => {
              if (style.hoverEffects) {
                Object.assign(e.currentTarget.style, { ...linkStyle, ...linkHoverStyle })
              }
            }}
            onMouseLeave={(e) => {
              if (style.hoverEffects) {
                Object.assign(e.currentTarget.style, linkStyle)
              }
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
