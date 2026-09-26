module.exports = {
  testEnvironment: 'node',

  // Sets env vars before the framework installs (JWT secrets, etc.)
  setupFiles: ['<rootDir>/tests/jest.env.js'],

  // Runs beforeAll/afterEach/afterAll hooks shared across every test file
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Only pick up *.test.js files — excludes setup.js, jest.env.js, fixtures, etc.
  testMatch: ['**/tests/**/*.test.js'],

  // Coverage source
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js', // server.js only wires HTTP + listen, not unit-testable
  ],

  coverageDirectory: 'coverage',

  // Thresholds are unlocked from Step 16 onward (commented out until then)
  // coverageThreshold: {
  //   global:              { lines: 85, branches: 75 },
  //   './src/services/':   { lines: 100, branches: 100 },
  //   './src/middleware/': { lines: 90 },
  // },

  // Give mongodb-memory-server enough time to start
  testTimeout: 30000,
};
