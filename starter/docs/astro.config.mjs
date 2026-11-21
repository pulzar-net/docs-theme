// The {{project}} docs: Starlight with the shared Pulzar theme
// (github.com/pulzar-net/docs-theme). Pages are in src/content/docs; the
// sidebar below orders them. Built and published by .github/workflows/docs.yml.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pulzarPlugins } from '@pulzr/docs-theme';

export default defineConfig({
	site: 'https://oss.pulzr.net',
	base: '/{{project}}',
	// Served at https://oss.pulzr.net/{{project}}/, the organization's Pages
	// domain. Pages are page.html, as GitHub Pages serves them.
	build: { format: 'file' },
	integrations: [
		starlight({
			title: '{{project}}',
			description: '{{description}}',
			plugins: pulzarPlugins({ project: '{{project}}' }),
			sidebar: [
				{ label: 'User guide', items: ['getting-started'] },
			],
		}),
	],
});
