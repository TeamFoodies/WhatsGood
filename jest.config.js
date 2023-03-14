module.exports = {
    // other configuration options...
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    collectCoverage: true,
    coverageReporters: ['text', 'lcov'],
    collectCoverageFrom: [
      '**/*.{js,jsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
      '!**/coverage/**',
      '!**/jest.config.js',
      '!**/index.js',
      '!**/App.js',
    ],
  };
  
  