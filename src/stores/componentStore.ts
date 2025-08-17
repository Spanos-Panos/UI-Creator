import { create } from 'zustand'

// Simplified component interface - ready for future expansion
export interface Component {
  id: string
  name: string
  type: string
  properties: Record<string, any>
}

// Simplified component store - focused on core functionality
interface ComponentStore {
  selectedComponent: Component | null
  components: Component[]
  setSelectedComponent: (component: Component | null) => void
  addComponent: (component: Component) => void
  removeComponent: (id: string) => void
  clearComponents: () => void
  createComponent: (type: string, name: string) => Component
  resetComponent: () => void
}

// Available component types - easily expandable
export const COMPONENT_TYPES = {
  BUTTON: 'button',
  CARD: 'card',
  INPUT: 'input',
  BADGE: 'badge',
  AVATAR: 'avatar',
  MODAL: 'modal',
  NAVBAR: 'navbar',
  ALERT: 'alert',
  TABLE: 'table'
} as const

export const useComponentStore = create<ComponentStore>((set, get) => ({
  selectedComponent: null,
  components: [],
  
  setSelectedComponent: (component) => {
    set({ selectedComponent: component })
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
  
  createComponent: (type, name) => {
    const componentId = `${type}_${Date.now()}`
    return {
      id: componentId,
      name,
      type,
      properties: { text: name }
    }
  },
  
  resetComponent: () => {
    set({ selectedComponent: null })
  }
}))