// vite.config.js
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [glsl(), svgLoader()],
});
