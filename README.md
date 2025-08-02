# 🎬 MoviKit - Your Personal Movie Discovery Platform

A modern, feature-rich movie discovery application built with React and powered by the TMDB API. Discover trending movies, search through thousands of films, and build your personal favorites collection.


---

##  🚀 [Live Demo] https://movikit.vercel.app/


## ✨ Features

### 🔍 Movie Discovery & Browsing
- Real-time search with debouncing
- Genre filtering and curated trending sections
- Detailed movie cards with trailers, ratings, and metadata

### ❤️ Favorites System
- Save movies to a personal favorites list
- Persistent storage using localStorage
- Navigate to a dedicated Favorites page

### 💫 User Experience
- Responsive design (mobile-first)
- Smooth transitions, hover animations, and loading spinners
- Modal popups for rich movie details and trailers

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM
- **State & Context**: React Hooks, Context API
- **Backend-as-a-Service**: Appwrite (for trending data)
- **External API**: TMDB for movie metadata
- **Tools**: ESLint, Git, Local Storage for persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd movie-app
npm install


3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
movie-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── MovieCard.jsx   # Movie display card
│   │   ├── MovieModal.jsx  # Detailed movie modal
│   │   ├── Search.jsx      # Search functionality
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Footer component
│   │   └── Spinner.jsx     # Loading spinner
│   ├── contexts/           # React context providers
│   │   ├── MovieContext.jsx    # Movie state management
│   │   └── ModalContext.jsx    # Modal state management
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Main landing page
│   │   └── Favorites.jsx   # Favorites page
│   ├── appwrite.js         # Appwrite backend integration
│   └── main.jsx           # Application entry point
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🔧 Key Features Implementation

### Movie Context & State Management
- **Favorites System**: Persistent storage using localStorage
- **Loading States**: Centralized loading state management
- **Error Handling**: Comprehensive error handling for API calls

### Search & Discovery
- **Debounced Search**: debounce input for optimal performance
- **API Integration**: TMDB API for movie data and metadata

### Trending System
- **Appwrite Integration**: Backend service for tracking movie popularity
- **Click Tracking**: Automatic tracking of movie interactions
- **Trending Algorithm**: Movies ranked by user interaction count (click on movie card)

### Modal System
- **Rich Movie Details**: Comprehensive movie information display
- **Responsive Design**: Modal adapts to different screen sizes

## 🎯 API Integration

### TMDB API
- **Movie Search**: Real-time movie search functionality
- **Movie Details**: Comprehensive movie metadata
- **Genre Data**: Movie categorization and filtering
- **Poster Images**: High-quality movie posters

### Appwrite Backend
- **Trending Tracking**: User interaction analytics
- **Data Persistence**: Cloud-based data storage
- **Real-time Updates**: Dynamic trending calculations

## 🎨 Customization

### Styling
- Fully customized Tailwind-based dark theme with modular React components.

### Components
All components are modular and reusable:
- `MovieModal`: Rich movie details with trailer integration
- `Search`: Debounced search with real-time results
- `Header/Footer`: Navigation and branding

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | TMDB API authentication key | Yes |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project identifier | Yes |
| `VITE_APPWRITE_DATABASE_ID` | Appwrite database identifier | Yes |    
| `VITE_APPWRITE_COLLECTION_ID` | Appwrite collection identifier | Yes |



## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing comprehensive movie data
- [Appwrite](https://appwrite.io/) for backend-as-a-service infrastructure

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

*Discover your next favorite movie with MoviKit! 🎬*
