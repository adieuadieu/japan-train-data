import json from 'rollup-plugin-json'

export default {
  entry: 'src/index.js',
  plugins: [json()],
  targets: [
    { dest: 'dist/bundle.cjs.js', format: 'cjs' },
    { dest: 'dist/bundle.es.js', format: 'es' },
  ],
}
