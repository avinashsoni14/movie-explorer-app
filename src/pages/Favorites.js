import MovieCard from '../components/MovieCard';
import { useFavorites } from '../hooks/useFavorites';

function Favorites() {
    const { favorites, removeFavorite, isFavorite } = useFavorites();

    const handleToggleFavorite = (movie) => {
        removeFavorite(movie.imdbID);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Your Favorite Movies</h1>

            {favorites.length === 0 ? (
                <div className="text-center text-gray-600 py-8">
                    You haven't added any movies to your favorites yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={isFavorite}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites; 
