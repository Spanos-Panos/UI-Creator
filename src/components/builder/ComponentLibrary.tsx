import React from 'react'
import { useComponentStore } from '../../stores/componentStore'

const ComponentLibrary: React.FC = () => {
  const { setSelectedComponent, selectedComponent } = useComponentStore()
  
  const components = [
    // Basic Components
    { 
      id: 'button', 
      name: 'Button', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 000 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic' 
    },
    { 
      id: 'badge', 
      name: 'Badge', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic' 
    },
    { 
      id: 'avatar', 
      name: 'Avatar', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic' 
    },
    { 
      id: 'tooltip', 
      name: 'Tooltip', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic' 
    },
    { 
      id: 'divider', 
      name: 'Divider', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Basic' 
    },

    // Form Components
    { 
      id: 'input', 
      name: 'Input', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form' 
    },
    { 
      id: 'textarea', 
      name: 'Textarea', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form' 
    },
    { 
      id: 'select', 
      name: 'Select', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form' 
    },
    { 
      id: 'checkbox', 
      name: 'Checkbox', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form' 
    },
    { 
      id: 'radio', 
      name: 'Radio', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form' 
    },
    { 
      id: 'switch', 
      name: 'Switch', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
        </svg>
      ), 
      category: 'Form' 
    },
    { 
      id: 'slider', 
      name: 'Slider', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 6a4 4 0 108 0H6zM6 14a4 4 0 108 0H6z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Form' 
    },

    // Layout Components
    { 
      id: 'card', 
      name: 'Card', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout' 
    },
    { 
      id: 'modal', 
      name: 'Modal', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout' 
    },
    { 
      id: 'navbar', 
      name: 'Navbar', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout' 
    },
    { 
      id: 'sidebar', 
      name: 'Sidebar', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM9 4a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zM9 8a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zM9 12a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout' 
    },
    { 
      id: 'breadcrumb', 
      name: 'Breadcrumb', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Layout' 
    },
    { 
      id: 'tabs', 
      name: 'Tabs', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ), 
      category: 'Layout' 
    },

    // Feedback Components
    { 
      id: 'alert', 
      name: 'Alert', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Feedback' 
    },
    { 
      id: 'toast', 
      name: 'Toast', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Feedback' 
    },
    { 
      id: 'progress', 
      name: 'Progress', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Feedback' 
    },
    { 
      id: 'spinner', 
      name: 'Spinner', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Feedback' 
    },

    // Data Components
    { 
      id: 'table', 
      name: 'Table', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Data' 
    },
    { 
      id: 'list', 
      name: 'List', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Data' 
    },
    { 
      id: 'pagination', 
      name: 'Pagination', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Data' 
    },

    // Media Components
    { 
      id: 'image', 
      name: 'Image', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Media' 
    },
    { 
      id: 'video', 
      name: 'Video', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      ), 
      category: 'Media' 
    },
    { 
      id: 'carousel', 
      name: 'Carousel', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm12 14H4V4h12v12z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Media' 
    },

    // Advanced Components
    { 
      id: 'dropdown', 
      name: 'Dropdown', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Advanced' 
    },
    { 
      id: 'accordion', 
      name: 'Accordion', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Advanced' 
    },
    { 
      id: 'calendar', 
      name: 'Calendar', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Advanced' 
    },
    { 
      id: 'datepicker', 
      name: 'DatePicker', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ), 
      category: 'Advanced' 
    }
  ]

  const [selectedCategory, setSelectedCategory] = React.useState<string>('All')
  const categories = ['All', 'Basic', 'Form', 'Layout', 'Feedback', 'Data', 'Media', 'Advanced']
  
  const filteredComponents = selectedCategory === 'All' 
    ? components 
    : components.filter(comp => comp.category === selectedCategory)

  return (
    <div className="h-full flex flex-col">
      {/* Category Filter */}
      <div className="flex items-center space-x-1 mb-3">
        <span className="text-xs font-medium text-secondary-600 mr-2">Categories:</span>
        <div className="flex space-x-1 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs px-3 py-1 rounded-lg transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category
                  ? 'neumorphism-pressed scale-95 text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100'
                  : 'neumorphism-button text-secondary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Components Grid - Scrollable */}
      <div className="flex-1 overflow-x-auto component-scroll">
        <div className="flex items-center space-x-2 min-w-max pb-2">
          {filteredComponents.map((component) => {
            const isSelected = selectedComponent?.id === component.id
            return (
              <div
                key={component.id}
                className={`cursor-pointer px-2 py-1 group transition-all duration-200 flex-shrink-0 rounded-lg ${
                  isSelected 
                    ? 'neumorphism-pressed scale-95 bg-gradient-to-br from-primary-100 to-primary-200' 
                    : 'neumorphism-card hover:scale-105'
                }`}
                onClick={() => handleComponentSelect(component)}
              >
                <div className="flex flex-col items-center space-y-1 min-w-[60px]">
                  <div className={`w-7 h-7 rounded-lg shadow-neumorphism-inset border flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${
                    isSelected 
                      ? 'bg-gradient-to-br from-primary-200 to-primary-300 text-primary-700 border-primary-300/50'
                      : 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 border-primary-200/30'
                  }`}>
                    {component.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-secondary-700 whitespace-nowrap">{component.name}</div>
                    <div className={`text-xs px-1 py-0.5 rounded-full shadow-neumorphism-inset border ${
                      isSelected
                        ? 'text-primary-600 bg-gradient-to-r from-primary-100 to-primary-200 border-primary-200/50'
                        : 'text-secondary-500 bg-gradient-to-r from-secondary-100 to-secondary-200 border-secondary-200/30'
                    }`}>
                      {component.category}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  function handleComponentSelect(component: any) {
    const { createComponent } = useComponentStore.getState()
    const newComponent = createComponent(component.id, component.name)
    setSelectedComponent(newComponent)
  }
}

export default ComponentLibrary
