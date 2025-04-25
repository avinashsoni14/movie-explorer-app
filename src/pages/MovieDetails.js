import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/movieApi';
import { useFavorites } from '../hooks/useFavorites';
import Loader from '../components/Loader';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieById(id);
                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error || 'Movie not found');
                }
            } catch (err) {
                setError('Failed to fetch movie details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleToggleFavorite = () => {
        if (!movie) return;

        if (isFavorite(movie.imdbID)) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4">
                <Loader size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4">
                <div className="text-center text-red-500 py-8">{error}</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="container mx-auto px-4">
                <div className="text-center text-gray-600 py-8">Movie not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <div className="relative" style={{ paddingTop: '150%' }}>
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                                alt={`${movie.Title} poster`}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
                            <button
                                onClick={handleToggleFavorite}
                                className={`px-4 py-2 rounded-md transition-colors ${isFavorite(movie.imdbID)
                                    ? 'bg-primary text-white hover:bg-opacity-90'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {isFavorite(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>
                        <div className="grid gap-4">
                            <p><span className="font-semibold">Year:</span> {movie.Year}</p>
                            <p><span className="font-semibold">Rated:</span> {movie.Rated}</p>
                            <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
                            <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
                            <p><span className="font-semibold">Director:</span> {movie.Director}</p>
                            <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
                            <p><span className="font-semibold">Plot:</span> {movie.Plot}</p>
                            <p><span className="font-semibold">IMDb Rating:</span> {movie.imdbRating}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails; 
