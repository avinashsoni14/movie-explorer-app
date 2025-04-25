function Loader({ size = 'medium' }) {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div
                className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Loader; 
