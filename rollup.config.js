import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = [
  {
    input: 'src/browser/index.ts',
    output: [
      {
        sourcemap: true,
        file: 'dist/index.js',
        format: 'es',
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // Let tsup handle type declarations
      }),
      nodeResolve(),
      commonjs(),
      json(),
      terser(),
    ],
    external: ['jszip', 'path-browserify'],
  },
  {
    input: 'src/node/index.ts',
    output: [
      {
        sourcemap: false,
        file: 'dist/node/index.cjs',
        format: 'cjs',
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // Let tsup handle type declarations
      }),
      commonjs(),
      json(),
      terser(),
    ],
    external: ['jszip', 'node-html-parser', 'path', 'fs/promises'],
  },
  {
    input: 'src/node/index.ts',
    output: [
      {
        sourcemap: true,
        file: 'dist/node/index.js',
        format: 'es',
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // Let tsup handle type declarations
      }),
      commonjs(),
      json(),
      terser(),
    ],
    external: ['jszip', 'node-html-parser', 'path', 'fs/promises'],
  },
];

export default config;
