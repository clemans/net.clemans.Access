import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transformIgnorePatterns: ['^.+\\.js$'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;
