import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  clearMocks: true,
  coverageDirectory: "coverage",
  verbose: true,
  testEnvironment: "node",
  testRegex: ["tests/unit/*.*.ts", "tests/integration/*.*.ts"],
  testPathIgnorePatterns: ["tests/unit/stubs/"],
  maxConcurrency: 10,
  collectCoverageFrom: ["src/**/*.ts"],
  roots: ["<rootDir>"],
  moduleDirectories: ["node_modules", "./"],
  preset: "ts-jest",
};

export default config;
