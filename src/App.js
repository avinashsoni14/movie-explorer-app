import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

function App() {
    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="pt-24 py-8">
                    <Suspense fallback={
                        <div className="container mx-auto px-4">
                            <Loader size="large" />
                        </div>
                    }>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/movie/:id" element={<MovieDetails />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </ErrorBoundary>
    );
}

export default App; 
