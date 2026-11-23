// The theme's own demo and test site: every component, both themes. Built in
// CI, and what the screenshots in the README are taken from.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pulzarPlugins } from '../index.mjs';

export default defineConfig({
	site: 'https://oss.pulzr.net',
	base: '/docs-theme',
	build: { format: 'file' },
	redirects: { '/guides/index': '/docs-theme/guides.html' },
	integrations: [
		starlight({
			title: 'docs-theme',
			description: 'The shared Starlight theme for Pulzr open-source projects.',
			plugins: pulzarPlugins({ project: 'docs-theme', siteDir: 'demo', linkExclude: ['/docs-theme/asyncapi-sample.json'] }),
			sidebar: [
				{ label: 'Start here', items: ['guides', 'guides/getting-started'] },
				{ label: 'Components', items: ['components', 'mqtt-reference'] },
			],
		}),
	],
});
