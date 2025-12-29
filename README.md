# Restaurant-Management
A fully responsive, single-page marketing website for a fictional restaurant — built using HTML, CSS, JavaScript, and Bootstrap. The site is designed to showcase the restaurant’s story, menu, gallery, testimonials, and contact information with a modern and elegant layout.
# Masala & Mozzarella Café - Restaurant Landing Page

A complete, responsive restaurant landing page for **Masala & Mozzarella Café**, an Indian-Italian fusion restaurant. Built with HTML5, CSS3, JavaScript, and Bootstrap 5.3.

## 🍽️ Features

### Sections
- **Hero Section**: Eye-catching hero with logo, tagline, and call-to-action buttons
- **About Section**: Restaurant story with image
- **Menu Highlights**: 8 signature fusion dishes displayed in Bootstrap cards
- **Gallery**: Responsive image grid with Bootstrap modal lightbox
- **Testimonials**: Customer reviews in a Bootstrap carousel
- **Contact & Location**: Contact information, Google Maps iframe, and contact form
- **Footer**: Social media icons and opening hours

### Functionality
- ✅ **Sticky Navigation**: Fixed navbar with smooth scroll and active link highlighting
- ✅ **Form Validation**: JavaScript validation for required fields and email format
- ✅ **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- ✅ **Dark Mode**: Toggle dark mode with localStorage persistence
- ✅ **Today's Special**: Day-based badge system for menu items
- ✅ **Gallery Lightbox**: Modal image viewer for gallery images
- ✅ **Accessibility**: Semantic HTML, ARIA labels, focus states, skip links
- ✅ **SEO Optimized**: Meta tags, Open Graph tags, semantic structure
- ✅ **Smooth Scrolling**: Smooth scroll behavior for anchor links
- ✅ **Animation Effects**: Hover effects, transitions, and animations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Installation

1. **Clone or download** the repository
   ```bash
   git clone <repository-url>
   cd Restaurant_Page
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser, or
   - Use a local server for better testing:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Open your browser and navigate to `http://localhost:8000` (if using a server)
   - Or double-click `index.html` to open directly

## 📁 Project Structure

```
Restaurant_Page/
│
├── index.html          # Main HTML file
├── css/
│   └── custom.css      # Custom styles and dark mode
├── js/
│   └── main.js         # JavaScript functionality
├── assets/             # Images, icons, favicon (optional)
└── README.md           # Project documentation
```

## 🎨 Customization

### Colors
Edit the CSS variables in `css/custom.css`:
```css
:root {
    --primary-color: #d32f2f;
    --secondary-color: #f57c00;
    --dark-bg: #1a1a1a;
    --light-bg: #f8f9fa;
    /* ... */
}
```

### Menu Items
Update menu items in `index.html` (Menu Highlights section):
- Modify the card content
- Change images (update `src` attributes)
- Adjust prices and descriptions

### Contact Information
Update contact details in `index.html`:
- Address in Contact section
- Phone number
- Email address
- Opening hours
- Google Maps embed URL

### Today's Special
Modify the special schedule in `js/main.js`:
```javascript
const specialSchedule = {
    0: [], // Sunday
    1: ['special-badge-1'], // Monday
    // ... customize for each day
};
```

### Images
Replace placeholder images with your own:
- Update `src` attributes in `<img>` tags
- Recommended image sizes:
  - Hero: 1920x1080px
  - Menu cards: 400x300px
  - Gallery: 400x300px
  - About section: 600x400px

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles, animations, dark mode
- **JavaScript (ES6+)**: Form validation, dark mode toggle, smooth scroll
- **Bootstrap 5.3**: Responsive grid, components, utilities
- **Bootstrap Icons**: Icon library
- **Google Fonts**: Playfair Display & Poppins

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Skip links
- Alt text for images
- Proper heading hierarchy
- Color contrast compliance

## 🎯 SEO Features

- Meta title and description
- Open Graph tags for social sharing
- Semantic HTML structure
- Proper heading hierarchy
- Alt attributes for images
- Descriptive link text

## 🌙 Dark Mode

The website includes a dark mode toggle that:
- Persists user preference in localStorage
- Applies theme across all sections
- Updates icon (moon/sun) based on theme
- Maintains accessibility in both modes

## 📝 Form Validation

The contact form includes:
- Required field validation
- Email format validation
- Phone number format validation (optional)
- Real-time validation feedback
- Visual indicators (green for valid, red for invalid)
- Success/error messages

## 🔍 Future Enhancements

Potential improvements:
- [ ] Backend integration for contact form
- [ ] Online reservation system
- [ ] Menu filtering and search
- [ ] Multi-language support
- [ ] Blog section
- [ ] Online ordering system
- [ ] Customer review submission
- [ ] Image lazy loading optimization
- [ ] Progressive Web App (PWA) features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Masala & Mozzarella Café**
- Website: [Your Website URL]
- Email: info@masalamozzarella.com

## 🙏 Acknowledgments

- Bootstrap team for the amazing framework
- Google Fonts for beautiful typography
- Bootstrap Icons for icon library
- All the open-source contributors

## 📞 Support

For support, email info@masalamozzarella.com or contact us through the website's contact form.

---

**Enjoy your visit to Masala & Mozzarella Café!** 🍕🍛


