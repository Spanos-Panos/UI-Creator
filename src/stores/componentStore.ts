import { create } from 'zustand'

export interface ComponentStyle {
  // Colors
  backgroundColor: string
  textColor: string
  accentColor: string
  
  // Spacing
  padding: number
  borderRadius: number
  margin: number
  
  // Typography
  fontSize: number
  fontWeight: string
  
  // Effects
  hoverEffects: boolean
  shadows: boolean
  animations: boolean
  transitions: boolean
  
  // Border
  borderWidth: number
  borderStyle: string
  
  // Advanced
  responsive: boolean
  darkMode: boolean
  accessibility: boolean
}

export interface SelectedComponent {
  id: string
  name: string
  type: string
  style: ComponentStyle
}

interface ComponentStore {
  selectedComponent: SelectedComponent | null
  setSelectedComponent: (component: SelectedComponent) => void
  updateComponentStyle: (updates: Partial<ComponentStyle>) => void
  resetComponent: () => void
}

const defaultStyle: ComponentStyle = {
  backgroundColor: '#6366f1',
  textColor: '#1f2937',
  accentColor: '#22c55e',
  padding: 16,
  borderRadius: 8,
  margin: 4,
  fontSize: 16,
  fontWeight: '400',
  hoverEffects: true,
  shadows: true,
  animations: false,
  transitions: true,
  borderWidth: 1,
  borderStyle: 'solid',
  responsive: true,
  darkMode: false,
  accessibility: true,
}

export const useComponentStore = create<ComponentStore>((set) => ({
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  updateComponentStyle: (updates) =>
    set((state) => ({
      selectedComponent: state.selectedComponent
        ? {
            ...state.selectedComponent,
            style: { ...state.selectedComponent.style, ...updates },
          }
        : null,
    })),
  resetComponent: () => set({ selectedComponent: null }),
}))

export { defaultStyle }
