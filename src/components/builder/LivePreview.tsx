import React from 'react'
import { useComponentStore } from '../../stores/componentStore'
import { 
  Button, Card, Input, Badge, Avatar, Modal, Textarea, Select, 
  Checkbox, Radio, Switch, Alert, Progress, Spinner, Navbar, Table, Tooltip 
} from '../ui'

const LivePreview: React.FC = () => {
  const { selectedComponent, resetComponent } = useComponentStore()
  const [isFullscreen, setIsFullscreen] = React.useState(false)
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
              See your component in real-time as you customize it
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
      
      {/* Preview Area - Takes remaining space */}
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
              <div className="flex items-center justify-center">
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
                  Choose from the component library to see it rendered here with live customization
                </p>
                
                {/* Sample Components Preview */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className="neumorphism-button-secondary text-sm px-4 py-2">
                    Sample Button
                  </div>
                  <div className="neumorphism w-16 h-12 flex items-center justify-center">
                    <div className="w-8 h-2 bg-gradient-to-r from-secondary-300 to-secondary-400 rounded-full"></div>
                  </div>
                  <div className="neumorphism-inset w-12 h-8 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                  </div>
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
          <div className="scale-150">
            {renderComponent()}
          </div>
        </div>
      )}
    </div>
  )

  function renderComponent() {
    if (!selectedComponent) return null

    const { type, style } = selectedComponent

    switch (type) {
      // Basic Components
      case 'button':
        return <Button style={style} />
      case 'badge':
        return <Badge style={style} />
      case 'avatar':
        return <Avatar style={style} />
      case 'tooltip':
        return <Tooltip style={style} />
      case 'divider':
        return <div style={{
          width: '200px',
          height: `${parseInt(style.borderWidth || '1')}px`,
          backgroundColor: style.backgroundColor || '#e5e7eb',
          margin: style.margin || '8px',
          borderRadius: style.borderRadius || '0px',
        }} />
      
      // Form Components
      case 'input':
        return <Input style={style} />
      case 'textarea':
        return <Textarea style={style} />
      case 'select':
        return <Select style={style} />
      case 'checkbox':
        return <Checkbox style={style} />
      case 'radio':
        return <Radio style={style} />
      case 'switch':
        return <Switch style={style} />
      case 'slider':
        return (
          <input 
            type="range" 
            style={{
              width: '200px',
              height: `${parseInt(style.fontSize || '14') * 0.5}px`,
              backgroundColor: style.backgroundColor || '#ffffff',
              borderRadius: style.borderRadius || '8px',
              margin: style.margin || '8px',
              accentColor: style.backgroundColor || '#3b82f6',
            }}
          />
        )
      
      // Layout Components
      case 'card':
        return <Card style={style} />
      case 'modal':
        return <Modal style={style} />
      case 'navbar':
        return <Navbar style={style} />
      case 'sidebar':
        return (
          <div style={{
            width: '250px',
            backgroundColor: style.backgroundColor || '#ffffff',
            padding: style.padding || '16px',
            borderRight: style.border || '1px solid #e5e7eb',
            height: '300px',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: `${parseInt(style.fontSize || '14') * 1.1}px` }}>Sidebar</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: `1px solid ${style.backgroundColor || '#e5e7eb'}20` }}>Menu Item 1</li>
              <li style={{ padding: '8px 0', borderBottom: `1px solid ${style.backgroundColor || '#e5e7eb'}20` }}>Menu Item 2</li>
              <li style={{ padding: '8px 0', borderBottom: `1px solid ${style.backgroundColor || '#e5e7eb'}20` }}>Menu Item 3</li>
            </ul>
          </div>
        )
      case 'breadcrumb':
        return (
          <nav style={{
            backgroundColor: style.backgroundColor || '#ffffff',
            padding: style.padding || '12px',
            borderRadius: style.borderRadius || '8px',
            border: style.border || '1px solid #e5e7eb',
            margin: style.margin || '8px',
            fontSize: style.fontSize || '14px',
            color: style.color || '#374151'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: style.color || '#374151' }}>Home</span>
              <span style={{ margin: '0 8px', color: style.backgroundColor || '#3b82f6' }}>/</span>
              <span style={{ color: style.color || '#374151' }}>Section</span>
              <span style={{ margin: '0 8px', color: style.backgroundColor || '#3b82f6' }}>/</span>
              <span style={{ color: style.backgroundColor || '#3b82f6' }}>Current Page</span>
            </div>
          </nav>
        )
      case 'tabs':
        return (
          <div style={{ margin: `${style.margin}px` }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${style.accentColor}20` }}>
              {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: index === 0 ? style.accentColor : 'transparent',
                    color: index === 0 ? 'white' : style.textColor,
                    padding: `${style.padding * 0.8}px ${style.padding}px`,
                    border: 'none',
                    borderRadius: `${style.borderRadius}px ${style.borderRadius}px 0 0`,
                    fontSize: `${style.fontSize}px`,
                    cursor: 'pointer',
                    marginRight: '2px',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={{
              backgroundColor: style.backgroundColor,
              padding: `${style.padding}px`,
              borderRadius: `0 0 ${style.borderRadius}px ${style.borderRadius}px`,
              boxShadow: style.shadows ? '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff' : 'none',
            }}>
              Tab content goes here
            </div>
          </div>
        )
      
      // Feedback Components
      case 'alert':
        return <Alert style={style} />
      case 'toast':
        return (
          <div style={{
            backgroundColor: style.accentColor,
            color: 'white',
            padding: `${style.padding}px`,
            borderRadius: `${style.borderRadius}px`,
            margin: `${style.margin}px`,
            fontSize: `${style.fontSize}px`,
            boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
            minWidth: '250px',
            position: 'relative' as const,
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Toast notification message</span>
            </div>
          </div>
        )
      case 'progress':
        return <Progress style={style} />
      case 'spinner':
        return <Spinner style={style} />
      
      // Data Components
      case 'table':
        return <Table style={style} />
      case 'list':
        return (
          <ul style={{
            backgroundColor: style.backgroundColor,
            color: style.textColor,
            padding: `${style.padding}px`,
            borderRadius: `${style.borderRadius}px`,
            margin: `${style.margin}px`,
            fontSize: `${style.fontSize}px`,
            listStyle: 'none',
            boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
            border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
          }}>
            {['List Item 1', 'List Item 2', 'List Item 3', 'List Item 4'].map((item, index) => (
              <li key={index} style={{
                padding: `${style.padding * 0.5}px 0`,
                borderBottom: index < 3 ? `1px solid ${style.accentColor}20` : 'none',
              }}>
                {item}
              </li>
            ))}
          </ul>
        )
      case 'pagination':
        return (
          <div style={{
            display: 'flex',
            gap: style.margin || '8px',
            margin: style.margin || '8px',
          }}>
            {['←', '1', '2', '3', '→'].map((item, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: index === 2 ? style.backgroundColor || '#3b82f6' : style.backgroundColor || '#ffffff',
                  color: index === 2 ? 'white' : style.color || '#374151',
                  padding: `${parseInt(style.padding || '12') * 0.5}px ${parseInt(style.padding || '12') * 0.8}px`,
                  borderRadius: style.borderRadius || '8px',
                  border: style.border || 'none',
                  fontSize: style.fontSize || '14px',
                  cursor: 'pointer',
                  boxShadow: style.boxShadow || 'none',
                  transition: style.transition || 'all 0.2s ease',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )
      
      // Media Components
      case 'image':
        return (
          <div style={{
            backgroundColor: style.backgroundColor,
            borderRadius: `${style.borderRadius}px`,
            margin: `${style.margin}px`,
            border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
            boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
            width: '200px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: style.textColor,
            fontSize: `${style.fontSize}px`,
            overflow: 'hidden',
          }}>
            <svg style={{ width: '50px', height: '50px', opacity: 0.5 }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'video':
        return (
          <div style={{
            backgroundColor: style.backgroundColor,
            borderRadius: `${style.borderRadius}px`,
            margin: `${style.margin}px`,
            border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
            boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
            width: '300px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: style.textColor,
            position: 'relative' as const,
          }}>
            <svg style={{ width: '60px', height: '60px', opacity: 0.7 }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              right: '10px',
              height: '4px',
              backgroundColor: style.accentColor,
              borderRadius: '2px',
              opacity: 0.8,
            }} />
          </div>
        )
      
      // Advanced Components  
      case 'dropdown':
        return (
          <div style={{ position: 'relative', margin: `${style.margin}px` }}>
            <button style={{
              backgroundColor: style.backgroundColor,
              color: style.textColor,
              padding: `${style.padding}px`,
              borderRadius: `${style.borderRadius}px`,
              border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
              fontSize: `${style.fontSize}px`,
              cursor: 'pointer',
              boxShadow: style.shadows ? '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              Dropdown
              <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: style.backgroundColor,
              borderRadius: `${style.borderRadius}px`,
              boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
              border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
              marginTop: '4px',
              zIndex: 10,
            }}>
              {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
                <div key={index} style={{
                  padding: `${style.padding * 0.7}px`,
                  fontSize: `${style.fontSize}px`,
                  cursor: 'pointer',
                  borderBottom: index < 2 ? `1px solid ${style.accentColor}20` : 'none',
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )
      
      // Feedback Components
      case 'alert':
        return <Alert style={style} />
      case 'toast':
        return (
          <div style={{
            backgroundColor: style.accentColor,
            color: 'white',
            padding: `${style.padding}px`,
            borderRadius: `${style.borderRadius}px`,
            margin: `${style.margin}px`,
            fontSize: `${style.fontSize}px`,
            boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
            minWidth: '250px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Toast notification</span>
          </div>
        )
      case 'progress':
        return <Progress style={style} />
      case 'spinner':
        return <Spinner style={style} />
      
      // Data Components
      case 'table':
        return <Table style={style} />
      case 'list':
        return (
          <ul style={{
            backgroundColor: style.backgroundColor,
            color: style.textColor,
            padding: `${style.padding}px`,
            borderRadius: `${style.borderRadius}px`,
            margin: `${style.margin}px`,
            fontSize: `${style.fontSize}px`,
            listStyle: 'none',
            boxShadow: style.shadows ? '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff' : 'none',
            border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
            minWidth: '200px',
          }}>
            {['List Item 1', 'List Item 2', 'List Item 3', 'List Item 4'].map((item, index) => (
              <li key={index} style={{
                padding: `${style.padding * 0.5}px 0`,
                borderBottom: index < 3 ? `1px solid ${style.accentColor}20` : 'none',
              }}>
                {item}
              </li>
            ))}
          </ul>
        )
      case 'pagination':
        return (
          <div style={{
            display: 'flex',
            gap: `${style.margin}px`,
            margin: `${style.margin}px`,
          }}>
            {['←', '1', '2', '3', '→'].map((item, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: index === 2 ? style.accentColor : style.backgroundColor,
                  color: index === 2 ? 'white' : style.textColor,
                  padding: `${style.padding * 0.5}px ${style.padding * 0.8}px`,
                  borderRadius: `${style.borderRadius}px`,
                  border: style.borderWidth > 0 ? `${style.borderWidth}px ${style.borderStyle} ${style.accentColor}` : 'none',
                  fontSize: `${style.fontSize}px`,
                  cursor: 'pointer',
                  boxShadow: style.shadows ? '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff' : 'none',
                  transition: style.transitions ? 'all 0.2s ease' : 'none',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )
      
      default:
        return <div style={{ color: style.textColor }}>Component "{type}" not implemented yet</div>
    }
  }
}

export default LivePreview
