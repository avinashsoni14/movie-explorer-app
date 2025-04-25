import { useState, useCallback, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../hooks/useFavorites';
import { searchMovies } from '../services/movieApi';
import { useDebounce } from '../hooks/useDebounce';
import Loader from '../components/Loader';

const MIN_SEARCH_LENGTH = 3;

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const handleSearch = useCallback(async (term) => {
        if (!term.trim()) {
            setMovies([]);
            return;
        }

        if (term.trim().length < MIN_SEARCH_LENGTH) {
            setError(`Please enter at least ${MIN_SEARCH_LENGTH} characters to search`);
            setMovies([]);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await searchMovies(term);
            if (data.Response === 'True') {
                setMovies(data.Search);
                setError('');
            } else {
                setError(data.Error || 'No movies found');
                setMovies([]);
            }
        } catch (err) {
            setError('Failed to fetch movies. Please try again.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, handleSearch]);

    const handleToggleFavorite = useCallback((movie) => {
        if (isFavorite(movie.imdbID)) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    }, [addFavorite, removeFavorite, isFavorite]);

    const handleInputChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        if (!e.target.value.trim()) {
            setError('');
        } else if (e.target.value.trim().length < MIN_SEARCH_LENGTH) {
            setError(`Please enter at least ${MIN_SEARCH_LENGTH} characters to search`);
        }
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        setMovies([]);
        setError('');
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder={`Enter at least ${MIN_SEARCH_LENGTH} characters to search...`}
                    className={`w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${searchTerm.length > 0 && searchTerm.length < MIN_SEARCH_LENGTH
                        ? 'border-yellow-400'
                        : 'border-gray-300'
                        }`}
                    aria-label="Search movies"
                />
                {searchTerm && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Clear search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            {loading ? (
                <Loader size="large" />
            ) : error ? (
                <div className={`text-center py-8 ${searchTerm && searchTerm.length < MIN_SEARCH_LENGTH
                    ? 'text-yellow-600'
                    : 'text-red-500'
                    }`} role="alert">
                    {error}
                </div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={isFavorite}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            ) : searchTerm ? (
                <div className="text-center text-gray-600 py-8">No movies found</div>
            ) : (
                <div className="text-center text-gray-600 py-8">
                    Start typing to search for movies
                </div>
            )}
        </div>
    );
}

export default Home; 
