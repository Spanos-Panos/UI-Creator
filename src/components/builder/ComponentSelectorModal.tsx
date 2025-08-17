import React, { useState } from 'react'
import { useComponentStore, defaultStyle } from '../../stores/componentStore'

interface ComponentSelectorModalProps {
  isOpen: boolean
  onClose: () => void
}

const ComponentSelectorModal: React.FC<ComponentSelectorModalProps> = ({ isOpen, onClose }) => {
  const { setSelectedComponent, selectedComponent } = useComponentStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  if (!isOpen) return null

  const components = [
    // Basic Components
    { 
      id: 'button', 
      name: 'Button', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic',
      description: 'Clickable button for actions'
    },
    { 
      id: 'badge', 
      name: 'Badge', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic',
      description: 'Small label or status indicator'
    },
    { 
      id: 'avatar', 
      name: 'Avatar', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic',
      description: 'User profile picture or initials'
    },
    { 
      id: 'tooltip', 
      name: 'Tooltip', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic',
      description: 'Hover information popup'
    },

    // Form Components
    { 
      id: 'input', 
      name: 'Input', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form',
      description: 'Text input field'
    },
    { 
      id: 'textarea', 
      name: 'Textarea', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form',
      description: 'Multi-line text input'
    },
    { 
      id: 'select', 
      name: 'Select', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form',
      description: 'Dropdown selection'
    },
    { 
      id: 'checkbox', 
      name: 'Checkbox', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form',
      description: 'Multiple selection option'
    },
    { 
      id: 'radio', 
      name: 'Radio', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form',
      description: 'Single selection from group'
    },
    { 
      id: 'switch', 
      name: 'Switch', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
        </svg>
      ), 
      category: 'Form',
      description: 'Toggle on/off control'
    },

    // Layout Components
    { 
      id: 'card', 
      name: 'Card', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout',
      description: 'Content container'
    },
    { 
      id: 'modal', 
      name: 'Modal', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout',
      description: 'Dialog overlay'
    },
    { 
      id: 'navbar', 
      name: 'Navbar', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout',
      description: 'Navigation bar'
    },

    // Feedback Components
    { 
      id: 'alert', 
      name: 'Alert', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Feedback',
      description: 'Important message notification'
    },
    { 
      id: 'progress', 
      name: 'Progress', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Feedback',
      description: 'Progress indicator'
    },

    // Data Components
    { 
      id: 'table', 
      name: 'Table', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Data',
      description: 'Data table with rows and columns'
    },
  ]

  const categories = ['All', 'Basic', 'Form', 'Layout', 'Feedback', 'Data', 'Media', 'Advanced']
  
  const filteredComponents = selectedCategory === 'All' 
    ? components 
    : components.filter(comp => comp.category === selectedCategory)

  const handleComponentSelect = (component: any) => {
    setSelectedComponent({
      id: component.id,
      name: component.name,
      type: component.id,
      style: { ...defaultStyle }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="neumorphism bg-surface-50 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-surface-200/50 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-secondary-800 mb-1">
              Choose a Component
            </h2>
            <p className="text-secondary-600">
              Select a component to start customizing
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

        {/* Category Tabs */}
        <div className="p-6 pb-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'neumorphism-pressed text-primary-600 scale-95 bg-gradient-to-r from-primary-50 to-primary-100'
                    : 'neumorphism-button text-secondary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Components Grid */}
        <div className="flex-1 p-6 pt-4 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredComponents.map((component) => {
              const isSelected = selectedComponent?.id === component.id
              return (
                <div
                  key={component.id}
                  className={`cursor-pointer p-4 rounded-xl transition-all duration-200 ${
                    isSelected 
                      ? 'neumorphism-pressed scale-95 bg-gradient-to-br from-primary-100 to-primary-200' 
                      : 'neumorphism-card hover:scale-105'
                  }`}
                  onClick={() => handleComponentSelect(component)}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-xl shadow-neumorphism-inset border flex items-center justify-center mx-auto mb-3 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-primary-200 to-primary-300 text-primary-700 border-primary-300/50'
                        : 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 border-primary-200/30'
                    }`}>
                      {component.icon}
                    </div>
                    <h3 className="font-semibold text-secondary-700 mb-1">{component.name}</h3>
                    <p className="text-xs text-secondary-500 mb-2">{component.description}</p>
                    <span className={`text-xs px-2 py-1 rounded-full shadow-neumorphism-inset border ${
                      isSelected
                        ? 'text-primary-600 bg-gradient-to-r from-primary-100 to-primary-200 border-primary-200/50'
                        : 'text-secondary-500 bg-gradient-to-r from-secondary-100 to-secondary-200 border-secondary-200/30'
                    }`}>
                      {component.category}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentSelectorModal
