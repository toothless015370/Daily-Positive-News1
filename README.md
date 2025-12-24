# Daily Positive - News Platform Frontend

🔗 **Live Demo:** [Visit the website](https://ai-news-analyzer-one.vercel.app/)

A modern, AI-powered news aggregation platform that delivers global breakthroughs with intelligent categorization and real-time updates.

## 🚀 Features

- **Real-time News Feed** - Browse the latest positive news from around the world
- **Smart Filtering** - Filter by category, country, date range, and sort preferences
- **Hero Section** - Dynamic showcase of trending and most-viewed articles
- **Detailed News View** - Full article pages with enhanced readability
- **Admin Dashboard** - Content management system for authenticated users
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **User Authentication** - Secure login and registration system

## 🛠️ Tech Stack

- **React 19** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **date-fns** - Date formatting and manipulation
- **Vite** - Fast build tool and dev server

## 📦 Project Structure

```
daily-positive-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar with auth controls
│   │   ├── Footer.jsx          # Site footer
│   │   ├── NewsCard.tsx        # Individual news card component
│   │   ├── NewsHero.tsx        # Hero section with featured articles
│   │   └── NewsFilters.tsx     # Filtering and sorting controls
│   ├── pages/
│   │   ├── Home.tsx            # Main news feed page
│   │   ├── NewsDetail.tsx      # Individual article view
│   │   ├── AdminDashboard.tsx  # Admin content management
│   │   ├── Login.tsx           # User login
│   │   └── Register.tsx        # User registration
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Root component with routing
│   └── index.tsx               # Application entry point
├── index.html                   # HTML template
└── package.json                # Project dependencies
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (for full functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/toothless015370/Daily-Positive-News1
cd Daily-Positive-News1
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint:
   - Update the API base URL in your axios configuration
   - Default: `http://localhost:8000` (adjust as needed)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:5173
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Key Components

### Navbar
- Dynamic authentication state
- Logo and branding
- Navigation links
- Login/Logout controls

### NewsHero
- Featured article showcase
- Most viewed article highlight
- Recent popular articles sidebar
- Image overlays with gradients

### NewsFilters
- Category filtering
- Country/region selection
- Date range picker
- Sorting options (newest, oldest, popular)

### NewsCard
- Article preview with image
- Category badges
- View count
- Publication date
- Truncated content preview

## 🔐 Authentication

The app uses JWT token-based authentication:
- Tokens stored in `localStorage`
- Protected routes for admin dashboard
- Automatic redirect on unauthorized access
- Login/logout state management

## 🌐 API Integration

All API calls are made through axios to the backend endpoints:
- `GET /news` - Fetch all news articles
- `GET /news/:id` - Fetch single article
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- Admin endpoints require authentication token

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Flexible grid layouts
- Touch-friendly interactions

## 🎯 Feature Highlights

### Filtering System
- Multiple filter combinations
- Real-time filter updates
- Clear/reset functionality
- Persistent filter state

### Hero Section
- Automatic content rotation
- View-based prioritization
- Responsive image handling
- Smooth transitions

### Admin Dashboard
- CRUD operations for news
- Category management
- User management
- Analytics overview

## 🐛 Known Issues

- Image placeholders use picsum.photos (replace with actual images)
- Some special characters may not render correctly
- Date picker needs browser support for `<input type="date">`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Daily Positive AI Team

## 🙏 Acknowledgments

- Inter font family by Google Fonts
- Tailwind CSS for styling utilities
- React community for excellent documentation
- All contributors and supporters

---

**Built with ❤️ by the Daily Positive team**
