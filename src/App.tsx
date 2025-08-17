import React, { useState } from 'react'
import ComponentSelectorModal from './components/builder/ComponentSelectorModal'
import EnhancedLivePreview from './components/builder/EnhancedLivePreview'
import ExportModal from './components/builder/ExportModal'
import { ErrorBoundary } from './components/common'
import { useComponentStore } from './stores/componentStore'
import { downloadFile } from './utils/exportUtils'

function App() {
  const [showExportModal, setShowExportModal] = useState(false)
  const [showComponentSelector, setShowComponentSelector] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const { selectedComponent } = useComponentStore()

  const handleSave = async () => {
    if (!selectedComponent) return
    
    setSaveLoading(true)
    setSaveError(null)
    
    try {
      const componentData = JSON.stringify(selectedComponent, null, 2)
      const filename = `${selectedComponent.name.toLowerCase().replace(/\s+/g, '-')}-config.json`
      
      const success = await downloadFile(componentData, filename, 'application/json')
      
      if (!success) {
        setSaveError('Failed to save component configuration')
      }
    } catch (error) {
      console.error('Save error:', error)
      setSaveError('An unexpected error occurred while saving')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleErrorBoundary = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log to external service in production
    console.error('App Error Boundary:', error, errorInfo)
  }
  return (
    <ErrorBoundary onError={handleErrorBoundary}>
      <div className="h-screen bg-gradient-to-br from-surface-100 via-surface-50 to-surface-200 flex flex-col overflow-hidden">
        {/* Error Display for Save Operations */}
        {saveError && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-700">{saveError}</span>
            </div>
            <button
              onClick={() => setSaveError(null)}
              className="text-red-500 hover:text-red-700"
              aria-label="Dismiss error"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
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
              className={`flex items-center space-x-2 text-sm px-4 py-2 transition-all duration-200 ${
                selectedComponent && !saveLoading
                  ? 'neumorphism-button-primary' 
                  : 'neumorphism-button-primary opacity-50 cursor-not-allowed'
              }`}
              onClick={handleSave}
              disabled={!selectedComponent || saveLoading}
              aria-label={saveLoading ? 'Saving component configuration...' : 'Save component configuration'}
            >
              {saveLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
              )}
              <span>{saveLoading ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
      
        {/* Main Content Area - Full Width Preview */}
        <div className="flex-1 bg-gradient-to-br from-surface-50 to-surface-100">
          <ErrorBoundary>
            <EnhancedLivePreview />
          </ErrorBoundary>
        </div>
        
        {/* Export Modal */}
        <ErrorBoundary>
          <ExportModal 
            isOpen={showExportModal} 
            onClose={() => setShowExportModal(false)} 
          />
        </ErrorBoundary>
        
        {/* Component Selector Modal */}
        <ErrorBoundary>
          <ComponentSelectorModal 
            isOpen={showComponentSelector} 
            onClose={() => setShowComponentSelector(false)} 
          />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}

export default App
