import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const config = [
	{
		input: 'src/browser/index.js',
		output: [
			{
				sourcemap: true,
				file: 'dist/index.js',
				format: 'es',
			},
		],
		plugins: [nodeResolve(), commonjs(), json(), terser()],
		external: ['jszip', 'path-browserify'],
	},
	{
		input: 'src/node/index.js',
		output: [
			{
				sourcemap: false,
				file: 'dist/node/index.cjs',
				format: 'cjs',
			},
		],
		plugins: [commonjs(), json(), terser()],
		external: ['jszip', 'node-html-parser', 'path', 'fs/promises'],
	},
	{
		input: 'src/node/index.js',
		output: [
			{
				sourcemap: true,
				file: 'dist/node/index.js',
				format: 'es',
			},
		],
		plugins: [commonjs(), json(), terser()],
		external: ['jszip', 'node-html-parser', 'path', 'fs/promises'],
	},
];

export default config;
