import React from 'react'
import { useComponentStore } from '../../stores/componentStore'
import { 
  Button, Card, Input, Badge, Avatar, Modal, Textarea, Select, 
  Checkbox, Radio, Switch, Alert, Progress, Spinner, Navbar, Table, Tooltip 
} from '../ui'

const EnhancedLivePreview: React.FC = () => {
  const { selectedComponent, resetComponent } = useComponentStore()
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  function getAnimationClasses(component: any): string {
    if (!component?.animations?.length) return ''
    return component.animations.map((animId: string) => {
      // Map animation IDs to CSS classes
      const animationMap: Record<string, string> = {
        'bounce': 'animate-bounce-in',
        'pulse': 'animate-pulse-continuous',
        'shake': 'animate-shake-hover',
        'glow': 'animate-glow-pulse',
        'fadeInUp': 'animate-fade-in-up',
        'scaleIn': 'animate-scale-in',
        'slideInLeft': 'animate-slide-in-left',
        'slideIn': 'animate-slide-in',
        'focusRipple': 'animate-focus-ripple'
      }
      return animationMap[animId] || ''
    }).filter(Boolean).join(' ')
  }

  function getHoverEffectClasses(component: any): string {
    if (!component?.hoverEffects?.length) return ''
    return component.hoverEffects.map((effectId: string) => {
      // Map effect IDs to CSS classes
      const effectMap: Record<string, string> = {
        'lift': 'hover-lift',
        'liftCard': 'hover-lift-card',
        'scale': 'hover-scale',
        'scaleSubtle': 'hover-scale-subtle',
        'rotate': 'hover-rotate',
        'glow': 'hover-glow',
        'borderGlow': 'hover-border-glow',
        'neon': 'hover-neon',
        'tilt': 'hover-tilt',
        'parallax': 'hover-parallax',
        'ripple': 'hover-ripple'
      }
      return effectMap[effectId] || ''
    }).filter(Boolean).join(' ')
  }

  function applyEffectsToStyle(component: any, baseStyle: React.CSSProperties): React.CSSProperties {
    if (!component?.properties) return baseStyle

    const properties = component.properties
    const enhancedStyle: React.CSSProperties = { ...baseStyle }

    // Apply effect presets
    if (properties.effect) {
      switch (properties.effect) {
        case 'neumorphism':
          enhancedStyle.boxShadow = '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff'
          enhancedStyle.border = 'none'
          break
        case 'glass':
          enhancedStyle.background = 'rgba(255, 255, 255, 0.1)'
          enhancedStyle.backdropFilter = 'blur(10px)'
          enhancedStyle.border = '1px solid rgba(255, 255, 255, 0.2)'
          break
        case 'clay':
          enhancedStyle.background = 'rgba(255, 255, 255, 0.25)'
          enhancedStyle.backdropFilter = 'blur(4px)'
          enhancedStyle.border = '2px solid rgba(255, 255, 255, 0.18)'
          break
        case 'glow':
          enhancedStyle.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)'
          enhancedStyle.border = '1px solid rgba(59, 130, 246, 0.3)'
          break
      }
    }

    // Apply custom background image
    if (properties.backgroundImage && properties.backgroundImage !== '') {
      enhancedStyle.backgroundImage = `url(${properties.backgroundImage})`
      enhancedStyle.backgroundSize = enhancedStyle.backgroundSize || 'cover'
      enhancedStyle.backgroundPosition = 'center'
    }

    // Apply continuous animations
    if (properties.pulse) {
      enhancedStyle.animation = `${enhancedStyle.animation || ''} pulse 2s infinite`.trim()
    }
    
    if (properties.float) {
      enhancedStyle.animation = `${enhancedStyle.animation || ''} float 3s infinite ease-in-out`.trim()
    }

    if (properties.glowPulse) {
      enhancedStyle.animation = `${enhancedStyle.animation || ''} glowPulse 2s infinite`.trim()
    }

    return enhancedStyle
  }

  function renderComponent() {
    if (!selectedComponent) return null

    const { type, style, properties, animations, hoverEffects } = selectedComponent
    const animationClasses = getAnimationClasses(selectedComponent)
    const hoverClasses = getHoverEffectClasses(selectedComponent)
    const combinedClasses = `${animationClasses} ${hoverClasses}`.trim()

    // Apply advanced effects to the base style
    const enhancedStyle = applyEffectsToStyle(selectedComponent, style || {})

    switch (type) {
      // Basic Components
      case 'button':
        const buttonText = properties?.text || 'Button'
        return (
          <button 
            className={combinedClasses}
            style={enhancedStyle}
          >
            {buttonText}
          </button>
        )

      case 'card':
        const cardTitle = properties?.title || 'Card Title'
        const cardDescription = properties?.description || 'This is a sample card description that shows how your card will look.'
        const cardImage = properties?.image

        return (
          <div 
            className={`${combinedClasses} overflow-hidden`}
            style={{
              ...enhancedStyle,
              width: properties?.maxWidth || '320px',
              minHeight: '200px'
            }}
          >
            {cardImage && (
              <img 
                src={cardImage} 
                alt="Card" 
                className="w-full h-32 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            )}
            <div style={{ padding: properties?.padding || '24px' }}>
              <h3 className="font-semibold mb-2" style={{ 
                color: enhancedStyle.color,
                fontSize: '18px'
              }}>
                {cardTitle}
              </h3>
              <p style={{ 
                color: enhancedStyle.color || '#6b7280',
                fontSize: '14px',
                opacity: 0.8
              }}>
                {cardDescription}
              </p>
            </div>
          </div>
        )

      case 'input':
        const inputPlaceholder = properties?.placeholder || 'Enter text...'
        const inputLabel = properties?.label
        
        return (
          <div className="space-y-2">
            {inputLabel && (
              <label className="block text-sm font-medium" style={{ color: enhancedStyle.color }}>
                {inputLabel}
              </label>
            )}
            <input
              type={properties?.type || 'text'}
              placeholder={inputPlaceholder}
              className={combinedClasses}
              style={{
                ...enhancedStyle,
                width: properties?.fullWidth ? '300px' : '200px'
              }}
            />
          </div>
        )

      case 'badge':
        return (
          <span 
            className={combinedClasses}
            style={{
              ...enhancedStyle,
              display: 'inline-block',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: '500',
              borderRadius: '12px',
              backgroundColor: enhancedStyle.backgroundColor || '#3b82f6',
              color: enhancedStyle.color || '#ffffff'
            }}
          >
            {properties?.text || 'Badge'}
          </span>
        )

      case 'avatar':
        return (
          <div 
            className={combinedClasses}
            style={{
              ...enhancedStyle,
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: enhancedStyle.backgroundColor || '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: enhancedStyle.color || '#6b7280'
            }}
          >
            {properties?.initials || '👤'}
          </div>
        )

      case 'alert':
        return (
          <div 
            className={combinedClasses}
            style={{
              ...enhancedStyle,
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: enhancedStyle.backgroundColor || '#fef3c7',
              border: '1px solid #fbbf24',
              color: enhancedStyle.color || '#92400e',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '400px'
            }}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {properties?.message || 'This is an alert message'}
          </div>
        )

      case 'progress':
        const progressValue = properties?.value || 65
        return (
          <div className={combinedClasses} style={{ width: '300px' }}>
            <div 
              style={{
                height: '8px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden',
                ...enhancedStyle
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: enhancedStyle.backgroundColor || '#3b82f6',
                  width: `${progressValue}%`,
                  transition: 'width 0.3s ease',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div className="text-sm mt-2" style={{ color: enhancedStyle.color }}>
              {progressValue}% Complete
            </div>
          </div>
        )

      case 'table':
        return (
          <div className={combinedClasses} style={{ ...enhancedStyle, maxWidth: '500px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: enhancedStyle.backgroundColor || '#f3f4f6' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Role</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', role: 'Developer', status: 'Active' },
                  { name: 'Jane Smith', role: 'Designer', status: 'Active' },
                  { name: 'Bob Johnson', role: 'Manager', status: 'Inactive' }
                ].map((row, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'transparent' : '#f9fafb' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{row.name}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{row.role}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      // Fallback for other components
      default:
        return (
          <div 
            className={combinedClasses}
            style={{
              ...enhancedStyle,
              padding: '16px 24px',
              borderRadius: '8px',
              backgroundColor: enhancedStyle.backgroundColor || '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: enhancedStyle.color || '#374151'
            }}
          >
            {selectedComponent.name} Component
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="p-6 border-b border-surface-200/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-secondary-800 mb-1">
              Live Preview
            </h2>
            <p className="text-secondary-600">
              See your component in real-time with advanced animations and effects
            </p>
          </div>
          
          {/* Preview Controls */}
          <div className="flex items-center space-x-2">
            <button 
              className="neumorphism-button text-sm px-3 py-2 flex items-center space-x-2"
              onClick={resetComponent}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>Reset</span>
            </button>
            <button 
              className="neumorphism-button-secondary text-sm px-3 py-2 flex items-center space-x-2"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Preview Area */}
      <div className="flex-1 p-6">
        <div className="neumorphism h-full flex items-center justify-center relative overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Subtle Background Accents */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-accent-200 to-accent-300 rounded-full blur-2xl"></div>
          </div>
          
          {/* Content */}
          <div className="flex items-center justify-center relative z-10 h-full">
            {selectedComponent ? (
              <div className="flex items-center justify-center p-8">
                {renderComponent()}
              </div>
            ) : (
              <div className="text-center text-secondary-400">
                <div className="neumorphism-inset w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-secondary-700">Select a Component</h3>
                <p className="text-secondary-500 max-w-sm mb-6">
                  Choose from the component library to see it rendered here with live animations and effects
                </p>
                
                {/* Enhanced Sample Preview */}
                <div className="flex justify-center items-center space-x-6 mb-6">
                  <div className="neumorphism-button-secondary text-sm px-4 py-2 hover-lift transition-all duration-300">
                    ✨ Enhanced
                  </div>
                  <div className="neumorphism w-16 h-12 flex items-center justify-center hover-glow">
                    <div className="w-8 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-pulse-continuous"></div>
                  </div>
                  <div className="neumorphism-inset w-12 h-8 flex items-center justify-center hover-scale">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-glow-pulse"></div>
                  </div>
                </div>
                
                <div className="text-xs text-secondary-400">
                  Components now include advanced animations, hover effects, and styling options
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && selectedComponent && (
        <div className="fixed inset-0 bg-surface-100 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 neumorphism-button text-sm px-4 py-2 flex items-center space-x-2"
            onClick={() => setIsFullscreen(false)}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Close</span>
          </button>
          <div className="scale-150 transform">
            {renderComponent()}
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedLivePreview
