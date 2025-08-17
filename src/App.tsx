import React, { useState } from 'react'
import ComponentSelectorModal from './components/builder/ComponentSelectorModal'
import LivePreview from './components/builder/LivePreview'
import CustomizationPanel from './components/builder/CustomizationPanel'
import ExportModal from './components/builder/ExportModal'
import { useComponentStore } from './stores/componentStore'

function App() {
  const [showExportModal, setShowExportModal] = useState(false)
  const [showComponentSelector, setShowComponentSelector] = useState(false)
  const { selectedComponent } = useComponentStore()

  const handleSave = () => {
    if (selectedComponent) {
      const componentData = JSON.stringify(selectedComponent, null, 2)
      const blob = new Blob([componentData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${selectedComponent.name.toLowerCase()}-config.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }
  return (
    <div className="h-screen bg-gradient-to-br from-surface-100 via-surface-50 to-surface-200 flex flex-col overflow-hidden">
      {/* Top Header - Clean and Organized */}
      <div className="bg-gradient-to-br from-surface-50 to-surface-100 shadow-neumorphism border-b border-surface-200/50 flex-shrink-0">
        {/* Title and Controls Row */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-surface-200/30">
          {/* Left: App Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg shadow-neumorphism flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 2h2v2H7V4zm8 0h-2v2h2V4zM7 8h2v2H7V8zm8 0h-2v2h2V8zm-8 4h2v2H7v-2zm8 0h-2v2h2v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-secondary-800">UI Component Builder</h1>
              <span className="text-xs text-secondary-500 bg-gradient-to-r from-secondary-100 to-secondary-200 px-2 py-0.5 rounded-full shadow-neumorphism-inset border border-secondary-200/30">
                Beta
              </span>
            </div>
          </div>
          
          {/* Right: Controls */}
          <div className="flex space-x-3">
            <button 
              className="neumorphism-button text-sm px-4 py-2 flex items-center space-x-2"
              onClick={() => setShowComponentSelector(true)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Component</span>
            </button>
            <button 
              className={`flex items-center space-x-2 text-sm px-4 py-2 ${
                selectedComponent 
                  ? 'neumorphism-button-secondary' 
                  : 'neumorphism-button-secondary opacity-50 cursor-not-allowed'
              }`}
              onClick={() => selectedComponent && setShowExportModal(true)}
              disabled={!selectedComponent}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Export</span>
            </button>
            <button 
              className={`flex items-center space-x-2 text-sm px-4 py-2 ${
                selectedComponent 
                  ? 'neumorphism-button-primary' 
                  : 'neumorphism-button-primary opacity-50 cursor-not-allowed'
              }`}
              onClick={handleSave}
              disabled={!selectedComponent}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
              </svg>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Customization Panel */}
        <div className="w-80 border-r border-surface-200/50 bg-gradient-to-br from-surface-50 to-surface-100">
          <CustomizationPanel />
        </div>
        
        {/* Right: Live Preview */}
        <div className="flex-1 bg-gradient-to-br from-surface-50 to-surface-100">
          <LivePreview />
        </div>
      </div>
      
      {/* Export Modal */}
      <ExportModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
      />
      
      {/* Component Selector Modal */}
      <ComponentSelectorModal 
        isOpen={showComponentSelector} 
        onClose={() => setShowComponentSelector(false)} 
      />
    </div>
  )
}

export default App
