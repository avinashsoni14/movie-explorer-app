module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        node: 'current'
                    }
                }],
                ['@babel/preset-react', {
                    runtime: 'automatic'
                }]
            ]
        }]
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@testing-library|@babel|@jest)/)'
    ],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/index.js',
        '!src/reportWebVitals.js'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    testEnvironmentOptions: {
        url: 'http://localhost'
    }
}; 
