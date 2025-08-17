import React, { useState } from 'react'
import { useComponentStore } from '../../stores/componentStore'

const ImprovedCustomizationPanel: React.FC = () => {
  const { selectedComponent, updateComponentProperty, updateComponentStyle } = useComponentStore()
  const [activeTab, setActiveTab] = useState<'properties' | 'text' | 'effects' | 'animations' | 'hover' | 'advanced'>('properties')

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
    { id: 'text', label: 'Text', icon: '📝', description: 'Font, content, style' },
    { id: 'effects', label: 'Effects', icon: '✨', description: 'Glass, glow, shadows' },
    { id: 'animations', label: 'Animations', icon: '🎬', description: 'Motion, transitions' },
    { id: 'hover', label: 'Hover', icon: '👆', description: 'Hover states' },
    { id: 'advanced', label: 'Advanced', icon: '🔧', description: 'Custom assets' }
  ]

  const SliderControl = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '', color = 'primary' }: {
    label: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    unit?: string
    color?: string
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-secondary-700">{label}</label>
        <span className="text-sm text-secondary-500 bg-surface-200 px-2 py-1 rounded-lg">
          {value}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full slider-neumorphism"
        />
        <div className="flex justify-between text-xs text-secondary-400 mt-1">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  )

  const ColorControl = ({ label, value, onChange }: {
    label: string
    value: string
    onChange: (value: string) => void
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-secondary-700">{label}</label>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-xl cursor-pointer opacity-0 absolute inset-0"
          />
          <div 
            className="w-12 h-12 rounded-xl shadow-neumorphism-inset border-2 border-surface-300 cursor-pointer"
            style={{ backgroundColor: value }}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg bg-surface-100 font-mono"
          />
        </div>
      </div>
    </div>
  )

  const ToggleControl = ({ label, value, onChange, description }: {
    label: string
    value: boolean
    onChange: (value: boolean) => void
    description?: string
  }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <label className="text-sm font-medium text-secondary-700">{label}</label>
        {description && <p className="text-xs text-secondary-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
          value ? 'neumorphism-pressed bg-primary-100' : 'neumorphism bg-surface-200'
        }`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 absolute top-1 ${
          value ? 'right-1' : 'left-1'
        }`} />
      </button>
    </div>
  )

  const SelectControl = ({ label, value, onChange, options }: {
    label: string
    value: string
    onChange: (value: string) => void
    options: string[]
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-secondary-700">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              value === option
                ? 'neumorphism-pressed text-primary-600 scale-95'
                : 'neumorphism-button text-secondary-600 hover:text-secondary-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )

  const TextInputControl = ({ label, value, onChange, placeholder }: {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-secondary-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg bg-surface-100"
      />
    </div>
  )

  const EffectCard = ({ name, description, active, onClick, preview }: {
    name: string
    description: string
    active: boolean
    onClick: () => void
    preview: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl text-left transition-all duration-200 space-y-3 ${
        active 
          ? 'neumorphism-pressed bg-primary-50 text-primary-700 scale-95' 
          : 'neumorphism-card hover:scale-105'
      }`}
    >
      <div className="h-12 flex items-center justify-center rounded-lg bg-surface-100 overflow-hidden">
        {preview}
      </div>
      <div>
        <h4 className="font-medium text-sm">{name}</h4>
        <p className="text-xs text-secondary-500 mt-1">{description}</p>
      </div>
    </button>
  )

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-surface-50 to-surface-100">
      {/* Header */}
      <div className="p-6 border-b border-surface-200/50 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 neumorphism rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary-800">{selectedComponent.name}</h2>
            <p className="text-sm text-secondary-600">Customize every aspect of your component</p>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-2">
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
              <div className="text-[10px] text-secondary-500 mt-0.5">{tab.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                📏 <span className="ml-2">Dimensions & Layout</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <SliderControl
                  label="Width"
                  value={parseInt(selectedComponent.style?.width?.toString() || '200')}
                  onChange={(value) => updateComponentStyle({ width: `${value}px` })}
                  min={50}
                  max={500}
                  unit="px"
                />
                <SliderControl
                  label="Height"
                  value={parseInt(selectedComponent.style?.height?.toString() || '40')}
                  onChange={(value) => updateComponentStyle({ height: `${value}px` })}
                  min={20}
                  max={300}
                  unit="px"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SliderControl
                  label="Padding"
                  value={parseInt(selectedComponent.style?.padding?.toString() || '12')}
                  onChange={(value) => updateComponentStyle({ padding: `${value}px` })}
                  min={0}
                  max={50}
                  unit="px"
                />
                <SliderControl
                  label="Border Radius"
                  value={parseInt(selectedComponent.style?.borderRadius?.toString() || '8')}
                  onChange={(value) => updateComponentStyle({ borderRadius: `${value}px` })}
                  min={0}
                  max={50}
                  unit="px"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎯 <span className="ml-2">Position & Spacing</span>
              </h3>
              
              <SliderControl
                label="Margin"
                value={parseInt(selectedComponent.style?.margin?.toString() || '8')}
                onChange={(value) => updateComponentStyle({ margin: `${value}px` })}
                min={0}
                max={50}
                unit="px"
              />

              <SelectControl
                label="Display"
                value={selectedComponent.style?.display || 'block'}
                onChange={(value) => updateComponentStyle({ display: value })}
                options={['block', 'inline-block', 'flex', 'inline-flex']}
              />
            </div>
          </div>
        )}

        {/* Text Tab */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                📝 <span className="ml-2">Content</span>
              </h3>
              
              <TextInputControl
                label="Text Content"
                value={selectedComponent.properties?.text || selectedComponent.name}
                onChange={(value) => updateComponentProperty('text', value)}
                placeholder="Enter your text..."
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🔤 <span className="ml-2">Typography</span>
              </h3>
              
              <SliderControl
                label="Font Size"
                value={parseInt(selectedComponent.style?.fontSize?.toString() || '14')}
                onChange={(value) => updateComponentStyle({ fontSize: `${value}px` })}
                min={8}
                max={48}
                unit="px"
              />

              <SelectControl
                label="Font Weight"
                value={selectedComponent.style?.fontWeight || '400'}
                onChange={(value) => updateComponentStyle({ fontWeight: value })}
                options={['300', '400', '500', '600', '700', '800']}
              />

              <SelectControl
                label="Font Family"
                value={selectedComponent.style?.fontFamily || 'Inter'}
                onChange={(value) => updateComponentStyle({ fontFamily: value })}
                options={['Inter', 'Roboto', 'Arial', 'Georgia', 'Monospace']}
              />

              <ColorControl
                label="Text Color"
                value={selectedComponent.style?.color || '#374151'}
                onChange={(value) => updateComponentStyle({ color: value })}
              />
            </div>
          </div>
        )}

        {/* Effects Tab */}
        {activeTab === 'effects' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                ✨ <span className="ml-2">Visual Effects</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <EffectCard
                  name="Neumorphism"
                  description="Soft 3D effect"
                  active={selectedComponent.properties?.effect === 'neumorphism'}
                  onClick={() => {
                    updateComponentProperty('effect', 'neumorphism')
                    updateComponentStyle({
                      boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
                      border: 'none'
                    })
                  }}
                  preview={<div className="w-8 h-6 bg-surface-100 rounded" style={{ boxShadow: '2px 2px 4px #d1d9e6, -2px -2px 4px #ffffff' }} />}
                />

                <EffectCard
                  name="Glass"
                  description="Transparent blur"
                  active={selectedComponent.properties?.effect === 'glass'}
                  onClick={() => {
                    updateComponentProperty('effect', 'glass')
                    updateComponentStyle({
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    })
                  }}
                  preview={<div className="w-8 h-6 bg-white/20 rounded border border-white/30" style={{ backdropFilter: 'blur(2px)' }} />}
                />

                <EffectCard
                  name="Claymorphism"
                  description="Clay-like texture"
                  active={selectedComponent.properties?.effect === 'clay'}
                  onClick={() => {
                    updateComponentProperty('effect', 'clay')
                    updateComponentStyle({
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(4px)',
                      border: '2px solid rgba(255, 255, 255, 0.18)'
                    })
                  }}
                  preview={<div className="w-8 h-6 bg-white/25 rounded-lg border-2 border-white/20" />}
                />

                <EffectCard
                  name="Glow"
                  description="Soft light emission"
                  active={selectedComponent.properties?.effect === 'glow'}
                  onClick={() => {
                    updateComponentProperty('effect', 'glow')
                    updateComponentStyle({
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    })
                  }}
                  preview={<div className="w-8 h-6 bg-blue-100 rounded" style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)' }} />}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎨 <span className="ml-2">Colors & Gradients</span>
              </h3>
              
              <ColorControl
                label="Background Color"
                value={selectedComponent.style?.backgroundColor || '#ffffff'}
                onChange={(value) => updateComponentStyle({ backgroundColor: value })}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Gradient Presets</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Purple', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                    { name: 'Sunset', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
                    { name: 'Ocean', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                    { name: 'Forest', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
                    { name: 'Fire', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
                    { name: 'Ice', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
                  ].map(preset => (
                    <button
                      key={preset.name}
                      onClick={() => updateComponentStyle({ background: preset.gradient })}
                      className="h-10 rounded-lg neumorphism-button text-xs font-medium overflow-hidden"
                      style={{ background: preset.gradient }}
                    >
                      <span className="text-white drop-shadow-md">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <SliderControl
                label="Opacity"
                value={Math.round((selectedComponent.style?.opacity || 1) * 100)}
                onChange={(value) => updateComponentStyle({ opacity: value / 100 })}
                min={0}
                max={100}
                unit="%"
              />
            </div>
          </div>
        )}

        {/* Animations Tab */}
        {activeTab === 'animations' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎬 <span className="ml-2">Entry Animations</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'bounce', name: 'Bounce In', description: 'Bouncy entrance' },
                  { id: 'fade', name: 'Fade In', description: 'Smooth fade' },
                  { id: 'slide', name: 'Slide In', description: 'Slide from side' },
                  { id: 'scale', name: 'Scale In', description: 'Scale from center' },
                  { id: 'rotate', name: 'Rotate In', description: 'Spin entrance' },
                  { id: 'flip', name: 'Flip In', description: '3D flip effect' }
                ].map(animation => (
                  <EffectCard
                    key={animation.id}
                    name={animation.name}
                    description={animation.description}
                    active={selectedComponent.animations?.includes(animation.id)}
                    onClick={() => {
                      // Toggle animation
                      const currentAnimations = selectedComponent.animations || []
                      if (currentAnimations.includes(animation.id)) {
                        updateComponentProperty('animations', currentAnimations.filter(id => id !== animation.id))
                      } else {
                        updateComponentProperty('animations', [...currentAnimations, animation.id])
                      }
                    }}
                    preview={
                      <div className={`w-6 h-4 bg-primary-400 rounded ${
                        animation.id === 'bounce' ? 'animate-bounce' :
                        animation.id === 'fade' ? 'animate-pulse' :
                        animation.id === 'slide' ? 'animate-pulse' :
                        animation.id === 'scale' ? 'animate-ping' :
                        'animate-spin'
                      }`} />
                    }
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🔄 <span className="ml-2">Continuous Animations</span>
              </h3>

              <div className="space-y-3">
                <ToggleControl
                  label="Pulse Effect"
                  value={selectedComponent.properties?.pulse || false}
                  onChange={(value) => updateComponentProperty('pulse', value)}
                  description="Gentle pulsing animation"
                />

                <ToggleControl
                  label="Float Effect"
                  value={selectedComponent.properties?.float || false}
                  onChange={(value) => updateComponentProperty('float', value)}
                  description="Gentle up and down motion"
                />

                <ToggleControl
                  label="Glow Pulse"
                  value={selectedComponent.properties?.glowPulse || false}
                  onChange={(value) => updateComponentProperty('glowPulse', value)}
                  description="Pulsing glow effect"
                />
              </div>
            </div>
          </div>
        )}

        {/* Hover Tab */}
        {activeTab === 'hover' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                👆 <span className="ml-2">Hover Effects</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'lift', name: 'Lift Up', description: 'Elevate on hover' },
                  { id: 'scale', name: 'Scale', description: 'Grow larger' },
                  { id: 'rotate', name: 'Rotate', description: 'Slight rotation' },
                  { id: 'glow', name: 'Glow', description: 'Glowing border' },
                  { id: 'shake', name: 'Shake', description: 'Gentle shake' },
                  { id: 'bounce', name: 'Bounce', description: 'Bouncy effect' }
                ].map(effect => (
                  <EffectCard
                    key={effect.id}
                    name={effect.name}
                    description={effect.description}
                    active={selectedComponent.hoverEffects?.includes(effect.id)}
                    onClick={() => {
                      const currentEffects = selectedComponent.hoverEffects || []
                      if (currentEffects.includes(effect.id)) {
                        updateComponentProperty('hoverEffects', currentEffects.filter(id => id !== effect.id))
                      } else {
                        updateComponentProperty('hoverEffects', [...currentEffects, effect.id])
                      }
                    }}
                    preview={<div className="w-6 h-4 bg-accent-400 rounded hover:scale-110 transition-transform" />}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎨 <span className="ml-2">Hover Colors</span>
              </h3>

              <ColorControl
                label="Hover Background"
                value={selectedComponent.style?.hover?.backgroundColor || selectedComponent.style?.backgroundColor || '#ffffff'}
                onChange={(value) => updateComponentStyle({ 
                  hover: { ...selectedComponent.style?.hover, backgroundColor: value }
                })}
              />

              <ColorControl
                label="Hover Text Color"
                value={selectedComponent.style?.hover?.color || selectedComponent.style?.color || '#374151'}
                onChange={(value) => updateComponentStyle({ 
                  hover: { ...selectedComponent.style?.hover, color: value }
                })}
              />
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🔧 <span className="ml-2">Custom Assets</span>
              </h3>

              <TextInputControl
                label="Custom Icon URL"
                value={selectedComponent.properties?.iconUrl || ''}
                onChange={(value) => updateComponentProperty('iconUrl', value)}
                placeholder="https://example.com/icon.svg"
              />

              <TextInputControl
                label="Background Image URL"
                value={selectedComponent.properties?.backgroundImage || ''}
                onChange={(value) => {
                  updateComponentProperty('backgroundImage', value)
                  updateComponentStyle({ backgroundImage: value ? `url(${value})` : 'none' })
                }}
                placeholder="https://example.com/image.jpg"
              />

              <SelectControl
                label="Background Size"
                value={selectedComponent.style?.backgroundSize || 'cover'}
                onChange={(value) => updateComponentStyle({ backgroundSize: value })}
                options={['cover', 'contain', 'auto', '100% 100%']}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800 flex items-center">
                🎯 <span className="ml-2">Advanced Styling</span>
              </h3>

              <TextInputControl
                label="Custom CSS Class"
                value={selectedComponent.properties?.customClass || ''}
                onChange={(value) => updateComponentProperty('customClass', value)}
                placeholder="my-custom-class"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Custom CSS</label>
                <textarea
                  value={selectedComponent.properties?.customCSS || ''}
                  onChange={(e) => updateComponentProperty('customCSS', e.target.value)}
                  placeholder="/* Custom CSS rules */"
                  className="w-full px-3 py-2 text-sm neumorphism-inset rounded-lg bg-surface-100 font-mono resize-none"
                  rows={6}
                />
              </div>

              <ToggleControl
                label="Responsive Design"
                value={selectedComponent.properties?.responsive || true}
                onChange={(value) => updateComponentProperty('responsive', value)}
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
