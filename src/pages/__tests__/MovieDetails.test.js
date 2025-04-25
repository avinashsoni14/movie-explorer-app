import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MovieDetails from '../../pages/MovieDetails';
import * as movieApi from '../../services/movieApi';
import * as favoritesHook from '../../hooks/useFavorites';

// Mock the modules
jest.mock('../../services/movieApi');
jest.mock('../../hooks/useFavorites');

describe('MovieDetails Component', () => {
    const mockMovie = {
        imdbID: 'tt1234567',
        Title: 'Test Movie',
        Year: '2024',
        Rated: 'PG-13',
        Runtime: '120 min',
        Genre: 'Action, Drama',
        Director: 'Test Director',
        Actors: 'Actor 1, Actor 2',
        Plot: 'Test movie plot',
        Poster: 'https://test-poster.jpg',
        imdbRating: '8.5',
        Response: 'True'
    };

    const mockFavorites = {
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        isFavorite: jest.fn(() => false)
    };

    const renderComponent = (movieId = 'tt1234567') => {
        return render(
            <MemoryRouter initialEntries={[`/movie/${movieId}`]}>
                <Routes>
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
        favoritesHook.useFavorites.mockReturnValue(mockFavorites);
    });

    it('shows loading state initially', () => {
        movieApi.getMovieById.mockImplementation(() => new Promise(() => { }));
        renderComponent();
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('displays error message when API call fails', async () => {
        movieApi.getMovieById.mockRejectedValue(new Error('API Error'));
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(/failed to fetch movie details/i)).toBeInTheDocument();
        });
    });

    it('displays movie not found message when API returns no movie', async () => {
        movieApi.getMovieById.mockResolvedValue({ Response: 'False', Error: 'Movie not found!' });
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('Movie not found!')).toBeInTheDocument();
        });
    });

    it('displays movie details successfully', async () => {
        movieApi.getMovieById.mockResolvedValue(mockMovie);
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
            expect(screen.getByText(mockMovie.Year)).toBeInTheDocument();
            expect(screen.getByText(mockMovie.Director)).toBeInTheDocument();
            expect(screen.getByText(mockMovie.Plot)).toBeInTheDocument();
            expect(screen.getByText(mockMovie.Runtime)).toBeInTheDocument();
            expect(screen.getByText(mockMovie.Genre)).toBeInTheDocument();
            expect(screen.getByText(mockMovie.Actors)).toBeInTheDocument();
            expect(screen.getByText(mockMovie.imdbRating)).toBeInTheDocument();
        });
    });

    it('handles favorite functionality correctly', async () => {
        movieApi.getMovieById.mockResolvedValue(mockMovie);
        const { rerender } = renderComponent();

        await waitFor(() => {
            expect(screen.getByRole('button')).toHaveTextContent(/add to favorites/i);
        });

        // Test adding to favorites
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(mockFavorites.addFavorite).toHaveBeenCalledWith(mockMovie);

        // Test removing from favorites
        mockFavorites.isFavorite.mockReturnValue(true);
        rerender(
            <MemoryRouter initialEntries={[`/movie/${mockMovie.imdbID}`]}>
                <Routes>
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByRole('button')).toHaveTextContent(/remove from favorites/i);
        });

        await userEvent.click(screen.getByRole('button'));
        expect(mockFavorites.removeFavorite).toHaveBeenCalledWith(mockMovie.imdbID);
    });

    it('handles API error message correctly', async () => {
        const errorMessage = 'Invalid API key';
        movieApi.getMovieById.mockResolvedValue({ Response: 'False', Error: errorMessage });
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
}); 
