import React, { useState } from 'react'
import { useComponentStore } from '../../stores/componentStore'
import { getAllComponentConfigs } from '../../config/componentConfigs'

interface ComponentSelectorModalProps {
  isOpen: boolean
  onClose: () => void
}

const ComponentSelectorModal: React.FC<ComponentSelectorModalProps> = ({ isOpen, onClose }) => {
  const { setSelectedComponent, selectedComponent, createComponentFromType } = useComponentStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  if (!isOpen) return null

  const componentConfigs = getAllComponentConfigs()
  
  // Add some additional components that don't have full configs yet
  const additionalComponents = [
    { id: 'badge', name: 'Badge', category: 'Basic', description: 'Small label or status indicator' },
    { id: 'avatar', name: 'Avatar', category: 'Basic', description: 'User profile picture or initials' },
    { id: 'tooltip', name: 'Tooltip', category: 'Basic', description: 'Hover information popup' },
    { id: 'textarea', name: 'Textarea', category: 'Form', description: 'Multi-line text input' },
    { id: 'select', name: 'Select', category: 'Form', description: 'Dropdown selection' },
    { id: 'checkbox', name: 'Checkbox', category: 'Form', description: 'Multiple selection option' },
    { id: 'radio', name: 'Radio', category: 'Form', description: 'Single selection from group' },
    { id: 'switch', name: 'Switch', category: 'Form', description: 'Toggle on/off control' },
    { id: 'modal', name: 'Modal', category: 'Layout', description: 'Dialog overlay' },
    { id: 'navbar', name: 'Navbar', category: 'Layout', description: 'Navigation bar' },
    { id: 'alert', name: 'Alert', category: 'Feedback', description: 'Important message notification' },
    { id: 'progress', name: 'Progress', category: 'Feedback', description: 'Progress indicator' },
    { id: 'table', name: 'Table', category: 'Data', description: 'Data table with rows and columns' }
  ]

  // Convert configs to component format
  const configuredComponents = componentConfigs.map(config => ({
    id: config.id,
    name: config.name,
    category: config.category,
    description: config.description,
    hasAdvancedConfig: true,
    icon: getComponentIcon(config.id)
  }))

  // Combine all components
  const allComponents = [
    ...configuredComponents,
    ...additionalComponents.map(comp => ({
      ...comp,
      hasAdvancedConfig: false,
      icon: getComponentIcon(comp.id)
    }))
  ]

  function getComponentIcon(componentId: string) {
    const icons: Record<string, JSX.Element> = {
      button: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
        </svg>
      ),
      card: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
        </svg>
      ),
      input: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      badge: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
      ),
      avatar: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      ),
      // Default icon for others
      default: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
    }
    return icons[componentId] || icons.default
  }

  const categories = ['All', 'Basic', 'Form', 'Layout', 'Feedback', 'Data', 'Media', 'Advanced']
  
  const filteredComponents = selectedCategory === 'All' 
    ? allComponents 
    : allComponents.filter(comp => comp.category === selectedCategory)

  const handleComponentSelect = (component: any) => {
    if (component.hasAdvancedConfig) {
      // Use new configuration system
      const newComponent = createComponentFromType(component.id)
      if (newComponent) {
        setSelectedComponent(newComponent)
      }
    } else {
      // Fallback for components without advanced configs
      setSelectedComponent({
        id: component.id,
        name: component.name,
        type: component.id,
        style: {
          padding: '12px 16px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          transition: 'all 0.2s ease'
        },
        properties: { text: component.name },
        animations: [],
        hoverEffects: []
      })
    }
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
                    <div className="flex items-center justify-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full shadow-neumorphism-inset border ${
                        isSelected
                          ? 'text-primary-600 bg-gradient-to-r from-primary-100 to-primary-200 border-primary-200/50'
                          : 'text-secondary-500 bg-gradient-to-r from-secondary-100 to-secondary-200 border-secondary-200/30'
                      }`}>
                        {component.category}
                      </span>
                      {component.hasAdvancedConfig && (
                        <span className="text-xs bg-accent-100 text-accent-600 px-1.5 py-0.5 rounded-full">
                          ✨
                        </span>
                      )}
                    </div>
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