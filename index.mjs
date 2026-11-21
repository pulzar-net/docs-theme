/**
 * @pulzr/docs-theme: one Starlight look for every Pulzar open-source
 * project. Add it to a Starlight site's plugins:
 *
 *   import pulzarDocs from '@pulzr/docs-theme';
 *   starlight({ title: 'zigbee-bridge', plugins: [pulzarDocs({ project: 'zigbee-bridge' })] })
 *
 * It sets the brand (mark, colors and type from the Pulzr console's design
 * tokens, light and dark), the shared chrome (project switcher, footer, edit
 * links, GitHub link, favicon), and turns on internal link validation.
 * Components for pages are in '@pulzr/docs-theme/components'.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import starlightLinksValidator from 'starlight-links-validator';
import { projects, areas, site as home } from './projects.mjs';
import { isSatteriProcessor } from '@astrojs/markdown-satteri';
import { statusBadgesPlugin } from './status-badges.mjs';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

/**
 * @typedef {object} PulzarDocsOptions
 * @property {string} project The project's id, as in projects.mjs (also its GitHub repository name).
 * @property {string} [repo] The repository URL; defaults to https://github.com/pulzar-net/<project>.
 * @property {string} [license] The license named in the footer; defaults to MIT.
 * @property {string} [editBranch] The branch edit links point at; defaults to main.
 * @property {string} [siteDir] The docs site's directory in the repository, where astro.config.mjs is; defaults to docs; '.' for a site at the repository's root. Edit links are this plus each page's path from there.
 * @property {boolean} [validateLinks] Fail the build on broken internal links; defaults to true.
 * @property {string[]} [linkExclude] Link patterns the validator skips (for pages generated outside Starlight, such as API docs).
 * @property {Record<string, unknown>} [linkValidator] More starlight-links-validator options, such as `errorOnRelativeLinks: false` for a page that embeds a README with repository-relative links.
 */

/** @param {PulzarDocsOptions} options */
export default function pulzarDocs(options) {
	const {
		project,
		repo = `https://github.com/pulzar-net/${project}`,
		license = 'MIT',
		editBranch = 'main',
		siteDir = 'docs',
		validateLinks = true,
		linkExclude = [],
	} = options;
	if (!project) throw new Error('@pulzr/docs-theme: `project` is required');

	const site = { project, repo, license, home, projects: projects.filter((p) => p.site) };
	const icon = readFileSync(here('./assets/icon.svg'), 'utf8');

	return {
		name: '@pulzr/docs-theme',
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
						: { baseUrl: `${repo}/edit/${editBranch}/${siteDir === '.' || siteDir === '' ? '' : `${siteDir}/`}` },
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
					// Rust blocks that rustdoc compiles carry attributes (rust,no_run):
					// highlight them as Rust.
					expressiveCode:
						config.expressiveCode === false
							? false
							: {
									...(typeof config.expressiveCode === 'object' ? config.expressiveCode : {}),
									shiki: {
										...(typeof config.expressiveCode === 'object' ? config.expressiveCode.shiki : {}),
										langAlias: {
											'rust,no_run': 'rust',
											'rust,ignore': 'rust',
											'rust,should_panic': 'rust',
											'rust,compile_fail': 'rust',
											...(typeof config.expressiveCode === 'object' ? config.expressiveCode.shiki?.langAlias : {}),
										},
									},
								},
					credits: false,
					lastUpdated: config.lastUpdated ?? true,
				});
				addIntegration({
					name: '@pulzr/docs-theme/site',
					hooks: {
						'astro:config:setup'({ config: astroConfig, updateConfig: updateAstroConfig, logger }) {
							// Status words in Markdown tables become badges, as Starlight
							// adds its own transforms: on the Sätteri processor.
							const processor = astroConfig.markdown.processor;
							if (isSatteriProcessor(processor)) processor.options.hastPlugins.push(statusBadgesPlugin());
							else logger.warn('Status badges in Markdown tables need the default (Sätteri) Markdown processor.');
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
		plugins.push(
			starlightLinksValidator({ exclude: options.linkExclude ?? [], errorOnLocalLinks: false, ...options.linkValidator }),
		);
	}
	return plugins;
}

export { projects, areas, home as site };
