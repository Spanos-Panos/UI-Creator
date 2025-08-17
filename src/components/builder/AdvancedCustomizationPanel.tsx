import React, { useState } from 'react'
import { useComponentStore } from '../../stores/componentStore'
import { ComponentProperty } from '../../config/componentConfigs'

const AdvancedCustomizationPanel: React.FC = () => {
  const { selectedComponent, updateComponentProperty, updateComponentStyle, addAnimation, removeAnimation, addHoverEffect, removeHoverEffect } = useComponentStore()
  const [activeTab, setActiveTab] = useState<'properties' | 'styling' | 'effects' | 'animations' | 'responsive'>('properties')

  if (!selectedComponent || !selectedComponent.config) {
    return (
      <div className="h-full flex items-center justify-center text-secondary-500">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 neumorphism-inset rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-semibold text-secondary-700 mb-2">No Component Selected</h3>
          <p className="text-sm">Select a component to customize its properties</p>
        </div>
      </div>
    )
  }

  const { config, properties, animations, hoverEffects } = selectedComponent
  
  const getPropertiesByCategory = (category: string) => {
    return config.properties.filter(prop => prop.category === category)
  }

  const renderPropertyControl = (property: ComponentProperty) => {
    const value = properties[property.id] ?? property.defaultValue

    const handlePropertyChange = (newValue: any) => {
      updateComponentProperty(property.id, newValue)
      
      // Apply immediate style changes for certain properties
      applyPropertyToStyle(property.id, newValue)
    }

    const applyPropertyToStyle = (propertyId: string, value: any) => {
      const styleUpdates: Record<string, any> = {}
      
      switch (propertyId) {
        case 'color':
        case 'backgroundColor':
        case 'textColor':
          styleUpdates[propertyId === 'textColor' ? 'color' : propertyId] = value
          break
        case 'borderRadius':
          styleUpdates.borderRadius = `${value}px`
          break
        case 'padding':
          if (typeof value === 'string') {
            styleUpdates.padding = value
          } else {
            styleUpdates.padding = `${value}px`
          }
          break
        case 'fontSize':
          styleUpdates.fontSize = `${value}px`
          break
        case 'fontWeight':
          styleUpdates.fontWeight = value
          break
        case 'width':
        case 'height':
          styleUpdates[propertyId] = value === 'auto' ? value : `${value}px`
          break
      }
      
      if (Object.keys(styleUpdates).length > 0) {
        updateComponentStyle(styleUpdates)
      }
    }

    switch (property.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg border-0 bg-surface-100"
            placeholder={property.label}
          />
        )
        
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg border-0 bg-surface-100 resize-none"
            rows={3}
            placeholder={property.label}
          />
        )
        
      case 'number':
      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={property.min || 0}
              max={property.max || 100}
              step={property.step || 1}
              value={value}
              onChange={(e) => handlePropertyChange(Number(e.target.value))}
              className="w-full slider-neumorphism"
            />
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={value}
                onChange={(e) => handlePropertyChange(Number(e.target.value))}
                className="w-16 px-2 py-1 text-xs neumorphism-inset rounded border-0 bg-surface-100"
              />
              <span className="text-xs text-secondary-500">
                {property.unit || ''}
              </span>
            </div>
          </div>
        )
        
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="color"
                value={value}
                onChange={(e) => handlePropertyChange(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 border-surface-300 cursor-pointer opacity-0 absolute inset-0"
              />
              <div 
                className="w-10 h-10 rounded-lg shadow-neumorphism-inset border-2 border-surface-300"
                style={{ backgroundColor: value }}
              />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => handlePropertyChange(e.target.value)}
              className="flex-1 px-3 py-2 text-sm neumorphism-inset rounded-lg border-0 bg-surface-100"
            />
          </div>
        )
        
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg border-0 bg-surface-100"
          >
            {property.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
        
      case 'boolean':
        return (
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handlePropertyChange(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-all duration-200 ${
                value ? 'neumorphism-pressed bg-primary-100' : 'neumorphism bg-surface-200'
              }`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ${
                  value ? 'translate-x-6' : 'translate-x-1'
                } mt-1`} />
              </div>
            </div>
            <span className="text-sm text-secondary-700">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        )
        
      case 'spacing':
        return (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => handlePropertyChange(e.target.value)}
              className="px-3 py-2 text-sm neumorphism-inset rounded-lg border-0 bg-surface-100"
              placeholder="e.g. 12px, 1rem"
            />
            <div className="flex space-x-1">
              {['4px', '8px', '16px', '24px'].map(preset => (
                <button
                  key={preset}
                  onClick={() => handlePropertyChange(preset)}
                  className="flex-1 px-2 py-1 text-xs neumorphism-button rounded"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )
        
      case 'gradient':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={value}
              onChange={(e) => handlePropertyChange(e.target.value)}
              placeholder="linear-gradient(135deg, #667eea, #764ba2)"
              className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg border-0 bg-surface-100"
            />
            <div className="flex space-x-2 text-xs text-secondary-500">
              <button onClick={() => handlePropertyChange('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')} className="neumorphism-button px-2 py-1 rounded">Purple</button>
              <button onClick={() => handlePropertyChange('linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)')} className="neumorphism-button px-2 py-1 rounded">Sunset</button>
              <button onClick={() => handlePropertyChange('linear-gradient(135deg, #11998e 0%, #38ef7d 100%)')} className="neumorphism-button px-2 py-1 rounded">Forest</button>
            </div>
          </div>
        )

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg border-0 bg-surface-100"
          />
        )
    }
  }

  const tabs = [
    { id: 'properties', label: 'Properties', icon: '⚙️' },
    { id: 'styling', label: 'Styling', icon: '🎨' },
    { id: 'effects', label: 'Effects', icon: '✨' },
    { id: 'animations', label: 'Animations', icon: '🎬' },
    { id: 'responsive', label: 'Responsive', icon: '📱' }
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-surface-50 to-surface-100">
      {/* Header */}
      <div className="p-4 border-b border-surface-200/50">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 neumorphism rounded-lg flex items-center justify-center">
            <span className="text-lg">{config.icon || '⚙️'}</span>
          </div>
          <div>
            <h2 className="text-base font-semibold text-secondary-800">{selectedComponent.name}</h2>
            <p className="text-xs text-secondary-500">{config.description}</p>
          </div>
        </div>
        {/* Tabs */}
        <div className="grid grid-cols-5 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2 py-1.5 text-[11px] font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'neumorphism-pressed scale-95 text-primary-600'
                  : 'neumorphism-button text-secondary-600 hover:text-secondary-700'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {activeTab === 'properties' && (
          <div className="space-y-4">
            {['content', 'layout', 'behavior'].map(category => {
              const categoryProps = getPropertiesByCategory(category)
              if (categoryProps.length === 0) return null
              
              return (
                <div key={category} className="space-y-3">
                  <h3 className="text-xs font-semibold text-secondary-700 uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {categoryProps.map(property => (
                      <div key={property.id} className="space-y-1.5">
                        <label className="block text-xs font-medium text-secondary-600">
                          {property.label}
                        </label>
                        {renderPropertyControl(property)}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'styling' && (
          <div className="space-y-3">
            {getPropertiesByCategory('styling').map(property => (
              <div key={property.id} className="space-y-1.5">
                <label className="block text-xs font-medium text-secondary-600">
                  {property.label}
                </label>
                {renderPropertyControl(property)}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-6">
            {/* Effects Properties */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-secondary-700">Effect Settings</h3>
              {getPropertiesByCategory('effects').map(property => (
                <div key={property.id} className="space-y-2">
                  <label className="block text-sm font-medium text-secondary-600">
                    {property.label}
                  </label>
                  {renderPropertyControl(property)}
                </div>
              ))}
            </div>

            {/* Hover Effects */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-secondary-700">Hover Effects</h3>
              <div className="grid grid-cols-2 gap-2">
                {config.hoverEffects.map(effect => {
                  const isActive = hoverEffects.includes(effect.id)
                  return (
                    <button
                      key={effect.id}
                      onClick={() => isActive ? removeHoverEffect(effect.id) : addHoverEffect(effect.id)}
                      className={`p-3 rounded-lg text-left transition-all duration-200 ${
                        isActive 
                          ? 'neumorphism-pressed bg-primary-100 text-primary-700' 
                          : 'neumorphism-card hover:scale-105'
                      }`}
                    >
                      <div className="font-medium text-sm">{effect.name}</div>
                      <div className="text-xs text-secondary-500 mt-1">{effect.description}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          effect.intensity === 'subtle' ? 'bg-green-100 text-green-600' :
                          effect.intensity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {effect.intensity}
                        </span>
                        {isActive && <span className="text-primary-600">✓</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'animations' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-secondary-700">Available Animations</h3>
              <div className="grid grid-cols-1 gap-3">
                {config.animations.map(animation => {
                  const isActive = animations.includes(animation.id)
                  return (
                    <div
                      key={animation.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        isActive 
                          ? 'border-primary-300 bg-primary-50' 
                          : 'border-surface-200 bg-surface-50 hover:border-surface-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-secondary-700">{animation.name}</h4>
                          <p className="text-xs text-secondary-500 mt-1">{animation.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-secondary-400">
                            <span>Duration: {animation.duration}</span>
                            {animation.timing && <span>Timing: {animation.timing}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => isActive ? removeAnimation(animation.id) : addAnimation(animation.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'neumorphism-pressed text-red-600'
                              : 'neumorphism-button-primary text-primary-600'
                          }`}
                        >
                          {isActive ? 'Remove' : 'Add'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'responsive' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 neumorphism-inset rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-secondary-700 mb-2">Responsive Design</h3>
              <p className="text-sm text-secondary-500">
                Responsive customization features coming soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdvancedCustomizationPanel
