import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'movieExplorer_favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const addFavorite = useCallback((movie) => {
        setFavorites((prev) => {
            if (!prev.some((m) => m.imdbID === movie.imdbID)) {
                return [...prev, movie];
            }
            return prev;
        });
    }, []);

    const removeFavorite = useCallback((movieId) => {
        setFavorites((prev) => {
            const updated = prev.filter((movie) => movie.imdbID !== movieId);
            return updated;
        });
    }, []);

    const isFavorite = useCallback((movieId) => {
        return favorites.some((movie) => movie.imdbID === movieId);
    }, [favorites]);

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
} 
