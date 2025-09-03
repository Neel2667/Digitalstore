// ===== DIGITAL STORE JAVASCRIPT =====
// Author: Replit Agent
// Description: Main JavaScript file for the Digital Store e-commerce website
// Features: Product loading, animations, form handling, and Payhip integration

/**
 * CONFIGURATION
 * Update these settings to customize your store
 */
const CONFIG = {
    // Products JSON file path
    productsFile: 'products.json',
    
    // Animation delays (milliseconds)
    animationDelay: 100,
    
    // Scroll offset for animations
    scrollOffset: 100,
    
    // Form submission endpoint (for contact form)
    // Replace with your actual form handler or use services like Formspree, Netlify Forms
    formEndpoint: '#', // Replace with actual endpoint
};

/**
 * MAIN APPLICATION
 */
class DigitalStore {
    constructor() {
        this.products = [];
        this.isLoading = false;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
    }

    /**
     * Load products from JSON file
     * Products should be in products.json with the following structure:
     * {
     *   "products": [
     *     {
     *       "id": 1,
     *       "name": "Product Name",
     *       "description": "Product description",
     *       "price": "$99",
     *       "image": "assets/product1.jpg",
     *       "payhipLink": "https://payhip.com/b/xxxxx"
     *     }
     *   ]
     * }
     */
    async loadProducts() {
        try {
            this.isLoading = true;
            this.showLoadingState();

            const response = await fetch(CONFIG.productsFile);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.products = data.products || [];
            
            this.renderProducts();
            this.setupProductAnimations();
            
        } catch (error) {
            console.error('Error loading products:', error);
            this.showErrorState();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Show loading state in products grid
     */
    showLoadingState() {
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Loading products...</span>
                </div>
            `;
        }
    }

    /**
     * Show error state when products fail to load
     */
    showErrorState() {
        const productsGrid = document.getElementById('products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-exclamation-triangle" style="color: #f5576c;"></i>
                    <span>Failed to load products. Please try again later.</span>
                </div>
            `;
        }
    }

    /**
     * Render products in the grid
     */
    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid || this.products.length === 0) return;

        // Clear loading state
        productsGrid.innerHTML = '';

        // Create product cards
        this.products.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            productsGrid.appendChild(productCard);
        });
    }

    /**
     * Create a product card element
     */
    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.transitionDelay = `${index * CONFIG.animationDelay}ms`;

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
                ${this.createPayhipButton(product)}
            </div>
        `;

        // Add error handling for images
        const img = card.querySelector('img');
        img.addEventListener('error', () => {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMmEyYTJhIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE1MCA4Mi4zNiAxNjQuOTEgNjggMTgzIDY4QzIwMS4wOSA2OCAyMTYgODIuMzYgMjE2IDEwMEMyMTYgMTE3LjY0IDIwMS4wOSAxMzIgMTgzIDEzMkMxNjQuOTEgMTMyIDE1MCAxMTcuNjQgMTUwIDEwMFoiIGZpbGw9IiM1MDUwNTAiLz4KPHBhdGggZD0iTTEyNSAxMjVMMTc1IDc1TDIyNSAxMjVMMTc1IDE3NUwxMjUgMTI1WiIgZmlsbD0iIzUwNTA1MCIvPgo8L3N2Zz4K';
            img.alt = 'Product image not available';
        });

        return card;
    }

    /**
     * Create Payhip buy button
     * IMPORTANT: To customize Payhip buttons:
     * 1. Go to your Payhip dashboard
     * 2. Navigate to your product
     * 3. Copy the embed code or direct link
     * 4. Update the payhipLink field in products.json
     */
    createPayhipButton(product) {
        if (!product.payhipLink) {
            return `<button class="product-button" disabled>Coming Soon</button>`;
        }

        // Extract Payhip product ID from the link
        const payhipId = this.extractPayhipId(product.payhipLink);
        
        if (payhipId) {
            // Create embedded Payhip button
            return `
                <a href="${product.payhipLink}" 
                   class="payhip-buy-button product-button" 
                   data-theme="none" 
                   data-product="${payhipId}">
                    <i class="fas fa-shopping-cart"></i> Buy Now
                </a>
            `;
        } else {
            // Fallback to direct link
            return `
                <a href="${product.payhipLink}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="product-button">
                    <i class="fas fa-external-link-alt"></i> Buy Now
                </a>
            `;
        }
    }

    /**
     * Extract Payhip product ID from URL
     * Supports formats: https://payhip.com/b/xxxxx or similar
     */
    extractPayhipId(url) {
        const match = url.match(/payhip\.com\/b\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    }

    /**
     * Set up scroll-triggered animations
     */
    setupScrollAnimations() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: `-${CONFIG.scrollOffset}px 0px`
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    // Stop observing once animated
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    /**
     * Set up product animations when they load
     */
    setupProductAnimations() {
        // Observe product cards for scroll animations
        document.querySelectorAll('.product-card').forEach(card => {
            this.observer.observe(card);
        });

        // Observe testimonial cards
        document.querySelectorAll('.testimonial-card').forEach(card => {
            this.observer.observe(card);
        });
    }

    /**
     * Handle mobile menu toggle
     */
    setupMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');

        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                // Animate hamburger bars
                const bars = mobileMenu.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    bar.style.transform = navMenu.classList.contains('active') 
                        ? `rotate(${index % 2 ? -45 : 45}deg) translate(${index % 2 ? -6 : 6}px, ${index % 2 ? 6 : -6}px)`
                        : 'none';
                });
            });

            // Close menu when clicking nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const bars = mobileMenu.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                    });
                });
            });
        }
    }

    /**
     * Set up smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Handle contact form submission
     * CUSTOMIZE: Replace with your preferred form handling service
     * Options: Formspree, Netlify Forms, EmailJS, etc.
     */
    async handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        try {
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // FOR GITHUB PAGES: Replace this with your form handler
            // Example with Formspree:
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // });

            // Simulate form submission for demo
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            e.target.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    /**
     * Show form submission message
     */
    showFormMessage(message, type) {
        const form = document.getElementById('contact-form');
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 10px;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
            color: ${type === 'success' ? '#22c55e' : '#ef4444'};
        `;
        messageDiv.textContent = message;

        form.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    /**
     * Handle scroll events for navbar
     */
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Recalculate animations or layouts if needed
        const navMenu = document.getElementById('nav-menu');
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
        }
    }

    /**
     * Handle page load
     */
    handleLoad() {
        // Initialize Payhip if available (try different initialization methods)
        this.initializePayhip();
        
        // Trigger scroll animations for visible elements
        this.handleScroll();
    }

    /**
     * Initialize Payhip integration safely
     */
    initializePayhip() {
        // Check if Payhip is loaded and try different initialization methods
        if (typeof Payhip !== 'undefined') {
            try {
                // Try modern Payhip initialization
                if (Payhip.Button && typeof Payhip.Button.init === 'function') {
                    Payhip.Button.init();
                } else if (typeof Payhip.init === 'function') {
                    Payhip.init();
                }
            } catch (error) {
                console.log('Payhip initialization not required or failed:', error.message);
                // Payhip buttons will still work with direct links
            }
        } else {
            // Payhip script not loaded, buttons will work as direct links
            console.log('Payhip script not loaded, using direct links');
        }
    }

    /**
     * Handle navigation clicks
     */
    handleNavClick(e) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
    }
}

/**
 * UTILITY FUNCTIONS
 */

/**
 * Debounce function to limit event frequency
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    new DigitalStore();
});

/**
 * HOW TO CUSTOMIZE THIS WEBSITE:
 * 
 * 1. ADDING/EDITING PRODUCTS:
 *    - Edit the products.json file
 *    - Add your product images to the assets/ folder
 *    - Update the payhipLink field with your Payhip product URLs
 * 
 * 2. REPLACING PAYHIP LINKS:
 *    - Go to your Payhip dashboard
 *    - Navigate to your product
 *    - Copy the buy button embed code or direct link
 *    - Update the payhipLink in products.json
 * 
 * 3. CONTACT FORM INTEGRATION:
 *    - Sign up for a form service (Formspree, Netlify Forms, etc.)
 *    - Replace the form endpoint in CONFIG.formEndpoint
 *    - Update the handleContactForm method accordingly
 * 
 * 4. STYLING CUSTOMIZATION:
 *    - Modify CSS variables in style.css
 *    - Update colors, fonts, and animations
 *    - Customize the glassmorphism effects
 * 
 * 5. DEPLOYING TO GITHUB PAGES:
 *    - Push all files to your GitHub repository
 *    - Go to repository Settings > Pages
 *    - Select source branch (usually main/master)
 *    - Your site will be available at: https://USERNAME.github.io/REPOSITORY-NAME
 * 
 * 6. ADDING MORE FEATURES:
 *    - Shopping cart functionality
 *    - User authentication
 *    - Product search and filtering
 *    - Blog integration
 *    - Newsletter signup
 */