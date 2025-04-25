import { useState, useCallback, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { searchMovies } from '../services/movieApi';

const MIN_SEARCH_LENGTH = 3;

export function useSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const abortControllerRef = useRef(null);

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

        // Cancel previous request if it exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError('');

        try {
            const data = await searchMovies(term, abortControllerRef.current.signal);
            if (data.Response === 'True') {
                setMovies(data.Search);
                setError('');
            } else {
                setError(data.Error || 'No movies found');
                setMovies([]);
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                // Ignore abort errors
                return;
            }
            setError('Failed to fetch movies. Please try again.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInputChange = useCallback((value) => {
        setSearchTerm(value);
        if (!value.trim()) {
            setError('');
        } else if (value.trim().length < MIN_SEARCH_LENGTH) {
            setError(`Please enter at least ${MIN_SEARCH_LENGTH} characters to search`);
        }
    }, []);

    const clearSearch = useCallback(() => {
        setSearchTerm('');
        setMovies([]);
        setError('');
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    return {
        searchTerm,
        movies,
        loading,
        error,
        handleSearch,
        handleInputChange,
        clearSearch,
        debouncedSearchTerm,
    };
} 
