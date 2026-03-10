# TheBlog — Modern Full-Stack Blog Platform

A premium, full-stack blogging platform built with a high-performance Django backend and a stunning, responsive React frontend. Designed for writers who value aesthetics and readers who crave a seamless experience.

![Home Page Screenshot](frontend/src/assets/preview.png) *(Note: Add your own preview image here)*

## ✨ Features

- **🚀 Performance-Driven**: Built with Vite for lightning-fast frontend development and optimized Django for a robust backend.
- **🔒 Secure Authentication**: Full user cycle (Register/Login) powered by JWT (JSON Web Tokens).
- **📝 Content Management**: A comprehensive dashboard for authors to create, manage, and track their stories.
- **💬 Social Engagement**:
  - **Threaded Comments**: Deeply nested, organized discussions.
  - **Like System**: Show appreciation for great content.
  - **Bookmarking**: Save your favorite reads for later in your personal library.
  - **Follow System**: Stay updated with your favorite authors.
- **🔍 Advanced Search & Filter**: Easily find content by keywords or browse through intuitive categories.
- **🎨 Premium UI/UX**:
  - **Fully Responsive**: Flawless experience across Mobile, Tablet, and Desktop.
  - **Animations**: Fluid transitions powered by Framer Motion.
  - **Modern Aesthetics**: Sleek glassmorphism and Tailwind CSS v4 styling.
  - **Dark Mode**: Beautifully integrated light and dark themes.
- **📊 Extended Profiles**: Authors can showcase their bio, avatar, website, and social links.
- **📅 Post Scheduling & Tracking**: Support for scheduled publishing and analytical view tracking.
- **📈 SEO Ready**: Dynamic titles and meta descriptions using React Helmet Async.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State/Routing**: React Router DOM, Axios
- **Forms**: React Hook Form + Zod Validation
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Feedback**: React Hot Toast

### Backend
- **Framework**: [Django 6](https://www.djangoproject.com/)
- **API**: Django REST Framework (DRF)
- **Auth**: SimpleJWT
- **Documentation**: Swagger/OpenAPI (drf-yasg)
- **Database**: SQLite3 (Development)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd blog_backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers djangorestframework-simplejwt django-filter drf-yasg
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/frontend`: React application using Vite.
- `/blog_backend`: Django project containing the core API and logic.
  - `/apps`: Independent modules for Users, Blog, Engagement, and Notifications.
- `/media`: User-uploaded content (avatars, featured images).

## 📄 License
This project is open-source and available under the MIT License.
