# Warren Brand Guidelines - Visual Design System

## Brand Identity
**Product Name**: Warren  
**Tagline**: "Your Gateway to Student Voice Insights"  
**Theme**: Educational survey platform with rabbit/burrow metaphor

## Color Palette

### Primary Colors
- **Primary Dark Blue**: `#032E46` - Main brand color for headers, buttons, and key elements
- **Secondary Green**: `#6EAD7C` - Accent color for success states and secondary actions

### Background Colors
- **Off White**: `#F8F7F4` - Main content backgrounds
- **Page Background**: `#F6F4ED` - Overall page background
- **Light Gray**: `#D9D9D9` - Sidebar and header backgrounds
- **Light Blue**: `#DAEDF0` - Input fields and action cards

### Text Colors
- **Primary Text**: `#333333` - Main content text
- **Secondary Text**: `#6C757D` - Subtle text and descriptions
- **Placeholder Text**: `#999999` - Form placeholders

### UI Element Colors
- **Border**: `#CED4DA` - Standard borders
- **Header Blue Gray**: `#DDE2E7` - Survey headers

## Typography

### Font Families
- **Primary Font**: 'Acumin Pro' - Used for body text, UI elements, and most content
- **Display Font**: 'Lust Display' - Used for headings (h1-h6) and hero titles
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, etc.

### Typography Scale
- **Hero Title**: 48px, weight 700 (Lust Display)
- **Section Headers**: 24px, weight 300-700 (varies by context)
- **Body Text**: 16-24px, weight 300-600 (Acumin Pro)
- **UI Labels**: 12-16px, weight 300-600 (Acumin Pro)

## Layout & Spacing

### Layout Structure
- **Sidebar Width**: 281px fixed
- **Content Areas**: Flexible with max-widths
- **Card Padding**: 1-2rem standard
- **Border Radius**: 8-30px (varies by component)

### Spacing System
- **Small Gap**: 8px
- **Medium Gap**: 16px
- **Large Gap**: 24px
- **Section Spacing**: 32px+

## Component Styles

### Buttons
- **Primary Button**: Dark blue background (#032E46), white text, 7px border radius
- **Secondary Button**: Light gray background (#EFEFF5), dark text
- **Button Padding**: 12px 28px
- **Font Weight**: 600

### Cards
- **Background**: White (#fff)
- **Border Radius**: 8-24px
- **Shadow**: 0 4px 12px rgba(0,0,0,0.1) or 0 6px 32px rgba(37,74,138,0.08)
- **Border**: 1.5px solid #e7e7ef (for main cards)

### Form Elements
- **Input Background**: Light blue (#DAEDF0)
- **Border Radius**: 30px (rounded inputs) or 12px (textareas)
- **Height**: 54px for standard inputs
- **Padding**: 12px 16px

### Navigation
- **Sidebar Background**: Light gray (#D9D9D9)
- **Active State**: Font weight 700
- **Item Padding**: 16px vertical, 43px left

## Visual Hierarchy

### Information Architecture
1. **Dashboard Level**: Hero titles, main navigation
2. **Section Level**: Content headers, card titles
3. **Content Level**: Body text, form labels
4. **Detail Level**: Helper text, metadata

### Visual Weight
- **Primary Actions**: Dark blue, prominent sizing
- **Secondary Actions**: Gray backgrounds, smaller
- **Success States**: Green accent color
- **Destructive Actions**: Red/pink tones

## Interaction States

### Hover Effects
- **Cards**: Subtle background color shift and enhanced shadow
- **Buttons**: Implicit hover states (not explicitly defined but expected)

### Active States
- **Navigation**: Bold font weight (700)
- **Selected Items**: Color changes to primary blue

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
  - Sidebar becomes full-width
  - Dashboard header stacks vertically
  - Form fields stack in single column

### Adaptive Elements
- **Wizard Cards**: 90vw width, max 1200px
- **Form Fields**: Full width on mobile
- **Header Elements**: Responsive sizing and layout

## Brand Voice in UI

### Terminology
- **"Burrow Builder"** - Survey creation tool
- **"The Den"** - Results/analytics section
- **"Dig New Burrow"** - Create new survey
- **"Warren"** - Overall platform name

### Messaging Tone
- Educational and approachable
- Metaphorical (rabbit/burrow theme)
- Professional but friendly

## Logo & Assets
- **Logo**: Nesolagus logo (245px × 138px in sidebar) - if not in repo use placeholder
- **Placement**: Top-left of sidebar, consistent across all pages

## Accessibility Considerations
- **Color Contrast**: Dark blue (#032E46) on light backgrounds
- **Interactive Elements**: Proper focus states and semantic markup
- **Typography**: Readable font sizes and clear hierarchy