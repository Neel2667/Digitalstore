# Digital Store - E-commerce Website

## Overview

This is a modern, responsive e-commerce website designed for selling digital products. Built with pure HTML, CSS, and JavaScript for optimal static hosting compatibility with GitHub Pages. The site features a glassmorphism design aesthetic with smooth animations, dynamic product loading from JSON, and integrated Payhip payment processing. The architecture prioritizes simplicity, performance, and ease of deployment while maintaining a professional appearance suitable for digital product sales.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Client-Side Approach**: Built entirely with vanilla HTML, CSS, and JavaScript to ensure compatibility with static hosting platforms like GitHub Pages
- **Component-Based Structure**: Modular JavaScript class structure with a main `DigitalStore` class managing application state and functionality
- **Progressive Enhancement**: Core functionality works without JavaScript, with enhanced features added through JavaScript
- **Responsive Design**: CSS Grid and Flexbox layout system with mobile-first responsive breakpoints

### Design System
- **Glassmorphism UI**: Modern design language using CSS custom properties for consistent theming with glass-like transparency effects
- **CSS Custom Properties**: Centralized design tokens for colors, spacing, and animations stored in `:root` variables
- **Animation System**: Scroll-triggered animations and smooth transitions using CSS transforms and opacity changes
- **Typography**: Google Fonts integration with Poppins font family for modern, readable text

### Data Management
- **JSON-Based Product Catalog**: Products stored in `products.json` file for easy content management without database requirements
- **Dynamic Content Loading**: JavaScript fetch API loads product data and dynamically generates HTML elements
- **Static Asset Structure**: Images and resources organized in predictable folder structure for easy maintenance

### Payment Processing
- **Payhip Integration**: External payment processor handles all transaction security and processing
- **Direct Link Strategy**: Each product contains a Payhip link for immediate redirect to secure checkout
- **No Server Requirements**: Payment processing entirely handled by third-party service

### Performance Optimization
- **Static Site Architecture**: No server-side processing required, enabling fast loading times and simple deployment
- **Lazy Loading**: Scroll-based animations and content loading to improve initial page load performance
- **CDN Dependencies**: External libraries loaded from CDNs for better caching and reduced bundle size

## External Dependencies

### Payment Processing
- **Payhip**: Third-party e-commerce platform handling secure payment processing, digital product delivery, and customer management

### Fonts and Icons
- **Google Fonts**: Poppins font family loaded via CDN for consistent typography
- **Font Awesome**: Icon library (version 6.0.0) loaded via CDN for UI icons and visual elements

### Hosting Platform
- **GitHub Pages**: Primary deployment target requiring static-only architecture
- **Alternative Static Hosts**: Compatible with Netlify, Vercel, and other static hosting services

### Form Handling
- **Configurable Endpoint**: Contact form designed to work with services like Formspree or Netlify Forms
- **Client-Side Validation**: JavaScript form validation with placeholder for server-side integration

### Browser APIs
- **Fetch API**: For loading JSON product data
- **Intersection Observer**: For scroll-triggered animations (with fallback support)
- **Local Storage**: For potential future features like shopping cart persistence