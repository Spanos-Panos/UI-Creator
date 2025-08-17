export interface ComponentConfig {
  id: string
  name: string
  category: string
  description: string
  icon: string
  defaultStyle: ComponentStyle
  properties: ComponentProperty[]
  animations: AnimationOption[]
  hoverEffects: HoverEffect[]
}

export interface ComponentStyle {
  // Layout
  width?: string
  height?: string
  padding?: string
  margin?: string
  display?: string
  position?: string
  zIndex?: number
  
  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  lineHeight?: string
  letterSpacing?: string
  textAlign?: string
  textDecoration?: string
  textTransform?: string
  
  // Colors
  color?: string
  backgroundColor?: string
  borderColor?: string
  
  // Border & Shape
  border?: string
  borderWidth?: string
  borderStyle?: string
  borderRadius?: string
  
  // Effects
  boxShadow?: string
  filter?: string
  backdropFilter?: string
  opacity?: number
  
  // Background
  background?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  
  // Transform & Animation
  transform?: string
  transition?: string
  animation?: string
  
  // Hover States
  hover?: Partial<ComponentStyle>
  focus?: Partial<ComponentStyle>
  active?: Partial<ComponentStyle>
  
  // Advanced Effects
  clipPath?: string
  mask?: string
  mixBlendMode?: string
}

export interface ComponentProperty {
  id: string
  label: string
  type: 'text' | 'number' | 'color' | 'select' | 'boolean' | 'slider' | 'textarea' | 'spacing' | 'gradient'
  defaultValue: any
  options?: string[]
  min?: number
  max?: number
  step?: number
  unit?: string
  category: 'content' | 'styling' | 'layout' | 'effects' | 'behavior'
}

export interface AnimationOption {
  id: string
  name: string
  description: string
  cssClass: string
  duration?: string
  timing?: string
  delay?: string
}

export interface HoverEffect {
  id: string
  name: string
  description: string
  cssClass: string
  intensity?: 'subtle' | 'medium' | 'strong'
}

// Button Configuration
export const buttonConfig: ComponentConfig = {
  id: 'button',
  name: 'Button',
  category: 'Basic',
  description: 'Interactive button with advanced styling and animations',
  icon: 'button',
  defaultStyle: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    hover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
    }
  },
  properties: [
    // Content
    { id: 'text', label: 'Button Text', type: 'text', defaultValue: 'Click Me', category: 'content' },
    { id: 'size', label: 'Size', type: 'select', defaultValue: 'medium', options: ['small', 'medium', 'large'], category: 'layout' },
    
    // Styling
    { id: 'variant', label: 'Variant', type: 'select', defaultValue: 'filled', options: ['filled', 'outline', 'ghost', 'gradient'], category: 'styling' },
    { id: 'color', label: 'Color', type: 'color', defaultValue: '#3b82f6', category: 'styling' },
    { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff', category: 'styling' },
    { id: 'borderRadius', label: 'Border Radius', type: 'slider', defaultValue: 8, min: 0, max: 50, unit: 'px', category: 'styling' },
    
    // Effects
    { id: 'shadow', label: 'Shadow Intensity', type: 'slider', defaultValue: 2, min: 0, max: 5, category: 'effects' },
    { id: 'glowEffect', label: 'Glow Effect', type: 'boolean', defaultValue: false, category: 'effects' },
    { id: 'rippleEffect', label: 'Ripple Effect', type: 'boolean', defaultValue: false, category: 'effects' },
    
    // Layout
    { id: 'width', label: 'Width', type: 'text', defaultValue: 'auto', category: 'layout' },
    { id: 'fullWidth', label: 'Full Width', type: 'boolean', defaultValue: false, category: 'layout' },
  ],
  animations: [
    { id: 'bounce', name: 'Bounce', description: 'Bouncy entrance animation', cssClass: 'animate-bounce-in', duration: '0.6s' },
    { id: 'pulse', name: 'Pulse', description: 'Pulsing effect', cssClass: 'animate-pulse-continuous', duration: '2s' },
    { id: 'shake', name: 'Shake', description: 'Shake on hover', cssClass: 'animate-shake-hover', duration: '0.5s' },
    { id: 'glow', name: 'Glow Pulse', description: 'Glowing pulse effect', cssClass: 'animate-glow-pulse', duration: '2s' }
  ],
  hoverEffects: [
    { id: 'lift', name: 'Lift Up', description: 'Elevates button on hover', cssClass: 'hover-lift', intensity: 'medium' },
    { id: 'scale', name: 'Scale', description: 'Scales up on hover', cssClass: 'hover-scale', intensity: 'subtle' },
    { id: 'rotate', name: 'Rotate', description: 'Slight rotation on hover', cssClass: 'hover-rotate', intensity: 'subtle' },
    { id: 'glow', name: 'Glow', description: 'Glowing effect on hover', cssClass: 'hover-glow', intensity: 'strong' },
    { id: 'ripple', name: 'Ripple', description: 'Ripple effect on click', cssClass: 'hover-ripple', intensity: 'medium' },
    { id: 'neon', name: 'Neon', description: 'Neon glow effect', cssClass: 'hover-neon', intensity: 'strong' }
  ]
}

// Card Configuration
export const cardConfig: ComponentConfig = {
  id: 'card',
  name: 'Card',
  category: 'Layout',
  description: 'Versatile card container with advanced styling',
  icon: 'card',
  defaultStyle: {
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    hover: {
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-8px)'
    }
  },
  properties: [
    // Content
    { id: 'title', label: 'Title', type: 'text', defaultValue: 'Card Title', category: 'content' },
    { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Card description text', category: 'content' },
    { id: 'image', label: 'Image URL', type: 'text', defaultValue: '', category: 'content' },
    
    // Styling
    { id: 'backgroundColor', label: 'Background', type: 'color', defaultValue: '#ffffff', category: 'styling' },
    { id: 'borderColor', label: 'Border Color', type: 'color', defaultValue: '#e5e7eb', category: 'styling' },
    { id: 'borderRadius', label: 'Border Radius', type: 'slider', defaultValue: 12, min: 0, max: 50, unit: 'px', category: 'styling' },
    { id: 'backgroundGradient', label: 'Gradient Background', type: 'gradient', defaultValue: '', category: 'styling' },
    
    // Layout
    { id: 'padding', label: 'Padding', type: 'spacing', defaultValue: '24px', category: 'layout' },
    { id: 'maxWidth', label: 'Max Width', type: 'text', defaultValue: '400px', category: 'layout' },
    
    // Effects
    { id: 'elevation', label: 'Elevation', type: 'slider', defaultValue: 1, min: 0, max: 5, category: 'effects' },
    { id: 'glassEffect', label: 'Glass Morphism', type: 'boolean', defaultValue: false, category: 'effects' },
    { id: 'hoverLift', label: 'Hover Lift', type: 'boolean', defaultValue: true, category: 'effects' }
  ],
  animations: [
    { id: 'fadeInUp', name: 'Fade In Up', description: 'Fades in from bottom', cssClass: 'animate-fade-in-up', duration: '0.6s' },
    { id: 'scaleIn', name: 'Scale In', description: 'Scales in from center', cssClass: 'animate-scale-in', duration: '0.4s' },
    { id: 'slideInLeft', name: 'Slide In Left', description: 'Slides in from left', cssClass: 'animate-slide-in-left', duration: '0.5s' }
  ],
  hoverEffects: [
    { id: 'lift', name: 'Lift', description: 'Elevates card on hover', cssClass: 'hover-lift-card', intensity: 'medium' },
    { id: 'tilt', name: 'Tilt', description: '3D tilt effect', cssClass: 'hover-tilt', intensity: 'subtle' },
    { id: 'glow', name: 'Border Glow', description: 'Glowing border effect', cssClass: 'hover-border-glow', intensity: 'strong' },
    { id: 'parallax', name: 'Parallax', description: 'Parallax hover effect', cssClass: 'hover-parallax', intensity: 'medium' }
  ]
}

// Input Configuration
export const inputConfig: ComponentConfig = {
  id: 'input',
  name: 'Input',
  category: 'Form',
  description: 'Advanced input field with multiple states and effects',
  icon: 'input',
  defaultStyle: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    focus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },
  properties: [
    // Content
    { id: 'placeholder', label: 'Placeholder', type: 'text', defaultValue: 'Enter text...', category: 'content' },
    { id: 'label', label: 'Label', type: 'text', defaultValue: 'Input Label', category: 'content' },
    { id: 'type', label: 'Input Type', type: 'select', defaultValue: 'text', options: ['text', 'email', 'password', 'number'], category: 'content' },
    
    // Styling
    { id: 'borderColor', label: 'Border Color', type: 'color', defaultValue: '#e5e7eb', category: 'styling' },
    { id: 'focusColor', label: 'Focus Color', type: 'color', defaultValue: '#3b82f6', category: 'styling' },
    { id: 'borderRadius', label: 'Border Radius', type: 'slider', defaultValue: 8, min: 0, max: 30, unit: 'px', category: 'styling' },
    
    // Layout
    { id: 'size', label: 'Size', type: 'select', defaultValue: 'medium', options: ['small', 'medium', 'large'], category: 'layout' },
    { id: 'fullWidth', label: 'Full Width', type: 'boolean', defaultValue: false, category: 'layout' },
    
    // Effects
    { id: 'floatingLabel', label: 'Floating Label', type: 'boolean', defaultValue: false, category: 'effects' },
    { id: 'glowFocus', label: 'Focus Glow', type: 'boolean', defaultValue: true, category: 'effects' },
    { id: 'animatedBorder', label: 'Animated Border', type: 'boolean', defaultValue: false, category: 'effects' }
  ],
  animations: [
    { id: 'slideIn', name: 'Slide In', description: 'Slides in smoothly', cssClass: 'animate-slide-in', duration: '0.3s' },
    { id: 'focusRipple', name: 'Focus Ripple', description: 'Ripple effect on focus', cssClass: 'animate-focus-ripple', duration: '0.6s' }
  ],
  hoverEffects: [
    { id: 'borderGlow', name: 'Border Glow', description: 'Glowing border on hover', cssClass: 'hover-border-glow', intensity: 'medium' },
    { id: 'scale', name: 'Subtle Scale', description: 'Slight scale on hover', cssClass: 'hover-scale-subtle', intensity: 'subtle' }
  ]
}

// Export all configurations
export const componentConfigs: Record<string, ComponentConfig> = {
  button: buttonConfig,
  card: cardConfig,
  input: inputConfig,
  // More components will be added...
}

export const getComponentConfig = (componentId: string): ComponentConfig | null => {
  return componentConfigs[componentId] || null
}

export const getAllComponentConfigs = (): ComponentConfig[] => {
  return Object.values(componentConfigs)
}
