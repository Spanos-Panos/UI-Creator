import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useComponentStore } from '../../stores/componentStore'

const ImprovedCustomizationPanel: React.FC = () => {
  const { selectedComponent, updateComponentProperty, updateComponentStyle } = useComponentStore()
  const [activeTab, setActiveTab] = useState<'properties' | 'text' | 'colors' | 'effects' | 'animations' | 'hover' | 'advanced'>('properties')
  const [localValues, setLocalValues] = useState<Record<string, any>>({})
  
  // Refs to prevent focus loss
  const textInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  // Always call hooks at the top level - before any conditional logic
  const updateStyle = useCallback((updates: Record<string, any>) => {
    updateComponentStyle(updates)
  }, [updateComponentStyle])

  const updateProperty = useCallback((property: string, value: any) => {
    updateComponentProperty(property, value)
  }, [updateComponentProperty])

  // Update local values when component changes
  useEffect(() => {
    if (selectedComponent) {
      const newValues = {
        // Content properties
        text: selectedComponent.properties?.text || selectedComponent.name || '',
        title: selectedComponent.properties?.title || selectedComponent.name || '',
        description: selectedComponent.properties?.description || 'Description text',
        placeholder: selectedComponent.properties?.placeholder || 'Placeholder text',
        
        // Style properties  
        width: parseInt(selectedComponent.style?.width?.toString().replace('px', '') || '200'),
        height: parseInt(selectedComponent.style?.height?.toString().replace('px', '') || '40'),
        padding: parseInt(selectedComponent.style?.padding?.toString().replace('px', '') || '12'),
        borderRadius: parseInt(selectedComponent.style?.borderRadius?.toString().replace('px', '') || '8'),
        margin: parseInt(selectedComponent.style?.margin?.toString().replace('px', '') || '8'),
        fontSize: parseInt(selectedComponent.style?.fontSize?.toString().replace('px', '') || '14'),
        fontWeight: selectedComponent.style?.fontWeight || '400',
        fontFamily: selectedComponent.style?.fontFamily || 'Inter',
        color: selectedComponent.style?.color || '#374151',
        backgroundColor: selectedComponent.style?.backgroundColor || '#ffffff',
        display: selectedComponent.style?.display || 'block',
        opacity: Math.round((selectedComponent.style?.opacity || 1) * 100)
      }
      setLocalValues(newValues)
    }
  }, [selectedComponent?.id, selectedComponent?.style, selectedComponent?.properties])

  if (!selectedComponent) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 neumorphism-inset rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-secondary-700 mb-3">Select a Component</h3>
          <p className="text-secondary-500 text-sm leading-relaxed">
            Choose a component from the library to start customizing with advanced properties, effects, and animations
          </p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'properties', label: 'Properties', icon: '📏', description: 'Size, shape, layout' },
    { id: 'text', label: 'Text', icon: '📝', description: 'Content & typography' },
    { id: 'colors', label: 'Colors', icon: '🎨', description: 'Colors & gradients' },
    { id: 'effects', label: 'Effects', icon: '✨', description: 'Visual effects' },
    { id: 'animations', label: 'Animations', icon: '🎬', description: 'Motion & transitions' },
    { id: 'hover', label: 'Hover', icon: '👆', description: 'Hover states' },
    { id: 'advanced', label: 'Advanced', icon: '🔧', description: 'Custom assets' }
  ]

  const SliderControl = ({ 
    label, 
    property, 
    min = 0, 
    max = 100, 
    step = 1, 
    unit = '', 
    isStyle = true 
  }: {
    label: string
    property: string
    min?: number
    max?: number
    step?: number
    unit?: string
    isStyle?: boolean
  }) => {
    const value = localValues[property] || 0
    
    const handleChange = (newValue: number) => {
      setLocalValues(prev => ({ ...prev, [property]: newValue }))
      
      if (isStyle) {
        const styleUpdate = unit ? `${newValue}${unit}` : newValue
        updateStyle({ [property]: styleUpdate })
      } else {
        updateProperty(property, newValue)
      }
    }

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-secondary-700">{label}</label>
          <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-lg font-mono">
            {value}{unit}
          </span>
        </div>
        <div className="relative px-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e2e8f0 ${((value - min) / (max - min)) * 100}%, #e2e8f0 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-secondary-400 mt-2">
            <span>{min}{unit}</span>
            <span>{max}{unit}</span>
          </div>
        </div>
      </div>
    )
  }

  const ColorControl = ({ label, property, isStyle = true }: {
    label: string
    property: string
    isStyle?: boolean
  }) => {
    const value = localValues[property] || '#ffffff'
    
    const handleChange = (newValue: string) => {
      setLocalValues(prev => ({ ...prev, [property]: newValue }))
      
      if (isStyle) {
        updateStyle({ [property]: newValue })
      } else {
        updateProperty(property, newValue)
      }
    }

    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-secondary-700">{label}</label>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="color"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              className="w-14 h-14 rounded-xl cursor-pointer border-2 border-white shadow-lg"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full px-4 py-3 text-sm neumorphism-inset rounded-xl bg-surface-100 font-mono border-0 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>
      </div>
    )
  }

  const TextInputControl = ({ label, property, placeholder }: {
    label: string
    property: string
    placeholder?: string
  }) => {
    const value = localValues[property] || ''
    
    const handleChange = (newValue: string) => {
      setLocalValues(prev => ({ ...prev, [property]: newValue }))
      updateProperty(property, newValue)
    }

    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-secondary-700">{label}</label>
        <input
          key={`${selectedComponent.id}-${property}`} // Force re-render to prevent focus issues
          ref={(el) => textInputRefs.current[property] = el}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-sm neumorphism-inset rounded-xl bg-surface-100 border-0 focus:ring-2 focus:ring-primary-200"
        />
      </div>
    )
  }

  const SelectControl = ({ label, property, options, isStyle = true }: {
    label: string
    property: string
    options: string[]
    isStyle?: boolean
  }) => {
    const value = localValues[property] || options[0]
    
    const handleChange = (newValue: string) => {
      setLocalValues(prev => ({ ...prev, [property]: newValue }))
      
      if (isStyle) {
        updateStyle({ [property]: newValue })
      } else {
        updateProperty(property, newValue)
      }
    }

    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-secondary-700">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleChange(option)}
              className={`px-4 py-3 text-sm rounded-xl transition-all duration-200 font-medium ${
                value === option
                  ? 'neumorphism-pressed text-primary-600 scale-95 bg-primary-50'
                  : 'neumorphism-button text-secondary-600 hover:text-secondary-700 hover:scale-105'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const ToggleControl = ({ label, property, description, isStyle = false }: {
    label: string
    property: string
    description?: string
    isStyle?: boolean
  }) => {
    const value = selectedComponent.properties?.[property] || false
    
    const handleChange = (newValue: boolean) => {
      if (isStyle) {
        updateStyle({ [property]: newValue })
      } else {
        updateProperty(property, newValue)
      }
    }

    return (
      <div className="flex items-center justify-between py-3">
        <div>
          <label className="text-sm font-medium text-secondary-700">{label}</label>
          {description && <p className="text-xs text-secondary-500 mt-1">{description}</p>}
        </div>
        <button
          onClick={() => handleChange(!value)}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
            value ? 'bg-primary-400 shadow-inner' : 'bg-surface-300 shadow-neumorphism'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 absolute top-1 ${
            value ? 'right-1 bg-white' : 'left-1 bg-surface-100'
          }`} />
        </button>
      </div>
    )
  }

  const EffectCard = ({ name, description, effectId, preview }: {
    name: string
    description: string
    effectId: string
    preview: React.ReactNode
  }) => {
    const active = selectedComponent.properties?.effect === effectId
    
    const handleClick = () => {
      updateProperty('effect', effectId)
      
      // Apply enhanced CSS effects based on research
      switch (effectId) {
        case 'neumorphism':
          updateStyle({
            background: '#e6e7ee',
            boxShadow: '9px 9px 16px #a3a3a3, -9px -9px 16px #ffffff',
            border: 'none',
            borderRadius: '20px'
          })
          break
        case 'glass':
          updateStyle({
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          })
          break
        case 'clay':
          updateStyle({
            background: 'linear-gradient(315deg, #f39800 0%, #ff6b6b 74%)',
            borderRadius: '50px',
            border: 'none',
            boxShadow: '20px 20px 40px #cc7700, -20px -20px 40px #ffbb00'
          })
          break
        case 'glow':
          updateStyle({
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '15px',
            boxShadow: '0 0 40px rgba(102, 126, 234, 0.6), 0 0 80px rgba(118, 75, 162, 0.4)'
          })
          break
      }
    }

    return (
      <button
        onClick={handleClick}
        className={`p-5 rounded-2xl text-left transition-all duration-300 space-y-4 ${
          active 
            ? 'neumorphism-pressed bg-primary-50 text-primary-700 scale-95 border-2 border-primary-200' 
            : 'neumorphism-card hover:scale-105 hover:shadow-lg'
        }`}
      >
        <div className="h-16 flex items-center justify-center rounded-xl bg-surface-100 overflow-hidden">
          {preview}
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">{name}</h4>
          <p className="text-xs text-secondary-500">{description}</p>
        </div>
      </button>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-surface-50 to-surface-100">
      {/* Header */}
      <div className="p-6 border-b border-surface-200/50 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 neumorphism rounded-2xl flex items-center justify-center">
            <span className="text-3xl">🎨</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary-800">{selectedComponent.name}</h2>
            <p className="text-sm text-secondary-600">Customize every aspect of your component</p>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-3 rounded-xl text-center transition-all duration-200 ${
                activeTab === tab.id
                  ? 'neumorphism-pressed bg-primary-50 text-primary-600 scale-95'
                  : 'neumorphism-card hover:scale-105 text-secondary-600'
              }`}
            >
              <div className="text-lg mb-1">{tab.icon}</div>
              <div className="text-xs font-semibold">{tab.label}</div>
              <div className="text-[10px] text-secondary-500 mt-0.5 leading-tight">{tab.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                📏 <span className="ml-2">Dimensions & Layout</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <SliderControl
                  label="Width"
                  property="width"
                  min={50}
                  max={800}
                  unit="px"
                />
                <SliderControl
                  label="Height"
                  property="height"
                  min={20}
                  max={400}
                  unit="px"
                />
                <SliderControl
                  label="Padding"
                  property="padding"
                  min={0}
                  max={50}
                  unit="px"
                />
                <SliderControl
                  label="Border Radius"
                  property="borderRadius"
                  min={0}
                  max={50}
                  unit="px"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎯 <span className="ml-2">Position & Spacing</span>
              </h3>
              
              <SliderControl
                label="Margin"
                property="margin"
                min={0}
                max={50}
                unit="px"
              />

              <SelectControl
                label="Display"
                property="display"
                options={['block', 'inline-block', 'flex', 'inline-flex']}
              />

              <SliderControl
                label="Opacity"
                property="opacity"
                min={0}
                max={100}
                unit="%"
              />
            </div>
          </div>
        )}

        {/* Text Tab */}
        {activeTab === 'text' && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                📝 <span className="ml-2">Content</span>
              </h3>
              
              <TextInputControl
                label="Main Text"
                property="text"
                placeholder="Enter main text..."
              />
              
              <TextInputControl
                label="Title"
                property="title"
                placeholder="Enter title..."
              />
              
              <TextInputControl
                label="Description"
                property="description"
                placeholder="Enter description..."
              />
              
              <TextInputControl
                label="Placeholder"
                property="placeholder"
                placeholder="Enter placeholder text..."
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🔤 <span className="ml-2">Typography</span>
              </h3>
              
              <SliderControl
                label="Font Size"
                property="fontSize"
                min={8}
                max={48}
                unit="px"
              />

              <SelectControl
                label="Font Weight"
                property="fontWeight"
                options={['300', '400', '500', '600', '700', '800']}
              />

              <SelectControl
                label="Font Family"
                property="fontFamily"
                options={['Inter', 'Roboto', 'Arial', 'Georgia', 'Monospace']}
              />

              <ColorControl
                label="Text Color"
                property="color"
              />
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎨 <span className="ml-2">Primary Colors</span>
              </h3>
              
              <ColorControl
                label="Background Color"
                property="backgroundColor"
              />
              
              <ColorControl
                label="Text Color"
                property="color"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🌈 <span className="ml-2">Gradient Backgrounds</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Sunset', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
                  { name: 'Ocean', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                  { name: 'Forest', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
                  { name: 'Purple', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                  { name: 'Fire', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
                  { name: 'Ice', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
                  { name: 'Gold', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                  { name: 'Mint', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
                ].map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => updateStyle({ background: preset.gradient })}
                    className="h-16 rounded-xl text-sm font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-200"
                    style={{ background: preset.gradient }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎪 <span className="ml-2">Color Palettes</span>
              </h3>
              
              <div className="grid grid-cols-4 gap-3">
                {[
                  '#ef4444', '#f97316', '#f59e0b', '#eab308',
                  '#84cc16', '#22c55e', '#10b981', '#06b6d4',
                  '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
                  '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
                ].map(color => (
                  <button
                    key={color}
                    onClick={() => updateStyle({ backgroundColor: color })}
                    className="w-full h-12 rounded-lg hover:scale-110 transition-transform duration-200 shadow-md"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Effects Tab */}
        {activeTab === 'effects' && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                ✨ <span className="ml-2">Visual Effects</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <EffectCard
                  name="Neumorphism"
                  description="Soft 3D depth effect"
                  effectId="neumorphism"
                  preview={
                    <div 
                      className="w-12 h-8 rounded-2xl" 
                      style={{ 
                        background: '#e6e7ee',
                        boxShadow: '6px 6px 10px #a3a3a3, -6px -6px 10px #ffffff' 
                      }} 
                    />
                  }
                />

                <EffectCard
                  name="Glassmorphism"
                  description="Transparent blur effect"
                  effectId="glass"
                  preview={
                    <div 
                      className="w-12 h-8 rounded-xl border border-white/20" 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                      }} 
                    />
                  }
                />

                <EffectCard
                  name="Claymorphism"
                  description="Clay-like texture"
                  effectId="clay"
                  preview={
                    <div 
                      className="w-12 h-8 rounded-3xl" 
                      style={{ 
                        background: 'linear-gradient(315deg, #f39800 0%, #ff6b6b 74%)',
                        boxShadow: '10px 10px 20px #cc7700, -10px -10px 20px #ffbb00'
                      }} 
                    />
                  }
                />

                <EffectCard
                  name="Glow Effect"
                  description="Soft light emission"
                  effectId="glow"
                  preview={
                    <div 
                      className="w-12 h-8 rounded-xl" 
                      style={{ 
                        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 0 20px rgba(102, 126, 234, 0.6)'
                      }} 
                    />
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Animations Tab */}
        {activeTab === 'animations' && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎬 <span className="ml-2">Entry Animations</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'bounce', name: 'Bounce In', description: 'Bouncy entrance' },
                  { id: 'fade', name: 'Fade In', description: 'Smooth fade' },
                  { id: 'slide', name: 'Slide In', description: 'Slide from side' },
                  { id: 'scale', name: 'Scale In', description: 'Scale from center' },
                  { id: 'rotate', name: 'Rotate In', description: 'Spin entrance' },
                  { id: 'flip', name: 'Flip In', description: '3D flip effect' }
                ].map(animation => {
                  const isActive = selectedComponent.animations?.includes(animation.id)
                  
                  return (
                    <button
                      key={animation.id}
                      onClick={() => {
                        const currentAnimations = selectedComponent.animations || []
                        if (isActive) {
                          updateProperty('animations', currentAnimations.filter(id => id !== animation.id))
                        } else {
                          updateProperty('animations', [...currentAnimations, animation.id])
                        }
                      }}
                      className={`p-5 rounded-2xl text-left transition-all duration-200 space-y-4 ${
                        isActive 
                          ? 'neumorphism-pressed bg-primary-50 text-primary-700 scale-95 border-2 border-primary-200' 
                          : 'neumorphism-card hover:scale-105'
                      }`}
                    >
                      <div className="h-16 flex items-center justify-center rounded-xl bg-surface-100 overflow-hidden">
                        <div className={`w-8 h-6 bg-primary-400 rounded-lg ${
                          animation.id === 'bounce' ? 'animate-bounce' :
                          animation.id === 'fade' ? 'animate-pulse' :
                          animation.id === 'slide' ? 'animate-pulse' :
                          animation.id === 'scale' ? 'animate-ping' :
                          animation.id === 'rotate' ? 'animate-spin' :
                          'animate-pulse'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{animation.name}</h4>
                        <p className="text-xs text-secondary-500">{animation.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🔄 <span className="ml-2">Continuous Animations</span>
              </h3>

              <div className="space-y-4">
                <ToggleControl
                  label="Pulse Effect"
                  property="pulse"
                  description="Gentle pulsing animation"
                />

                <ToggleControl
                  label="Float Effect"
                  property="float"
                  description="Gentle up and down motion"
                />

                <ToggleControl
                  label="Glow Pulse"
                  property="glowPulse"
                  description="Pulsing glow effect"
                />
              </div>
            </div>
          </div>
        )}

        {/* Hover Tab */}
        {activeTab === 'hover' && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                👆 <span className="ml-2">Hover Effects</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'lift', name: 'Lift Up', description: 'Elevate on hover' },
                  { id: 'scale', name: 'Scale', description: 'Grow larger' },
                  { id: 'rotate', name: 'Rotate', description: 'Slight rotation' },
                  { id: 'glow', name: 'Glow', description: 'Glowing border' },
                  { id: 'shake', name: 'Shake', description: 'Gentle shake' },
                  { id: 'bounce', name: 'Bounce', description: 'Bouncy effect' }
                ].map(effect => {
                  const isActive = selectedComponent.hoverEffects?.includes(effect.id)
                  
                  return (
                    <button
                      key={effect.id}
                      onClick={() => {
                        const currentEffects = selectedComponent.hoverEffects || []
                        if (isActive) {
                          updateProperty('hoverEffects', currentEffects.filter(id => id !== effect.id))
                        } else {
                          updateProperty('hoverEffects', [...currentEffects, effect.id])
                        }
                      }}
                      className={`p-5 rounded-2xl text-left transition-all duration-200 space-y-4 hover:scale-105 ${
                        isActive 
                          ? 'neumorphism-pressed bg-primary-50 text-primary-700 scale-95 border-2 border-primary-200' 
                          : 'neumorphism-card'
                      }`}
                    >
                      <div className="h-16 flex items-center justify-center rounded-xl bg-surface-100 overflow-hidden">
                        <div className="w-8 h-6 bg-accent-400 rounded-lg hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{effect.name}</h4>
                        <p className="text-xs text-secondary-500">{effect.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎨 <span className="ml-2">Hover Colors</span>
              </h3>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-secondary-700">Hover Background</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={selectedComponent.style?.hover?.backgroundColor || selectedComponent.style?.backgroundColor || '#ffffff'}
                      onChange={(e) => updateStyle({ 
                        hover: { 
                          ...selectedComponent.style?.hover, 
                          backgroundColor: e.target.value 
                        }
                      })}
                      className="w-14 h-14 rounded-xl cursor-pointer border-2 border-white shadow-lg"
                    />
                    <input
                      type="text"
                      value={selectedComponent.style?.hover?.backgroundColor || selectedComponent.style?.backgroundColor || '#ffffff'}
                      onChange={(e) => updateStyle({ 
                        hover: { 
                          ...selectedComponent.style?.hover, 
                          backgroundColor: e.target.value 
                        }
                      })}
                      className="flex-1 px-4 py-3 text-sm neumorphism-inset rounded-xl bg-surface-100 font-mono border-0 focus:ring-2 focus:ring-primary-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-secondary-700">Hover Text Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={selectedComponent.style?.hover?.color || selectedComponent.style?.color || '#374151'}
                      onChange={(e) => updateStyle({ 
                        hover: { 
                          ...selectedComponent.style?.hover, 
                          color: e.target.value 
                        }
                      })}
                      className="w-14 h-14 rounded-xl cursor-pointer border-2 border-white shadow-lg"
                    />
                    <input
                      type="text"
                      value={selectedComponent.style?.hover?.color || selectedComponent.style?.color || '#374151'}
                      onChange={(e) => updateStyle({ 
                        hover: { 
                          ...selectedComponent.style?.hover, 
                          color: e.target.value 
                        }
                      })}
                      className="flex-1 px-4 py-3 text-sm neumorphism-inset rounded-xl bg-surface-100 font-mono border-0 focus:ring-2 focus:ring-primary-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🔧 <span className="ml-2">Custom Assets</span>
              </h3>

              <TextInputControl
                label="Custom Icon URL"
                property="iconUrl"
                placeholder="https://example.com/icon.svg"
              />

              <TextInputControl
                label="Background Image URL"
                property="backgroundImage"
                placeholder="https://example.com/image.jpg"
              />

              <SelectControl
                label="Background Size"
                property="backgroundSize"
                options={['cover', 'contain', 'auto', '100% 100%']}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎯 <span className="ml-2">Advanced Styling</span>
              </h3>

              <TextInputControl
                label="Custom CSS Class"
                property="customClass"
                placeholder="my-custom-class"
              />

              <div className="space-y-3">
                <label className="text-sm font-medium text-secondary-700">Custom CSS</label>
                <textarea
                  value={selectedComponent.properties?.customCSS || ''}
                  onChange={(e) => updateProperty('customCSS', e.target.value)}
                  placeholder="/* Custom CSS rules */"
                  className="w-full px-4 py-3 text-sm neumorphism-inset rounded-xl bg-surface-100 font-mono resize-none border-0 focus:ring-2 focus:ring-primary-200"
                  rows={8}
                />
              </div>

              <ToggleControl
                label="Responsive Design"
                property="responsive"
                description="Auto-adapt to screen sizes"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImprovedCustomizationPanel