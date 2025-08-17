import React, { useState } from 'react'
import { useComponentStore } from '../../stores/componentStore'
import { COMPONENTS, getAllCategories } from '../../config/componentConfigs'

interface ComponentSelectorModalProps {
  isOpen: boolean
  onClose: () => void
}

const ComponentSelectorModal: React.FC<ComponentSelectorModalProps> = ({ isOpen, onClose }) => {
  const { setSelectedComponent, createComponent, selectedComponent } = useComponentStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  if (!isOpen) return null

  // Get all available components
  const allComponents = COMPONENTS.map(comp => ({
    ...comp,
    icon: getComponentIcon(comp.id)
  }))

  function getComponentIcon(componentId: string) {
    const icons: Record<string, JSX.Element> = {
      // Basic Components - Distinct shapes and designs
      button: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="9" width="16" height="6" rx="3" className="fill-current"/>
          <circle cx="8" cy="12" r="1" className="fill-white opacity-70"/>
        </svg>
      ),
      badge: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      avatar: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4"/>
          <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
        </svg>
      ),
      tooltip: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8-8-3.59-8-8zm6-3h4v2h-4V9zm0 4h4v6h-4v-6z"/>
          <path d="M12 2l-2 2h4l-2-2z"/>
        </svg>
      ),

      // Form Components - Input-specific designs  
      input: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="10" width="18" height="4" rx="2" className="fill-current"/>
          <line x1="6" y1="12" x2="18" y2="12" className="stroke-white stroke-2 opacity-50"/>
        </svg>
      ),
      textarea: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="6" width="18" height="12" rx="2" className="fill-current"/>
          <line x1="6" y1="9" x2="15" y2="9" className="stroke-white stroke-1 opacity-50"/>
          <line x1="6" y1="12" x2="18" y2="12" className="stroke-white stroke-1 opacity-50"/>
          <line x1="6" y1="15" x2="12" y2="15" className="stroke-white stroke-1 opacity-50"/>
        </svg>
      ),
      select: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="8" width="18" height="8" rx="2" className="fill-current"/>
          <path d="M16 10l2 2-2 2" className="stroke-white stroke-2 fill-none opacity-70"/>
        </svg>
      ),
      checkbox: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="5" y="5" width="14" height="14" rx="2" className="fill-current"/>
          <path d="M9 12l2 2 4-4" className="stroke-white stroke-2 fill-none opacity-80"/>
        </svg>
      ),
      radio: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" className="fill-current"/>
          <circle cx="12" cy="12" r="4" className="fill-white opacity-80"/>
        </svg>
      ),
      switch: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="9" width="16" height="6" rx="3" className="fill-current"/>
          <circle cx="15" cy="12" r="2.5" className="fill-white opacity-90"/>
        </svg>
      ),

      // Layout Components - Container designs
      card: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="3" className="fill-current"/>
          <rect x="6" y="8" width="12" height="2" rx="1" className="fill-white opacity-60"/>
          <rect x="6" y="12" width="8" height="1" rx="0.5" className="fill-white opacity-40"/>
          <rect x="6" y="14" width="10" height="1" rx="0.5" className="fill-white opacity-40"/>
        </svg>
      ),
      modal: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="2" className="fill-current opacity-30"/>
          <rect x="5" y="5" width="14" height="14" rx="2" className="fill-current"/>
          <circle cx="18" cy="7" r="1.5" className="fill-white opacity-80"/>
        </svg>
      ),
      navbar: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="6" width="20" height="4" rx="2" className="fill-current"/>
          <circle cx="6" cy="8" r="1" className="fill-white opacity-60"/>
          <rect x="10" y="7.5" width="3" height="1" rx="0.5" className="fill-white opacity-60"/>
          <rect x="16" y="7.5" width="2" height="1" rx="0.5" className="fill-white opacity-60"/>
        </svg>
      ),
      table: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="6" width="18" height="12" rx="2" className="fill-current"/>
          <line x1="3" y1="10" x2="21" y2="10" className="stroke-white stroke-1 opacity-50"/>
          <line x1="9" y1="6" x2="9" y2="18" className="stroke-white stroke-1 opacity-50"/>
          <line x1="15" y1="6" x2="15" y2="18" className="stroke-white stroke-1 opacity-50"/>
        </svg>
      ),

      // Feedback Components - Status designs  
      alert: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2zm0 6l-6 10h12L12 8z" className="fill-current"/>
          <circle cx="12" cy="16" r="1" className="fill-white"/>
          <rect x="11" y="10" width="2" height="4" className="fill-white"/>
        </svg>
      ),
      progress: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="10" width="18" height="4" rx="2" className="fill-current opacity-30"/>
          <rect x="3" y="10" width="12" height="4" rx="2" className="fill-current"/>
        </svg>
      ),
      spinner: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2s-.9-2-2-2c-3.31 0-6-2.69-6-6s2.69-6 6-6c3.31 0 6 2.69 6 6 0 1.1.9 2 2 2s2-.9 2-2c0-5.52-4.48-10-10-10z"/>
        </svg>
      ),

      // Default fallback
      default: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" className="fill-current"/>
          <rect x="6" y="6" width="12" height="2" rx="1" className="fill-white opacity-50"/>
          <rect x="6" y="10" width="8" height="2" rx="1" className="fill-white opacity-50"/>
          <rect x="6" y="14" width="10" height="2" rx="1" className="fill-white opacity-50"/>
        </svg>
      )
    }
    return icons[componentId] || icons.default
  }

  const categorySet = new Set(allComponents.map(c => c.category))
  const categories = ['All', ...Array.from(categorySet)]
  
  const filteredComponents = selectedCategory === 'All' 
    ? allComponents 
    : allComponents.filter(comp => comp.category === selectedCategory)

  const handleComponentSelect = (component: any) => {
    // Create a new component using the simplified structure
    const newComponent = createComponent(component.id, component.name)
    setSelectedComponent(newComponent)
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