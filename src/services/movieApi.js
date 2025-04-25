import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
    console.error('OMDB API key is not set. Please set REACT_APP_OMDB_API_KEY in your .env file');
}

async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: options.signal || controller.signal,
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

export async function searchMovies(query, signal) {
    if (!API_KEY) {
        throw new Error('API key is not configured');
    }

    try {
        const response = await fetchWithTimeout(
            `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
            { signal },
            5000
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw error;
        }
        throw new Error('Failed to fetch movies. Please try again.');
    }
}

export async function getMovieById(id, signal) {
    if (!API_KEY) {
        throw new Error('API key is not configured');
    }

    try {
        const response = await fetchWithTimeout(
            `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}`,
            { signal },
            5000
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw error;
        }
        throw new Error('Failed to fetch movie details. Please try again.');
    }
} 
