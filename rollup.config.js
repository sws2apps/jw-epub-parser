import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = [
	{
		input: 'src/browser.js',
		output: [
			{
				file: 'dist/index.js',
				format: 'es',
			},
		],
		plugins: [nodeResolve(), commonjs()],
		external: ['jszip', 'path-browserify'],
	},
	{
		input: 'src/node.js',
		output: [
			{
				dir: 'dist/index.node.js',
				format: 'es',
			},
		],
		plugins: [nodeResolve(), commonjs()],
		external: ['jszip', 'global-jsdom/register'],
	},
	{
		input: 'src/node.js',
		output: [
			{
				dir: 'dist/index.node.cjs',
				format: 'cjs',
				exports: 'named',
			},
		],
		plugins: [nodeResolve(), commonjs()],
		external: ['jszip', 'global-jsdom/register'],
	},
];

export default config;
