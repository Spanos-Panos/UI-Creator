import React from 'react'
import { useComponentStore } from '../../stores/componentStore'

const CustomizationPanel: React.FC = () => {
  const { selectedComponent, updateComponentStyle } = useComponentStore()
  
  if (!selectedComponent) {
    return (
      <div className="h-full bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center">
        <div className="text-center text-secondary-400">
          <div className="neumorphism-inset w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-secondary-700">No Component Selected</h3>
          <p className="text-secondary-500 max-w-sm">
            Select a component from the library to customize its properties
          </p>
        </div>
      </div>
    )
  }

  const { style } = selectedComponent
  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="p-6 border-b border-surface-200/50 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg shadow-neumorphism flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-secondary-800">
              Customization
            </h2>
          </div>
        </div>
        <p className="text-secondary-600">
          Adjust colors, spacing, and effects
        </p>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Colors Section */}
        <div className="neumorphism-section">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2v11h12V4H4z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-secondary-700">Colors</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary-600 mb-2">Background</label>
              <input 
                type="color" 
                value={style.backgroundColor} 
                onChange={(e) => updateComponentStyle({ backgroundColor: e.target.value })}
                className="neumorphism-color-picker"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary-600 mb-2">Text</label>
              <input 
                type="color" 
                value={style.textColor} 
                onChange={(e) => updateComponentStyle({ textColor: e.target.value })}
                className="neumorphism-color-picker"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary-600 mb-2">Accent</label>
              <input 
                type="color" 
                value={style.accentColor} 
                onChange={(e) => updateComponentStyle({ accentColor: e.target.value })}
                className="neumorphism-color-picker"
              />
            </div>
          </div>
        </div>
        
        {/* Spacing Section */}
        <div className="neumorphism-section">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-secondary-700">Spacing</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-secondary-600 mb-3">Padding: {style.padding}px</label>
              <input 
                type="range" 
                min="0" 
                max="32" 
                value={style.padding}
                onChange={(e) => updateComponentStyle({ padding: parseInt(e.target.value) })}
                className="neumorphism-range" 
              />
              <div className="flex justify-between text-xs text-secondary-500 mt-2">
                <span>0px</span>
                <span>32px</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-secondary-600 mb-3">Border Radius: {style.borderRadius}px</label>
              <input 
                type="range" 
                min="0" 
                max="24" 
                value={style.borderRadius}
                onChange={(e) => updateComponentStyle({ borderRadius: parseInt(e.target.value) })}
                className="neumorphism-range" 
              />
              <div className="flex justify-between text-xs text-secondary-500 mt-2">
                <span>0px</span>
                <span>24px</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-secondary-600 mb-3">Margin: {style.margin}px</label>
              <input 
                type="range" 
                min="0" 
                max="24" 
                value={style.margin}
                onChange={(e) => updateComponentStyle({ margin: parseInt(e.target.value) })}
                className="neumorphism-range" 
              />
              <div className="flex justify-between text-xs text-secondary-500 mt-2">
                <span>0px</span>
                <span>24px</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Typography Section */}
        <div className="neumorphism-section">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-secondary-700">Typography</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary-600 mb-3">Font Size: {style.fontSize}px</label>
              <input 
                type="range" 
                min="12" 
                max="48" 
                value={style.fontSize}
                onChange={(e) => updateComponentStyle({ fontSize: parseInt(e.target.value) })}
                className="neumorphism-range" 
              />
              <div className="flex justify-between text-xs text-secondary-500 mt-2">
                <span>12px</span>
                <span>48px</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-secondary-600 mb-2">Font Weight</label>
              <select 
                className="neumorphism-select w-full" 
                value={style.fontWeight}
                onChange={(e) => updateComponentStyle({ fontWeight: e.target.value })}
              >
                <option value="300">Light (300)</option>
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Effects Section */}
        <div className="neumorphism-section">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-secondary-700">Effects</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="neumorphism-checkbox mr-3" 
                checked={style.hoverEffects}
                onChange={(e) => updateComponentStyle({ hoverEffects: e.target.checked })}
              />
              <span className="text-sm text-secondary-600">Hover Effects</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="neumorphism-checkbox mr-3" 
                checked={style.shadows}
                onChange={(e) => updateComponentStyle({ shadows: e.target.checked })}
              />
              <span className="text-sm text-secondary-600">Shadows</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="neumorphism-checkbox mr-3" 
                checked={style.animations}
                onChange={(e) => updateComponentStyle({ animations: e.target.checked })}
              />
              <span className="text-sm text-secondary-600">Animations</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="neumorphism-checkbox mr-3" 
                checked={style.transitions}
                onChange={(e) => updateComponentStyle({ transitions: e.target.checked })}
              />
              <span className="text-sm text-secondary-600">Transitions</span>
            </label>
          </div>
        </div>
        
        {/* Border Section */}
        <div className="neumorphism-section">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zM4 5a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-secondary-700">Border</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary-600 mb-3">Border Width</label>
              <input type="range" min="0" max="8" className="neumorphism-range" defaultValue="1" />
              <div className="flex justify-between text-xs text-secondary-500 mt-2">
                <span>0px</span>
                <span>8px</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-secondary-600 mb-2">Border Style</label>
              <select className="neumorphism-select w-full" defaultValue="solid">
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="double">Double</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Advanced Section */}
        <div className="neumorphism-section">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <h3 className="font-semibold text-secondary-700">Advanced</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="neumorphism-checkbox mr-3" defaultChecked />
              <span className="text-sm text-secondary-600">Responsive Design</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="neumorphism-checkbox mr-3" />
              <span className="text-sm text-secondary-600">Dark Mode Support</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="neumorphism-checkbox mr-3" defaultChecked />
              <span className="text-sm text-secondary-600">Accessibility Features</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomizationPanel
