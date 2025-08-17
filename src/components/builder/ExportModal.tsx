import React, { useState } from 'react'
import { useComponentStore } from '../../stores/componentStore'
import { generateCSS, generateHTML, generateReactComponent, downloadFile, copyToClipboard, validateComponentForExport } from '../../utils/exportUtils'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { selectedComponent } = useComponentStore()
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'react'>('html')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen || !selectedComponent) return null

  // Validate component before rendering
  const validation = validateComponentForExport(selectedComponent)
  if (!validation.valid) {
    return (
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
        <div className="neumorphism bg-surface-50 rounded-2xl max-w-md p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Export Error</h2>
          <div className="space-y-2">
            {validation.errors.map((error, index) => (
              <p key={index} className="text-sm text-red-500">• {error}</p>
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-4 neumorphism-button-secondary text-sm px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  const getContent = () => {
    switch (activeTab) {
      case 'html':
        return generateHTML(selectedComponent)
      case 'css':
        return generateCSS(selectedComponent)
      case 'react':
        return generateReactComponent(selectedComponent)
      default:
        return ''
    }
  }

  const getFileExtension = () => {
    switch (activeTab) {
      case 'html': return '.html'
      case 'css': return '.css'
      case 'react': return '.tsx'
      default: return '.txt'
    }
  }

  const handleCopy = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const content = getContent()
      const result = await copyToClipboard(content)
      
      if (result.success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        setError(result.error || 'Failed to copy to clipboard')
      }
    } catch (err) {
      setError('An unexpected error occurred while copying')
      console.error('Copy error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const content = getContent()
      const filename = `${selectedComponent.name.toLowerCase().replace(/\s+/g, '-')}${getFileExtension()}`
      const mimeType = activeTab === 'html' ? 'text/html' : 
                      activeTab === 'css' ? 'text/css' : 
                      'text/typescript'
      
      const success = await downloadFile(content, filename, mimeType)
      
      if (!success) {
        setError('Failed to download file. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred during download')
      console.error('Download error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Clear error when tab changes
  const handleTabChange = (tab: 'html' | 'css' | 'react') => {
    setActiveTab(tab)
    setError(null)
  }

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="neumorphism bg-surface-50 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-surface-200/50 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-secondary-800 mb-1">
              Export Component
            </h2>
            <p className="text-secondary-600">
              Export your {selectedComponent.name} component
            </p>
          </div>
          <button
            onClick={onClose}
            className="neumorphism-button text-sm px-4 py-2 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="p-6 pb-0">
          <div className="flex space-x-2">
            {[
              { key: 'html', label: 'HTML', icon: '🌐' },
              { key: 'css', label: 'CSS', icon: '🎨' },
              { key: 'react', label: 'React', icon: '⚛️' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key as 'html' | 'css' | 'react')}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'neumorphism-pressed text-primary-600 scale-95'
                    : 'neumorphism-button text-secondary-600'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-red-700 font-medium">Export Error</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
                aria-label="Dismiss error"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 pt-4">
          <div className="neumorphism-inset h-full rounded-xl p-4">
            <pre className="text-sm text-secondary-700 font-mono h-full overflow-auto whitespace-pre-wrap">
              {getContent()}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex justify-between items-center">
          <div className="text-sm text-secondary-500">
            {activeTab.toUpperCase()} • {selectedComponent.name}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleCopy}
              disabled={loading}
              className={`neumorphism-button-secondary text-sm px-4 py-2 flex items-center space-x-2 transition-all duration-200 ${
                copied ? 'text-accent-600' : ''
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  {copied ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8zM3 5a2 2 0 012-2 3 3 0 003 3h6a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L14.586 13H19v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11.586V9a1 1 0 00-1-1H9a1 1 0 00-1 1v2.586l1.293-1.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L7 11.586z"/>
                  )}
                </svg>
              )}
              <span>
                {loading ? 'Copying...' : copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
            <button
              onClick={handleDownload}
              disabled={loading}
              className={`neumorphism-button-primary text-sm px-4 py-2 flex items-center space-x-2 transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label={`Download ${activeTab} file`}
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              <span>{loading ? 'Downloading...' : 'Download'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportModal
