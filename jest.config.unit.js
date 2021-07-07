module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["<rootDir>/(src|db-config)/**/?(*.)test.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  collectCoverage: true,
  coverageDirectory: "coverage"
};
