/* istanbul ignore file */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  verbose: true,
  automock: false,
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.*.ts'],
  modulePathIgnorePatterns: ['<rootDir>/jest.config.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/app/routes/',
    '<rootDir>/app/schemas/',
    '<rootDir>/__e2e__/',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
