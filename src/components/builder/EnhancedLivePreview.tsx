import React, { useCallback } from 'react'
import { useComponentStore } from '../../stores/componentStore'

const EnhancedLivePreview: React.FC = () => {
  const { selectedComponent, resetComponent } = useComponentStore()
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  // Optimize callback functions
  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  const handleFullscreenClose = useCallback(() => {
    setIsFullscreen(false)
  }, [])

  const renderComponent = React.useMemo(() => {
    if (!selectedComponent) return null

    const { type, properties } = selectedComponent

    // Basic styling for preview
    const baseStyle: React.CSSProperties = {
      padding: '12px 16px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#374151',
      transition: 'all 0.2s ease'
    }

    switch (type) {
      case 'button':
        return (
          <button 
            style={{
              ...baseStyle,
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            {properties.text || 'Button'}
          </button>
        )
      
      case 'card':
        return (
          <div 
            style={{
              ...baseStyle,
              minWidth: '300px',
              minHeight: '200px',
              padding: '24px'
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>
              {properties.title || 'Card Title'}
            </h3>
            <p style={{ margin: '0', opacity: 0.8, lineHeight: 1.5 }}>
              {properties.description || 'This is a sample card with customizable content and styling.'}
            </p>
          </div>
        )

      case 'input':
        return (
          <input
            type="text"
            placeholder={properties.placeholder || 'Enter text...'}
            style={{
              ...baseStyle,
              minWidth: '200px',
              outline: 'none'
            }}
          />
        )

      case 'badge':
        return (
          <span
            style={{
              ...baseStyle,
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: '500',
              borderRadius: '12px',
              display: 'inline-block'
            }}
          >
            {properties.text || 'Badge'}
          </span>
        )

      case 'avatar':
        return (
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#6b7280',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '600'
            }}
          >
            {properties.initials || 'U'}
          </div>
        )

      case 'alert':
        return (
          <div
            style={{
              ...baseStyle,
              backgroundColor: '#fef3c7',
              borderColor: '#f59e0b',
              color: '#92400e',
              minWidth: '300px'
            }}
          >
            <strong>Alert: </strong>
            {properties.message || 'This is an alert message'}
          </div>
        )

      default:
        return (
          <div style={baseStyle}>
            <strong>{type}</strong> component
            <br />
            <small>Preview coming soon</small>
          </div>
        )
    }
  }, [selectedComponent])

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
              {selectedComponent ? `Previewing: ${selectedComponent.name}` : 'Select a component to preview'}
            </p>
          </div>
          
          {/* Preview Controls */}
          <div className="flex items-center space-x-2">
            {selectedComponent && (
              <>
                <button
                  onClick={handleFullscreenToggle}
                  className="neumorphism-button text-sm px-3 py-2 flex items-center space-x-1"
                  title="Fullscreen Preview"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 01-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Fullscreen</span>
                </button>
                <button
                  onClick={resetComponent}
                  className="neumorphism-button text-sm px-3 py-2 flex items-center space-x-1"
                  title="Clear Selection"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Clear</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        {selectedComponent ? (
          <div className="neumorphism-card bg-white/50 backdrop-blur-sm p-8 rounded-3xl min-w-0">
            <div className="flex items-center justify-center">
              {renderComponent}
            </div>
          </div>
        ) : (
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 neumorphism-inset rounded-3xl flex items-center justify-center">
              <svg className="w-12 h-12 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 2h2v2H7V4zm8 0h-2v2h2V4zM7 8h2v2H7V8zm8 0h-2v2h2V8zm-8 4h2v2H7v-2zm8 0h-2v2h2v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-secondary-700 mb-3">No Component Selected</h3>
            <p className="text-secondary-500 text-lg leading-relaxed">
              Choose a component from the library to see a live preview here
            </p>
          </div>
        )}
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && selectedComponent && (
        <div className="fixed inset-0 bg-surface-100 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 neumorphism-button text-sm px-4 py-2 flex items-center space-x-2"
            onClick={handleFullscreenClose}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Close</span>
          </button>
          <div className="scale-150 transform">
            {renderComponent}
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(EnhancedLivePreview)