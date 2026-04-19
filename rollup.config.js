import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/project-aura-card.ts',
  output: {
    file: 'dist/project-aura-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    resolve({ browser: true }),
    typescript({ tsconfig: './tsconfig.json' }),
    terser({
      format: { comments: false },
      compress: { drop_console: false },
    }),
  ],
};
