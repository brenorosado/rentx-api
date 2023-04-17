import type { Config } from "jest";
import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [
    "<rootDir>"
  ],
  setupFiles: ["<rootDir>/src/test/setEnvVars.ts"]
};

export default config;
