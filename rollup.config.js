import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const extensions = ['.js']
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'cjs'
    }
  ],
  plugins: [
    resolve({
      mainFields: ['main'],
      extensions
    }),
    commonjs()
  ],
  external: ['rewire']
}
