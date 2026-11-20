/**
 * @pulzar-net/docs-theme: one Starlight look for every Pulzar open-source
 * project. Add it to a Starlight site's plugins:
 *
 *   import pulzarDocs from '@pulzar-net/docs-theme';
 *   starlight({ title: 'zigbee-bridge', plugins: [pulzarDocs({ project: 'zigbee-bridge' })] })
 *
 * It sets the brand (mark, colors and type from the Pulzr console's design
 * tokens, light and dark), the shared chrome (project switcher, footer, edit
 * links, GitHub link, favicon), and turns on internal link validation.
 * Components for pages are in '@pulzar-net/docs-theme/components'.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import starlightLinksValidator from 'starlight-links-validator';
import { projects } from './projects.mjs';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

/**
 * @typedef {object} PulzarDocsOptions
 * @property {string} project The project's id, as in projects.mjs (also its GitHub repository name).
 * @property {string} [repo] The repository URL; defaults to https://github.com/pulzar-net/<project>.
 * @property {string} [license] The license named in the footer; defaults to MIT.
 * @property {string} [editBranch] The branch edit links point at; defaults to main.
 * @property {string} [docsPath] The docs content directory in the repository; defaults to docs/src/content/docs.
 * @property {boolean} [validateLinks] Fail the build on broken internal links; defaults to true.
 * @property {string[]} [linkExclude] Link patterns the validator skips (for pages generated outside Starlight, such as API docs).
 */

/** @param {PulzarDocsOptions} options */
export default function pulzarDocs(options) {
	const {
		project,
		repo = `https://github.com/pulzar-net/${project}`,
		license = 'MIT',
		editBranch = 'main',
		docsPath = 'docs/src/content/docs',
		validateLinks = true,
		linkExclude = [],
	} = options;
	if (!project) throw new Error('@pulzar-net/docs-theme: `project` is required');

	const site = { project, repo, license, projects };
	const icon = readFileSync(here('./assets/icon.svg'), 'utf8');

	return {
		name: '@pulzar-net/docs-theme',
		hooks: {
			'config:setup'({ config, updateConfig, addIntegration, addRouteMiddleware }) {
				updateConfig({
					logo: config.logo ?? {
						light: here('./assets/mark-light.svg'),
						dark: here('./assets/mark-dark.svg'),
						alt: 'Pulzar',
					},
					customCss: [
						'@fontsource-variable/inter',
						'@fontsource/outfit/500.css',
						'@fontsource/outfit/600.css',
						here('./styles/theme.css'),
						...(config.customCss ?? []),
					],
					components: {
						SiteTitle: here('./components/overrides/SiteTitle.astro'),
						Footer: here('./components/overrides/Footer.astro'),
						...config.components,
					},
					social: config.social ?? [{ icon: 'github', label: 'GitHub', href: repo }],
					editLink: config.editLink?.baseUrl
						? config.editLink
						: { baseUrl: `${repo}/edit/${editBranch}/${docsPath}/` },
					head: [
						...(config.head ?? []),
						{
							tag: 'link',
							attrs: {
								rel: 'icon',
								type: 'image/svg+xml',
								href: `data:image/svg+xml,${encodeURIComponent(icon)}`,
							},
						},
						{ tag: 'meta', attrs: { name: 'theme-color', content: '#0c111d', media: '(prefers-color-scheme: dark)' } },
						{ tag: 'meta', attrs: { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' } },
					],
					credits: false,
					lastUpdated: config.lastUpdated ?? true,
				});
				addIntegration({
					name: '@pulzar-net/docs-theme/site',
					hooks: {
						'astro:config:setup'({ updateConfig: updateAstroConfig }) {
							updateAstroConfig({
								vite: {
									plugins: [
										{
											name: 'pulzar-docs-site',
											resolveId: (id) => (id === 'virtual:pulzar-docs/site' ? '\0virtual:pulzar-docs/site' : undefined),
											load: (id) =>
												id === '\0virtual:pulzar-docs/site'
													? `export default ${JSON.stringify(site)};`
													: undefined,
										},
									],
								},
							});
						},
					},
				});
			},
		},
	};
}

/**
 * The plugins a Pulzar site uses: the theme, and (unless turned off) the
 * internal link validator. Spread into Starlight's `plugins`.
 * @param {PulzarDocsOptions} options
 */
export function pulzarPlugins(options) {
	const plugins = [pulzarDocs(options)];
	if (options.validateLinks !== false) {
		plugins.push(starlightLinksValidator({ exclude: options.linkExclude ?? [], errorOnLocalLinks: false }));
	}
	return plugins;
}

export { projects };
