module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: 'config/tsconfig.jest.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    moduleNameMapper: {
        '^/__mocks__/$': '<rootDir>/backend/__mocks__/firebaseConfig.ts',
    },
    testMatch: ['**/backend/tests/**/*.test.ts'],
    // Optional: add verbose to get more detailed output
    verbose: true,
};
