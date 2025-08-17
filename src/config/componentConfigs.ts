// Simplified component configuration - ready for future expansion
export interface ComponentInfo {
  id: string
  name: string
  category: string
  description: string
  icon: string
}

// Available component categories
export const CATEGORIES = {
  BASIC: 'Basic',
  FORM: 'Form', 
  LAYOUT: 'Layout',
  FEEDBACK: 'Feedback',
  DATA: 'Data'
} as const

// Clean component information - easily expandable
export const COMPONENTS: ComponentInfo[] = [
  // Basic Components
  {
    id: 'button',
    name: 'Button',
    category: CATEGORIES.BASIC,
    description: 'Interactive button element',
    icon: '🔘'
  },
  {
    id: 'badge',
    name: 'Badge',
    category: CATEGORIES.BASIC,
    description: 'Small label or status indicator',
    icon: '🏷️'
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: CATEGORIES.BASIC,
    description: 'User profile picture or initials',
    icon: '👤'
  },

  // Form Components
  {
    id: 'input',
    name: 'Input',
    category: CATEGORIES.FORM,
    description: 'Text input field',
    icon: '📝'
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: CATEGORIES.FORM,
    description: 'Multi-line text input',
    icon: '📄'
  },
  {
    id: 'select',
    name: 'Select',
    category: CATEGORIES.FORM,
    description: 'Dropdown selection',
    icon: '📋'
  },

  // Layout Components
  {
    id: 'card',
    name: 'Card',
    category: CATEGORIES.LAYOUT,
    description: 'Content container',
    icon: '🃏'
  },
  {
    id: 'modal',
    name: 'Modal',
    category: CATEGORIES.LAYOUT,
    description: 'Dialog overlay',
    icon: '🔲'
  },
  {
    id: 'navbar',
    name: 'Navbar',
    category: CATEGORIES.LAYOUT,
    description: 'Navigation bar',
    icon: '📊'
  },

  // Feedback Components
  {
    id: 'alert',
    name: 'Alert',
    category: CATEGORIES.FEEDBACK,
    description: 'Important message notification',
    icon: '⚠️'
  },

  // Data Components
  {
    id: 'table',
    name: 'Table',
    category: CATEGORIES.DATA,
    description: 'Data table with rows and columns',
    icon: '📊'
  }
]

// Utility functions
export const getComponentInfo = (componentId: string): ComponentInfo | null => {
  return COMPONENTS.find(comp => comp.id === componentId) || null
}

export const getComponentsByCategory = (category: string): ComponentInfo[] => {
  return COMPONENTS.filter(comp => comp.category === category)
}

export const getAllCategories = (): string[] => {
  return [...new Set(COMPONENTS.map(comp => comp.category))]
}