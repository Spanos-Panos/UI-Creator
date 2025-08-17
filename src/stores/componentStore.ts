import { create } from 'zustand'
import { ComponentStyle, ComponentConfig, getComponentConfig } from '../config/componentConfigs'

export interface Component {
  id: string
  name: string
  type: string
  style: ComponentStyle
  properties: Record<string, any>
  animations: string[]
  hoverEffects: string[]
  config?: ComponentConfig
}

// Legacy interface for backward compatibility
export interface SelectedComponent {
  id: string
  name: string
  type: string
  style: ComponentStyle
}

interface ComponentStore {
  selectedComponent: Component | null
  components: Component[]
  setSelectedComponent: (component: Component | null) => void
  updateComponentStyle: (updates: Partial<ComponentStyle>) => void
  updateComponentProperty: (property: string, value: any) => void
  updateComponentProperties: (updates: Record<string, any>) => void
  addAnimation: (animationId: string) => void
  removeAnimation: (animationId: string) => void
  addHoverEffect: (effectId: string) => void
  removeHoverEffect: (effectId: string) => void
  addComponent: (component: Component) => void
  removeComponent: (id: string) => void
  clearComponents: () => void
  createComponentFromType: (type: string, id?: string) => Component | null
  resetComponent: () => void
}

export const defaultStyle: ComponentStyle = {
  width: 'auto',
  height: 'auto',
  padding: '12px 16px',
  margin: '8px',
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'Inter, system-ui, sans-serif',
  color: '#1f2937',
  backgroundColor: '#3b82f6',
  border: 'none',
  borderRadius: '8px',
  display: 'inline-block',
  transition: 'all 0.2s ease',
  cursor: 'pointer'
}

export const useComponentStore = create<ComponentStore>((set, get) => ({
  selectedComponent: null,
  components: [],
  
  setSelectedComponent: (component) => {
    // Ensure fallback config for components without advanced config
    if (component && !component.properties) {
      component.properties = {}
    }
    set({ selectedComponent: component })
  },
  
  updateComponentStyle: (updates) => {
    const { selectedComponent } = get()
    if (selectedComponent) {
      const updatedComponent = {
        ...selectedComponent,
        style: {
          ...selectedComponent.style,
          ...updates
        }
      }
      set({ selectedComponent: updatedComponent })
      
      // Also update in components array if it exists there
      const { components } = get()
      const componentIndex = components.findIndex(c => c.id === selectedComponent.id)
      if (componentIndex !== -1) {
        const updatedComponents = [...components]
        updatedComponents[componentIndex] = updatedComponent
        set({ components: updatedComponents })
      }
    }
  },
  
  updateComponentProperty: (property, value) => {
    const { selectedComponent } = get()
    if (selectedComponent) {
      const updatedComponent = {
        ...selectedComponent,
        properties: {
          ...selectedComponent.properties,
          [property]: value
        }
      }
      set({ selectedComponent: updatedComponent })
      
      // Also update in components array
      const { components } = get()
      const componentIndex = components.findIndex(c => c.id === selectedComponent.id)
      if (componentIndex !== -1) {
        const updatedComponents = [...components]
        updatedComponents[componentIndex] = updatedComponent
        set({ components: updatedComponents })
      }
    }
  },
  
  updateComponentProperties: (updates) => {
    const { selectedComponent } = get()
    if (selectedComponent) {
      const updatedComponent = {
        ...selectedComponent,
        properties: {
          ...selectedComponent.properties,
          ...updates
        }
      }
      set({ selectedComponent: updatedComponent })
      
      // Also update in components array
      const { components } = get()
      const componentIndex = components.findIndex(c => c.id === selectedComponent.id)
      if (componentIndex !== -1) {
        const updatedComponents = [...components]
        updatedComponents[componentIndex] = updatedComponent
        set({ components: updatedComponents })
      }
    }
  },
  
  addAnimation: (animationId) => {
    const { selectedComponent } = get()
    if (selectedComponent) {
      const updatedAnimations = [...selectedComponent.animations]
      if (!updatedAnimations.includes(animationId)) {
        updatedAnimations.push(animationId)
        const updatedComponent = {
          ...selectedComponent,
          animations: updatedAnimations
        }
        set({ selectedComponent: updatedComponent })
      }
    }
  },
  
  removeAnimation: (animationId) => {
    const { selectedComponent } = get()
    if (selectedComponent) {
      const updatedAnimations = selectedComponent.animations.filter(id => id !== animationId)
      const updatedComponent = {
        ...selectedComponent,
        animations: updatedAnimations
      }
      set({ selectedComponent: updatedComponent })
    }
  },
  
  addHoverEffect: (effectId) => {
    const { selectedComponent } = get()
    if (selectedComponent) {
      const updatedEffects = [...selectedComponent.hoverEffects]
      if (!updatedEffects.includes(effectId)) {
        updatedEffects.push(effectId)
        const updatedComponent = {
          ...selectedComponent,
          hoverEffects: updatedEffects
        }
        set({ selectedComponent: updatedComponent })
      }
    }
  },
  
  removeHoverEffect: (effectId) => {
    const { selectedComponent } = get()
    if (selectedComponent) {
      const updatedEffects = selectedComponent.hoverEffects.filter(id => id !== effectId)
      const updatedComponent = {
        ...selectedComponent,
        hoverEffects: updatedEffects
      }
      set({ selectedComponent: updatedComponent })
    }
  },
  
  addComponent: (component) => {
    set((state) => ({
      components: [...state.components, component]
    }))
  },
  
  removeComponent: (id) => {
    set((state) => ({
      components: state.components.filter(c => c.id !== id),
      selectedComponent: state.selectedComponent?.id === id ? null : state.selectedComponent
    }))
  },
  
  clearComponents: () => {
    set({ components: [], selectedComponent: null })
  },
  
  createComponentFromType: (type, id) => {
    const config = getComponentConfig(type)
    if (!config) {
      // Fallback for components without config
      const componentId = id || `${type}_${Date.now()}`
      return {
        id: componentId,
        name: type.charAt(0).toUpperCase() + type.slice(1),
        type,
        style: { ...defaultStyle },
        properties: {},
        animations: [],
        hoverEffects: []
      }
    }
    
    const componentId = id || `${type}_${Date.now()}`
    const defaultProperties: Record<string, any> = {}
    
    // Initialize default property values
    config.properties.forEach(prop => {
      defaultProperties[prop.id] = prop.defaultValue
    })
    
    const component: Component = {
      id: componentId,
      name: config.name,
      type: config.id,
      style: { ...config.defaultStyle },
      properties: defaultProperties,
      animations: [],
      hoverEffects: [],
      config
    }
    
    return component
  },
  
  resetComponent: () => {
    set({ selectedComponent: null })
  }
}))