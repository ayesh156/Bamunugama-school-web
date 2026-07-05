# 🏫 Bamunugama Navodya Vidyalaya - Matara

> **School Website** — A modern, production-ready React web application for MR/Bamunugama M.V., Horapawita, Matara, Sri Lanka.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Customization Guide](#customization-guide)
  - [Changing School Information](#changing-school-information)
  - [Replacing Images](#replacing-images)
  - [Customizing Colors & Theme](#customizing-colors--theme)
  - [Adding Pages](#adding-pages)
- [Architecture & Scaling](#architecture--scaling)
  - [Current Architecture](#current-architecture)
  - [Scaling to a Full School Management Portal](#scaling-to-a-full-school-management-portal)
- [Dark & Light Mode](#dark--light-mode)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This is a complete, production-ready school website for **Bamunugama Navodya Vidyalaya - Matara**. Built with modern web technologies, it features a beautiful responsive design with glassmorphism elements, micro-animations, and full dark/light mode support. The architecture is intentionally designed to scale seamlessly into a comprehensive school management portal.

**School Details:**
- **Name:** MR/Bamunugama M.V. (Bamunugama Navodya Vidyalaya - Matara)
- **Motto:** "නැණ ගුණ වඩමු" (Næna Guna Wadamu) — Nurturing Wisdom and Virtue
- **Location:** Horapawita, Matara, Sri Lanka
- **Status:** Navodya School

---

## Features

- ✅ **Responsive Design** — Fully responsive across all devices (mobile, tablet, desktop)
- ✅ **Dark/Light Mode** — Global theme toggle with local storage persistence and system preference detection
- ✅ **React Router DOM** — Clean, SEO-friendly navigation with active route highlighting
- ✅ **Glassmorphism UI** — Modern glass-effect navbar and card components
- ✅ **Image Gallery** — Category-based gallery with full-screen lightbox preview modal (keyboard navigable)
- ✅ **Contact Form** — Fully functional form with client-side validation and success feedback
- ✅ **Dynamic Hero Section** — Full-screen hero with gradient overlay and scroll indicator
- ✅ **Timeline Component** — Animated school history timeline
- ✅ **Statistics Cards** — Animated stats section with iconography
- ✅ **News Cards** — Latest updates/news with hover effects
- ✅ **Micro-animations** — Fade-in, slide-down, and hover animations throughout
- ✅ **SEO Optimized** — Meta tags, semantic HTML, proper heading hierarchy
- ✅ **Accessibility** — ARIA labels, keyboard navigation, semantic elements

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework (functional components + Hooks) |
| **Vite 8** | Build tool and development server |
| **React Router DOM 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Lucide React** | Icon library |
| **CSS Custom Properties** | Theme colors & dark mode |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) v9 or later (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/school-web.git

# Navigate to the project directory
cd school-web

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

The development server will start at **http://localhost:5173**. The browser will automatically reload when you make changes to the source files.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The production build will be output to the `dist/` directory, ready for deployment.

---

## Project Structure

```
school-web/
├── public/                     # Static assets (served as-is)
│   ├── favicon.svg             # School favicon
│   └── icons.svg               # SVG icon sprite
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx          # Responsive navigation bar
│   │   └── Footer.jsx          # Site footer with contact info
│   ├── context/                # React context providers
│   │   └── ThemeContext.jsx    # Dark/Light mode context
│   ├── pages/                  # Page-level components
│   │   ├── Home.jsx            # Landing page with hero, stats, news
│   │   ├── About.jsx           # School history, vision, mission, timeline
│   │   ├── Gallery.jsx         # Image gallery with lightbox modal
│   │   └── Contact.jsx         # Contact form with info cards
│   ├── App.jsx                 # Root component with routing
│   ├── index.css               # Global styles, Tailwind imports, theme
│   └── main.jsx                # Application entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration (React + Tailwind)
├── package.json                # Dependencies and scripts
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file
```

---

## Customization Guide

### Changing School Information

All school-specific text content is embedded directly in the page components. To update:

1. **School name / motto / address** — Update in `Navbar.jsx`, `Footer.jsx`, `Home.jsx`, `About.jsx`, `Contact.jsx`
2. **Contact details** — Update phone numbers, email, and address in `Footer.jsx` and `Contact.jsx`
3. **Principal's message** — Edit the content in `Home.jsx` (Principal's Message section)
4. **School history / milestones** — Update the `milestones` array in `About.jsx`
5. **News items** — Update the `newsItems` array in `Home.jsx`
6. **Gallery categories/images** — Update the `galleryCategories` array in `Gallery.jsx`

### Replacing Images

All images currently use **Unsplash placeholders**. To use your own images:

1. **Option A: Public directory** — Place your images in the `public/` folder (e.g., `public/images/hero.jpg`) and reference them as `/images/hero.jpg`

2. **Option B: Import in components** — Place images in `src/assets/` and import them:

```jsx
import heroImage from '../assets/hero-image.jpg';

// Then use: <img src={heroImage} alt="..." />
```

**Images to replace (Unsplash URLs in components):**

| Section | File | Description |
|---|---|---|
| Hero background | `Home.jsx` | School building/campus photo |
| Principal photo | `Home.jsx` | Principal's portrait |
| News cards (x3) | `Home.jsx` | Event/sports/science photos |
| About header | `About.jsx` | School building |
| History section | `About.jsx` | Historical photo |
| Organization | `About.jsx` | School structure diagram |
| Gallery header | `Gallery.jsx` | Event photo |
| Gallery images (18) | `Gallery.jsx` | Sports, classrooms, events |
| Contact header | `Contact.jsx` | Campus/location photo |
| Map placeholder | `Contact.jsx` | Map/location image |

### Customizing Colors & Theme

The color palette is defined in `src/index.css` using Tailwind CSS v4 theme variables:

```css
@theme {
  --color-primary-50: #eff6ff;   ...  --color-primary-900: #0a1426;    /* Institutional Blues */
  --color-accent-50: #fdf2f8;    ...  --color-accent-900: #47081b;     /* Deep Maroons */
  --color-gold-500: #c9a84c;     /* Gold accent for highlights */
}
```

To customize:
1. Edit the `@theme` block in `src/index.css` with your desired colors
2. The dark mode variant is handled via `@custom-variant dark (&:where(.dark, .dark *));`

### Adding Pages

1. Create a new file in `src/pages/` (e.g., `Staff.jsx`)
2. Add it to the router in `src/App.jsx`:

```jsx
import Staff from './pages/Staff';

// Inside <Routes>:
<Route path="/staff" element={<Staff />} />
```

3. Add the link to `Navbar.jsx`:

```jsx
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/staff', label: 'Staff' },   // New link
  { to: '/contact', label: 'Contact' },
];
```

---

## Architecture & Scaling

### Current Architecture

The application follows a **modular component-based architecture**:

```
┌─────────────────────────────────────────────┐
│                  App.jsx                    │
│  ┌───────────────────────────────────────┐  │
│  │          ThemeProvider                │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │           Router                │  │  │
│  │  │  ┌───────┐   ┌──────────────┐  │  │  │
│  │  │  │ Navbar │   │   <Routes>   │  │  │  │
│  │  │  └───────┘   │  ┌─────────┐  │  │  │  │
│  │  │              │  │ Home    │  │  │  │  │
│  │  │              │  │ About   │  │  │  │  │
│  │  │              │  │ Gallery │  │  │  │  │
│  │  │              │  │ Contact │  │  │  │  │
│  │  │              │  └─────────┘  │  │  │  │
│  │  │  ┌───────┐   └──────────────┘  │  │  │
│  │  │  │ Footer │                    │  │  │
│  │  │  └───────┘                     │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**Key architectural decisions:**
- **ThemeContext** wraps the entire app for global dark/light mode state
- **React Router** handles all navigation with client-side routing
- **Components** are self-contained with their own state and logic
- **Pages** are lazy-loadable for code splitting in the future
- **No prop drilling** — each page fetches/defines its own data

### Scaling to a Full School Management Portal

The architecture is designed to scale into a comprehensive school management system. Here's the recommended expansion path:

#### Phase 1: Authentication & User Roles (Future)

```
src/
├── context/
│   └── AuthContext.jsx          # Authentication state
├── components/
│   ├── ProtectedRoute.jsx       # Route guard component
│   └── LoginForm.jsx            # Login modal/page
```

#### Phase 2: Admin Dashboard (Future)

```
src/
├── pages/admin/
│   ├── Dashboard.jsx            # Analytics overview
│   ├── Students.jsx             # Student management
│   ├── Teachers.jsx             # Teacher management
│   ├── Classes.jsx              # Class/schedule management
│   ├── Attendance.jsx           # Attendance tracking
│   └── Reports.jsx              # Report generation
├── components/
│   ├── DataTable.jsx            # Reusable data grid
│   ├── Modal.jsx                # Reusable modal component
│   ├── Sidebar.jsx              # Admin sidebar navigation
│   └── Charts.jsx               # Analytics charts
```

#### Phase 3: Student Portal (Future)

```
src/
├── pages/student/
│   ├── Profile.jsx              # Student profile
│   ├── Grades.jsx               # View grades/report cards
│   ├── Schedule.jsx             # Timetable viewer
│   └── Assignments.jsx          # Assignment submission
```

#### Phase 4: Integration Layer (Future)

```
src/
├── services/
│   ├── api.js                   # Axios/fetch wrapper
│   ├── authService.js           # Authentication API
│   ├── studentService.js        # Student CRUD API
│   └── teacherService.js        # Teacher CRUD API
├── hooks/
│   ├── useApi.js                # Custom API hook
│   ├── useAuth.js               # Auth helper hook
│   └── useForm.js               # Form management hook
```

#### Backend Recommendations

For the management portal, pair this frontend with:

- **Backend:** Node.js + Express, Python Django REST, or Laravel
- **Database:** PostgreSQL or MySQL
- **Authentication:** JWT-based with refresh tokens
- **API Design:** RESTful or GraphQL (Apollo)
- **File Storage:** AWS S3 or Cloudinary for media

---

## Dark & Light Mode

The application features a fully functional dark mode with:

- **System preference detection** — Automatically matches `prefers-color-scheme`
- **Local storage persistence** — Remembers the user's choice across sessions
- **Global toggle** — Accessible from both desktop and mobile navigation
- **Tailwind `dark:` variant** — All styles are defined using Tailwind's dark variant

Toggle state is managed by `ThemeContext` in `src/context/ThemeContext.jsx`.

---

## Deployment

### Static Hosting (Recommended for v1)

Deploy the `dist/` folder to any static host:

- **Netlify** — `npm run build` then drag `dist/` to Netlify
- **Vercel** — `npm run build` then `vercel --prod`
- **GitHub Pages** — Use `gh-pages` package or GitHub Actions
- **Firebase Hosting** — `firebase deploy`

### Server Configuration

For **SPA routing**, configure your server to redirect all requests to `index.html`:

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for <strong>Bamunugama Navodya Vidyalaya - Matara</strong><br />
  <em>නැණ ගුණ වඩමු — Nurturing Wisdom and Virtue</em>
</p>