import { defineConfig } from 'cypress';
import webpackConfig from './webpack.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    supportFile: 'cypress/support/component.ts', // Ensure this path is correct
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
});