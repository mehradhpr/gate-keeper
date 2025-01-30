export default {
  preset: "ts-jest/presets/default-esm", // Use ESM preset
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ESM
  globals: {
    "ts-jest": {
      useESM: true, // Enable ESM in ts-jest
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Map .js imports to .ts files
  },
};
