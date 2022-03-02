import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

const config = {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'es',
		},
		{
			file: 'dist/index.cjs.js',
			format: 'cjs',
			exports: 'default',
		},
	],
	plugins: [
		json(),
		babel({ babelHelpers: 'runtime' }),
		[
			'@babel/plugin-transform-runtime',
			{
				regenerator: true,
			},
		],
	],
	external: [
		'@gxl/epub-parser',
		'jsdom',
		'@babel/runtime/helpers/asyncToGenerator',
		'@babel/runtime/regenerator',
	],
};

export default config;
