// The {{project}} docs: Starlight with the shared Pulzar theme
// (github.com/pulzar-net/docs-theme). Pages are in src/content/docs; the
// sidebar below orders them. Built and published by .github/workflows/docs.yml.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pulzarPlugins } from '@pulzar-net/docs-theme';

export default defineConfig({
	site: 'https://pulzar-net.github.io',
	base: '/{{project}}',
	// Pages are page.html, as GitHub Pages serves them.
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
