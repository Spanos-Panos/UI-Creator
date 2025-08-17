# UI Component Builder 🎨

A modern, interactive web application for designing and customizing UI components with live preview, built using React, Vite, and Tailwind CSS with a beautiful neumorphism design system.

## 🚀 Features

### Core Functionality
- **Component Library**: Browse and select from a curated collection of UI components
- **Live Preview**: Real-time preview of selected components with instant updates
- **Customization Panel**: Comprehensive settings for colors, typography, spacing, and effects
- **Export Options**: Download code in multiple formats (HTML/CSS, React, Vue, CSS only)
- **Neumorphism Design**: Beautiful, modern aesthetic with soft shadows and highlights

### Component Types (MVP)
- **Buttons**: Various styles, sizes, states, and hover effects
- **Cards**: Image cards, text cards, action cards with customizable layouts
- **Form Elements**: Input fields, textareas, select dropdowns

### Customization Options
- **Colors**: Background, text, border, accent colors
- **Typography**: Font family, size, weight, line height
- **Spacing**: Padding, margin, border radius
- **Effects**: Shadows, borders, hover animations
- **Layout**: Width, height, positioning

## 🏗️ Project Structure

```
UICreator/
├── public/                          # Static assets
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── builder/                 # Builder-specific components
│   │   │   ├── ComponentLibrary.tsx
│   │   │   ├── LivePreview.tsx
│   │   │   ├── CustomizationPanel.tsx
│   │   │   ├── ExportPanel.tsx
│   │   │   └── index.ts
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   └── common/                  # Common utility components
│   │       ├── ColorPicker.tsx
│   │       ├── Slider.tsx
│   │       ├── Select.tsx
│   │       └── index.ts
│   ├── hooks/                       # Custom React hooks
│   │   ├── useComponentBuilder.ts
│   │   ├── useCustomization.ts
│   │   └── useExport.ts
│   ├── stores/                      # Zustand state management
│   │   ├── componentStore.ts
│   │   ├── customizationStore.ts
│   │   └── index.ts
│   ├── types/                       # TypeScript type definitions
│   │   ├── components.ts
│   │   ├── customization.ts
│   │   └── index.ts
│   ├── utils/                       # Utility functions
│   │   ├── colorUtils.ts
│   │   ├── exportUtils.ts
│   │   └── index.ts
│   ├── styles/                      # Global styles and Tailwind config
│   │   ├── globals.css
│   │   └── neumorphism.css
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Base styles
├── .gitignore                       # Git ignore file
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # This file
```

## 🎯 Development Phases

### Phase 1: Foundation (MVP)
- [x] Project setup and configuration
- [ ] Basic component library (Button, Card, Input)
- [ ] Live preview functionality
- [ ] Basic customization panel
- [ ] Simple export (HTML/CSS)

### Phase 2: Enhancement
- [ ] Advanced customization options
- [ ] Animation and hover effects
- [ ] Component variants and states
- [ ] Export to React components
- [ ] Save/load component configurations

### Phase 3: Advanced Features
- [ ] Component composition
- [ ] Template system
- [ ] User accounts and cloud storage
- [ ] Collaboration features
- [ ] Plugin system

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Zustand
- **Component Library**: Custom built with neumorphism design
- **Development**: ESLint, Prettier, Husky

## 🎨 Design System

### Neumorphism Principles
- Soft, subtle shadows and highlights
- Muted, pastel color palette
- Rounded corners and smooth transitions
- Light and dark mode support
- Consistent spacing and typography

### Color Palette
- **Primary**: Soft blues and purples
- **Secondary**: Warm grays and beiges
- **Accent**: Muted greens and oranges
- **Background**: Off-whites and light grays
- **Text**: Dark grays and charcoals

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd UICreator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Key Components

### Component Library
- Grid-based component browser
- Search and filter functionality
- Component categories and tags

### Live Preview
- Real-time component rendering
- Responsive preview modes
- Device simulation (desktop, tablet, mobile)

### Customization Panel
- Organized settings groups
- Real-time updates
- Preset configurations
- Undo/redo functionality

### Export Panel
- Multiple export formats
- Code highlighting
- Copy to clipboard
- Download options

## 🔧 Configuration

### Tailwind CSS
- Custom color palette
- Extended spacing scale
- Custom animations
- Neumorphism utilities

### Vite
- React plugin
- TypeScript support
- CSS preprocessing
- Asset optimization

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For questions and support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
