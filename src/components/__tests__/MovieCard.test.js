import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../MovieCard';

const mockMovie = {
    imdbID: 'tt1234567',
    Title: 'Test Movie',
    Year: '2024',
    Poster: 'https://example.com/poster.jpg'
};

const renderMovieCard = (props = {}) => {
    const defaultProps = {
        movie: mockMovie,
        isFavorite: jest.fn(id => id === mockMovie.imdbID && props.isFavorited),
        onToggleFavorite: jest.fn(),
        ...props
    };

    return render(
        <BrowserRouter>
            <MovieCard {...defaultProps} />
        </BrowserRouter>
    );
};

describe('MovieCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders movie title correctly', () => {
        renderMovieCard();
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('renders movie year correctly', () => {
        renderMovieCard();
        expect(screen.getByText('2024')).toBeInTheDocument();
    });

    it('displays correct button text based on favorite status', () => {
        // Test not favorited state
        const { rerender } = renderMovieCard({ isFavorited: false });
        expect(screen.getByRole('button')).toHaveTextContent('Add to Favorites');

        // Test favorited state
        rerender(
            <BrowserRouter>
                <MovieCard
                    movie={mockMovie}
                    isFavorite={jest.fn(id => id === mockMovie.imdbID)}
                    onToggleFavorite={jest.fn()}
                />
            </BrowserRouter>
        );
        expect(screen.getByRole('button')).toHaveTextContent('Remove from Favorites');
    });

    it('calls onToggleFavorite with correct movie when button is clicked', () => {
        const onToggleFavorite = jest.fn();
        renderMovieCard({ onToggleFavorite });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onToggleFavorite).toHaveBeenCalledTimes(1);
        expect(onToggleFavorite).toHaveBeenCalledWith(mockMovie);
    });

    it('handles missing poster gracefully', () => {
        const movieWithoutPoster = {
            ...mockMovie,
            Poster: 'N/A'
        };
        renderMovieCard({ movie: movieWithoutPoster });
        const img = screen.getByRole('img');
        expect(img.src).toContain('data:image/svg+xml');
    });

    it('shows loading state before image loads', () => {
        renderMovieCard();
        const img = screen.getByRole('img');
        expect(img).toHaveClass('opacity-0');

        // Simulate image load
        fireEvent.load(img);
        expect(img).toHaveClass('opacity-100');
    });

    it('renders movie links with correct URL', () => {
        renderMovieCard();
        const links = screen.getAllByRole('link');
        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/movie/tt1234567');
        });
    });

    it('handles image error gracefully', () => {
        renderMovieCard();
        const img = screen.getByRole('img');

        // Simulate image error
        fireEvent.error(img);
        expect(img.src).toContain('data:image/svg+xml');
    });
}); 
