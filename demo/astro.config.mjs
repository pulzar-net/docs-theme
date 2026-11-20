// The theme's own demo and test site: every component, both themes. Built in
// CI, and what the screenshots in the README are taken from.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pulzarPlugins } from '../index.mjs';

export default defineConfig({
	site: 'https://pulzar-net.github.io',
	base: '/docs-theme',
	build: { format: 'file' },
	redirects: { '/guides/index': '/docs-theme/guides.html' },
	integrations: [
		starlight({
			title: 'docs-theme',
			description: 'The shared Starlight theme for Pulzar open-source projects.',
			plugins: pulzarPlugins({ project: 'docs-theme', siteDir: 'demo' }),
			sidebar: [
				{ label: 'Start here', items: ['guides', 'guides/getting-started'] },
				{ label: 'Components', items: ['components'] },
			],
		}),
	],
});
