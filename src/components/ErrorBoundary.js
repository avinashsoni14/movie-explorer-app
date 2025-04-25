import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
                    <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 
