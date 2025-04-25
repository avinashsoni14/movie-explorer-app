/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1a365d',
                secondary: '#2d3748',
            },
        },
    },
    plugins: [],
}; 
