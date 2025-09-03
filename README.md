# 🌟 Digital Store - Premium E-commerce Website

A modern, responsive e-commerce website for selling digital products with integrated Payhip payment processing. Built with pure HTML, CSS, and JavaScript for optimal GitHub Pages compatibility.

## ✨ Features

- **Modern Design**: Glassmorphism effects, gradients, and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Products**: Products loaded from JSON file for easy management
- **Payment Integration**: Seamless Payhip integration for secure payments
- **Scroll Animations**: Engaging fade-in and slide effects
- **Contact Form**: Professional contact form with validation
- **SEO Optimized**: Clean code structure and semantic HTML
- **GitHub Pages Ready**: Optimized for static hosting

## 🚀 Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Fork or Clone this repository**
   ```bash
   git clone [your-repo-url]
   cd digital-store
   ```

2. **Push to your GitHub repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

4. **Access your website**
   - Your site will be available at: `https://[your-username].github.io/[repository-name]`
   - It may take a few minutes for the site to become available

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd digital-store
   ```

2. **Start a local server**
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using Node.js:**
   ```bash
   npx serve .
   ```
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`

## 📁 Project Structure

```
digital-store/
├── index.html              # Main HTML file
├── style.css               # Styles with glassmorphism and animations
├── script.js               # JavaScript for functionality and Payhip integration
├── products.json           # Product data (EDIT THIS FILE)
├── assets/                 # Product images folder
│   ├── web-dev-course.jpg
│   ├── ux-design-course.jpg
│   └── ...
└── README.md              # This file
```

## 🛒 Adding/Editing Products

### Step 1: Edit products.json

Open `products.json` and add or modify products:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Your Product Name",
      "description": "Detailed product description",
      "price": "$99",
      "image": "assets/your-product-image.jpg",
      "payhipLink": "https://payhip.com/b/YOUR_PRODUCT_ID"
    }
  ]
}
```

### Step 2: Add Product Images

1. Add your product images to the `assets/` folder
2. Use high-quality images (recommended: 400x300px or larger)
3. Supported formats: JPG, PNG, WebP
4. Update the `image` field in products.json with the correct path

### Step 3: Get Payhip Links

1. **Create a Payhip Account**
   - Sign up at [payhip.com](https://payhip.com)
   - Verify your account

2. **Create Your Products**
   - Click "Add Product" in your Payhip dashboard
   - Upload your digital files
   - Set pricing and description
   - Publish the product

3. **Get the Buy Button Link**
   - Go to your product page
   - Click "Embed" or "Buy Button"
   - Copy the product URL (format: `https://payhip.com/b/XXXXX`)
   - Paste this URL in the `payhipLink` field

## 💰 Payment Processing

This website uses **Payhip** for secure payment processing:

- ✅ Secure checkout process
- ✅ Multiple payment methods (PayPal, Credit Cards)
- ✅ Automatic digital delivery
- ✅ Customer management
- ✅ Analytics and reporting
- ✅ No monthly fees (only transaction fees)

**Why Payhip?**
- Perfect for digital products
- Handles EU VAT automatically
- Supports multiple currencies
- Provides customer support
- Integrates seamlessly with static websites

## 📧 Contact Form Setup

The contact form is ready but needs a backend service. Here are recommended options:

### Option 1: Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form endpoint
4. In `script.js`, update the `CONFIG.formEndpoint` with your Formspree URL
5. Update the fetch request in `handleContactForm` method

### Option 2: Netlify Forms
1. If hosting on Netlify, add `netlify` attribute to the form
2. Forms will automatically work

### Option 3: EmailJS
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Set up email service
3. Replace the contact form handling code

## 🎨 Customization

### Colors and Styling

Edit CSS variables in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* Modify these gradients to match your brand */
}
```

### Animations

Adjust animation timings in `script.js`:

```javascript
const CONFIG = {
    animationDelay: 100,    // Delay between product animations
    scrollOffset: 100,      // Scroll offset for animations
};
```

### Content

1. **Update Navigation**: Edit the navigation links in `index.html`
2. **Hero Section**: Modify the hero title and description
3. **Testimonials**: Replace with real customer reviews
4. **Footer**: Update social links and company information

## 🔧 Advanced Features

### Adding a Blog

1. Create a `blog/` folder
2. Add individual HTML files for blog posts
3. Create a blog index page
4. Link to it from the main navigation

### Adding User Authentication

1. Consider using services like Auth0 or Firebase Auth
2. Implement user accounts for download history
3. Add user dashboard functionality

### Adding Analytics

1. **Google Analytics**: Add tracking code to `index.html`
2. **Payhip Analytics**: Use built-in Payhip reporting
3. **Custom Analytics**: Implement event tracking for user interactions

## 📱 Progressive Web App (PWA)

To make your site installable:

1. Create a `manifest.json` file
2. Add a service worker for offline functionality
3. Include PWA meta tags in HTML

## 🛡️ Security Best Practices

- ✅ All payments handled by Payhip (PCI compliant)
- ✅ No sensitive data stored locally
- ✅ HTTPS enforced on GitHub Pages
- ✅ Content Security Policy headers recommended
- ✅ Regular dependency updates

## 📈 SEO Optimization

### Current SEO Features:
- Semantic HTML structure
- Meta tags for social sharing
- Fast loading times
- Mobile-responsive design
- Clean URLs

### Additional SEO Improvements:
1. Add structured data markup
2. Optimize images with alt tags
3. Add meta descriptions for each page
4. Submit sitemap to search engines
5. Implement Open Graph tags

## 🐛 Troubleshooting

### Common Issues:

**Products not loading:**
- Check that `products.json` is valid JSON
- Verify image paths in assets folder
- Check browser console for errors

**Payhip buttons not working:**
- Verify Payhip script is loaded
- Check product URLs are correct
- Ensure products are published on Payhip

**Animations not working:**
- Check if Intersection Observer is supported
- Verify CSS classes are applied correctly
- Test in different browsers

**Contact form not submitting:**
- Set up a form handling service
- Update the form endpoint in script.js
- Check network requests in browser dev tools

## 🔄 Updates and Maintenance

### Regular Tasks:
1. **Update products.json** with new offerings
2. **Refresh product images** to maintain quality
3. **Monitor Payhip analytics** for sales data
4. **Update testimonials** with new customer feedback
5. **Check for broken links** and fix any issues

### Monthly Tasks:
1. Review and update pricing
2. Add new product categories
3. Optimize images for faster loading
4. Test contact form functionality
5. Review and respond to customer feedback

## 🤝 Support

### Getting Help:
1. **Documentation**: Read through this README thoroughly
2. **GitHub Issues**: Create an issue in this repository
3. **Payhip Support**: Contact Payhip for payment-related issues
4. **Community**: Join web development communities for general help

### Contributing:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Next Steps

After deploying your website:

1. **Test everything**: Go through the entire user journey
2. **Add your products**: Replace sample products with your actual offerings
3. **Set up analytics**: Track visitor behavior and sales
4. **Promote your store**: Share on social media and relevant communities
5. **Gather feedback**: Ask early customers for testimonials and improvements

---

## 📞 Quick Reference

### Important Files to Edit:
- `products.json` - Your product catalog
- `assets/` - Your product images
- `index.html` - Contact information and company details
- `style.css` - Brand colors and styling

### External Services Needed:
- **Payhip account** - For payment processing
- **Form service** - For contact form (Formspree recommended)
- **GitHub account** - For hosting

### Key URLs:
- **Live site**: `https://[username].github.io/[repo-name]`
- **Payhip dashboard**: `https://payhip.com/dashboard`
- **GitHub Pages settings**: Repository Settings > Pages

---

**🚀 Ready to launch your digital store? Follow the steps above and you'll have a professional e-commerce website running in minutes!**