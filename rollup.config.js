import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'es',
		},
		{
			file: 'dist/index.cjs',
			format: 'cjs',
			exports: 'named',
		},
	],
	plugins: [nodeResolve(), commonjs()],
	external: ['jszip', 'jsdom'],
};

export default config;
