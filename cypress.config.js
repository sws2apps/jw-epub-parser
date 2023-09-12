import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'dvtrvb',
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: 'http://localhost:5000',
		video: false,
	},
});
