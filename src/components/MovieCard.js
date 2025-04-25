import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const POSTER_ASPECT_RATIO = 1.5; // 3:2 aspect ratio
const DEFAULT_POSTER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"%3E%3Crect width="300" height="450" fill="%23f3f4f6"/%3E%3Ctext x="150" y="225" font-family="Arial" font-size="18" fill="%239ca3af" text-anchor="middle"%3ENo Poster Available%3C/text%3E%3C/svg%3E';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const isMovieFavorite = isFavorite(movie.imdbID);

    const handleFavoriteClick = useCallback((e) => {
        e.preventDefault();
        onToggleFavorite(movie);
    }, [movie, onToggleFavorite]);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
        setImageError(true);
        setImageLoaded(true);
    }, []);

    const posterUrl = movie.Poster !== 'N/A' && !imageError ? movie.Poster : DEFAULT_POSTER;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative" style={{ paddingTop: `${100 * POSTER_ASPECT_RATIO}%` }}>
                <Link
                    to={`/movie/${movie.imdbID}`}
                    className="absolute inset-0 w-full h-full block"
                >
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}
                    <img
                        src={posterUrl}
                        alt={`${movie.Title} poster`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                </Link>
            </div>
            <div className="p-4">
                <Link
                    to={`/movie/${movie.imdbID}`}
                    className="block h-12" // Fixed height for title
                >
                    <h2 className="text-xl font-semibold hover:text-primary line-clamp-2">
                        {movie.Title}
                    </h2>
                </Link>
                <p className="text-gray-600 mb-4 h-6">{movie.Year}</p>
                <button
                    onClick={handleFavoriteClick}
                    className={`w-full py-2 px-4 rounded-md transition-colors ${isMovieFavorite
                        ? 'bg-primary text-white hover:bg-opacity-90'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.movie.imdbID === nextProps.movie.imdbID &&
        prevProps.isFavorite(prevProps.movie.imdbID) === nextProps.isFavorite(nextProps.movie.imdbID)
    );
}

export default memo(MovieCard, arePropsEqual); 
