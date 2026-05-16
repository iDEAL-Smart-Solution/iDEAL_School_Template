# Dynamic School Landing Page Template

A professional, reusable, and fully responsive landing page template that dynamically fetches and displays school data from a backend API. Built with React, Tailwind CSS, and modern frontend best practices.

## 🎯 Features

✨ **Dynamic Content**: Fetches school data from backend API - no hardcoding
📱 **Fully Responsive**: Perfect on mobile, tablet, and desktop devices
🎨 **Beautiful Design**: Modern, professional, and elegant UI
⚡ **High Performance**: Optimized with lazy loading and efficient rendering
🔄 **Reusable Components**: Modular component architecture for scalability
🎭 **Smooth Animations**: Elegant transitions and fade-ins
🛡️ **Error Handling**: Comprehensive error states and loading indicators
♿ **Accessible**: WCAG compliant with proper semantic HTML
📦 **Well Structured**: Clean folder structure and organized code
🔗 **Flexible Routing**: Support for both school IDs and slugs

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Navbar.jsx       # Navigation bar with responsive menu
│   ├── Hero.jsx         # Hero section with CTA
│   ├── About.jsx        # About school section
│   ├── Features.jsx     # Portal features showcase
│   ├── Programs.jsx     # Academic programs display
│   ├── Contact.jsx      # Contact form and information
│   └── Footer.jsx       # Footer with links and info
│
├── pages/               # Page components
│   └── SchoolLandingPage.jsx  # Main landing page component
│
├── hooks/               # Custom React hooks
│   └── useSchoolData.js # Hook for fetching school data
│
├── services/            # API service layer
│   └── schoolApi.js     # Axios API client
│
├── App.jsx             # Main App component with routing
├── main.jsx            # Entry point
├── index.css           # Global styles and animations
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd dynamic-school-landing-temp
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and set your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start the development server**
```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🔌 API Integration

### Backend API Format

The application expects your backend to provide the following endpoint:

```
GET /api/schools/{school_id}/landing-page
```

### Expected Response Format

```json
{
  "id": 1,
  "name": "Ideal International College",
  "logo": "https://example.com/logo.png",
  "theme_color": "#1e40af",
  "tagline": "Empowering Students Through Technology",
  "about": "We provide digital academic solutions...",
  "features": [
    {
      "title": "Digital Learning",
      "description": "Access course materials anytime",
      "icon": "📚"
    }
  ],
  "programs": [
    {
      "name": "Science",
      "description": "Physics, Chemistry, Biology...",
      "icon": "🔬"
    }
  ],
  "contact": {
    "email": "info@school.com",
    "phone": "+1-234-567-8900",
    "address": "123 Education Street, City, State"
  },
  "portal_link": "/login",
  "footer": {
    "copyright": "© 2024 School Name. All rights reserved.",
    "company_name": "School Name"
  }
}
```

### Optional Response Fields

If certain fields are missing from your API response, the template provides sensible defaults:

- `features`: Defaults to a set of standard portal features
- `programs`: Defaults to common academic programs
- `footer`: Auto-generates copyright with current year
- `portal_link`: Defaults to `/login`

## 📖 Usage

### For School ID (Numeric)
Navigate to: `http://localhost:3000/school/{schoolId}`

Example: `http://localhost:3000/school/1`

### For School Slug
Navigate to: `http://localhost:3000/school/slug/{slug}`

Example: `http://localhost:3000/school/slug/ideal-international`

### In Your Own Application

```jsx
import SchoolLandingPage from './pages/SchoolLandingPage';

// Use with school ID
<SchoolLandingPage schoolId="1" isSlug={false} />

// Or use with slug
<SchoolLandingPage schoolId="ideal-international" isSlug={true} />
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the theme:

```js
theme: {
  extend: {
    colors: {
      primary: '#1e40af',    // Primary blue
      secondary: '#0f172a',  // Dark background
      accent: '#3b82f6',     // Light blue
    },
  },
}
```

### Typography

Fonts are configured in `src/index.css`. You can add custom fonts via Tailwind or import from Google Fonts.

### Animations

Custom animations are defined in `src/index.css` and `tailwind.config.js`. Add new animations as needed.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Production API
# VITE_API_URL=https://api.yourdomain.com/api
```

## 📊 Component Breakdown

### Navbar
- School logo and name
- Navigation links
- Responsive mobile menu
- Portal login button
- Register button

### Hero
- Eye-catching gradient background
- School name and tagline
- Decorative elements
- Call-to-action buttons
- Scroll indicator

### About
- School logo display
- About description
- Feature checklist
- Professional layout

### Features
- Dynamic feature cards from API
- Default features fallback
- Hover animations
- Icon support

### Programs
- Academic program cards
- Grid layout
- Explore buttons
- Icon and description fields

### Contact
- Contact form with validation
- Email, phone, address display
- Contact method icons
- Success message feedback

### Footer
- Quick navigation links
- School information
- Portal link
- Copyright and policies
- Responsive layout

## 🧪 Testing

### Sample Test Data

For local testing without a backend, you can mock the API response. Edit `src/services/schoolApi.js` to return test data:

```js
const mockData = {
  name: "Test School",
  logo: "https://via.placeholder.com/200",
  tagline: "Test Tagline",
  about: "Test About Section",
  features: [],
  programs: [],
  contact: {
    email: "test@school.com",
    phone: "+1-234-567-8900",
    address: "123 Test St"
  }
};
```

## 🚨 Error Handling

The template includes comprehensive error handling:

- **Loading State**: Shows spinner while fetching data
- **Error State**: Displays error message with retry button
- **Fallback Data**: Provides defaults for optional fields
- **Network Errors**: Graceful error messages for failed requests

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on buttons and interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus indicators for keyboard users
- Alt text for images

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

All components are optimized for each breakpoint.

## 🔐 Security Notes

- API calls use axios with proper error handling
- Input validation in contact form
- Environment variables for sensitive config
- No sensitive data hardcoded in components

## 📦 Dependencies

### Production
- `react`: UI library
- `react-dom`: React DOM rendering
- `react-router-dom`: Client-side routing
- `axios`: HTTP client

### Development
- `vite`: Build tool
- `tailwindcss`: Utility-first CSS framework
- `postcss`: CSS processing
- `autoprefixer`: CSS vendor prefixes
- `eslint`: Code linting

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📝 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### API Connection Issues

**Problem**: "Failed to fetch school data"

**Solution**:
1. Check that the backend API is running
2. Verify the `VITE_API_URL` in `.env` is correct
3. Check browser console for CORS errors
4. Ensure the school ID/slug exists in the database

### Styling Issues

**Problem**: Tailwind CSS not applying styles

**Solution**:
1. Rebuild the project: `npm run dev`
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check that all Tailwind config is valid

### Build Errors

**Problem**: Build fails during `npm run build`

**Solution**:
1. Clear dist folder: `rm -rf dist`
2. Reinstall dependencies: `npm install`
3. Check for syntax errors in components

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 🎓 Best Practices Used

✅ Component-based architecture
✅ Custom hooks for logic reuse
✅ Proper error handling
✅ Loading states
✅ Responsive design
✅ Semantic HTML
✅ CSS utility classes
✅ Clean code structure
✅ Environment configuration
✅ Accessibility compliance

---

**Built with ❤️ for modern education portals**
