import React, { useState } from 'react'
import { useComponentStore } from '../../stores/componentStore'
import { generateCSS, generateHTML, generateReactComponent, downloadFile, copyToClipboard } from '../../utils/exportUtils'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { selectedComponent } = useComponentStore()
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'react'>('html')
  const [copied, setCopied] = useState(false)

  if (!isOpen || !selectedComponent) return null

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
    const success = await copyToClipboard(getContent())
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    const content = getContent()
    const filename = `${selectedComponent.name.toLowerCase()}${getFileExtension()}`
    const mimeType = activeTab === 'html' ? 'text/html' : 
                    activeTab === 'css' ? 'text/css' : 
                    'text/typescript'
    downloadFile(content, filename, mimeType)
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
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'neumorphism-pressed text-primary-600 scale-95'
                    : 'neumorphism-button text-secondary-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
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
              className={`neumorphism-button-secondary text-sm px-4 py-2 flex items-center space-x-2 ${
                copied ? 'text-accent-600' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                {copied ? (
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                ) : (
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                )}
              </svg>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="neumorphism-button-primary text-sm px-4 py-2 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportModal
