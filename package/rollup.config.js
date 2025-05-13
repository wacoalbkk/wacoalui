import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/wacoalui.js',
    format: 'esm', // รองรับ import/export
  },
  plugins: [nodeResolve()],
};