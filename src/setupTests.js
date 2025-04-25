import '@testing-library/jest-dom';
import React from 'react';

// Mock IntersectionObserver
class MockIntersectionObserver {
    constructor() {
        this.observe = jest.fn();
        this.unobserve = jest.fn();
        this.disconnect = jest.fn();
    }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock environment variables
process.env.REACT_APP_OMDB_API_KEY = 'test_api_key'; 
