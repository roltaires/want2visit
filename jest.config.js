/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ["<rootDir>/resources/js"],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/resources/js/$1"
  }
};