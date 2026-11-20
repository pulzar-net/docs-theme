# docs-theme

[![CI](https://github.com/pulzar-net/docs-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/pulzar-net/docs-theme/actions/workflows/ci.yml)
[![Demo](https://img.shields.io/badge/demo-pulzar--net.github.io-blue)](https://pulzar-net.github.io/docs-theme/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

One [Starlight](https://starlight.astro.build) theme for the documentation of
every Pulzar open-source project, so they read as one family: the same brand,
the same chrome, the same components for the pages every project needs, and a
starter that gives a new project its docs site in one command.

**[Demo and component gallery](https://pulzar-net.github.io/docs-theme/)**

## What it provides

- **Brand.** The Pulzr mark, and colors and type from the Pulzr console's
  design tokens (Inter for text, Outfit for headings, the console's surfaces
  and accent), light and dark.
- **Shared chrome.** A project switcher across the family
  ([`projects.mjs`](projects.mjs)), a footer with "Maintained by Pulzar", the
  license and the security reporting link, edit links to the page's source,
  a GitHub link, the favicon, and Starlight's Pagefind search.
- **Link checking.** Every internal link is checked at build time
  ([starlight-links-validator](https://github.com/HiDeoo/starlight-links-validator));
  a broken link fails the build.
- **Components** for MDX pages:

| Component | For |
|---|---|
| `Hero` | a landing page's title, pitch and calls to action |
| `Features` | feature cards in a responsive grid |
| `StatusBadge` | a tested, expected, in progress, planned or unsupported pill |
| `StatusMatrix` | a feature matrix with status badges and versions |
| `HardwareTable` | hardware with tested, expected and unsupported badges |
| `ReleaseDownload` | download a release binary and check it against `SHA256SUMS` |
| `MqttTopic` | one MQTT topic: direction, retention, purpose, example payload |
| `Snippet` | a code region from another file (between `ANCHOR:` lines), so docs show code a test runs |

The [component gallery](https://pulzar-net.github.io/docs-theme/components.html)
shows each one with its props.

## A new project's docs, in one command

In the root of the project's repository:

```sh
npx --yes github:pulzar-net/docs-theme#v0.1.0 init --project my-project --description "What it is, in one sentence."
```

This writes `docs/` (a Starlight site with the theme, a landing page and a
getting started page) and `.github/workflows/docs.yml` (build, link check,
publish to GitHub Pages). It never overwrites a file. Then:

```sh
cd docs && npm install && npm run dev
```

Enable GitHub Pages with the source "GitHub Actions", and add the project to
[`projects.mjs`](projects.mjs) so it appears in every site's switcher.

## Using the theme in an existing Starlight site

```sh
npm install "@pulzar-net/docs-theme@git+https://github.com/pulzar-net/docs-theme.git#v0.1.0"
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pulzarPlugins } from '@pulzar-net/docs-theme';

export default defineConfig({
  site: 'https://pulzar-net.github.io',
  base: '/my-project',
  build: { format: 'file' },
  integrations: [
    starlight({
      title: 'my-project',
      plugins: pulzarPlugins({ project: 'my-project' }),
    }),
  ],
});
```

| Option | Default | What |
|---|---|---|
| `project` | required | the project's id, as in `projects.mjs`, and its repository name |
| `repo` | `https://github.com/pulzar-net/<project>` | the repository, for edit links, the footer and the GitHub link |
| `license` | `MIT` | the license the footer names |
| `editBranch` | `main` | the branch edit links open |
| `docsPath` | `docs/src/content/docs` | where the pages live in the repository |
| `validateLinks` | `true` | fail the build on a broken internal link |
| `linkExclude` | `[]` | link patterns the validator skips, such as API docs added after the build |

Components:

```mdx
import { Hero, StatusMatrix } from '@pulzar-net/docs-theme/components';
```

### Conventions every site follows

- **URLs are `page.html`** (`build: { format: 'file' }`), the way GitHub Pages
  serves files, so links keep working with or without `.html`. An index page
  in a folder (`library/index.md`) is `library.html`; if an older site had
  `library/index.html`, add `redirects: { '/library/index': '/<base>/library.html' }`.
- **Links in pages are absolute with the base**, such as
  `/my-project/mqtt.html#topics`, so the link checker can follow them.
- **Generated pages** (a configuration reference from the code, one page per
  board from its config file) are written into `src/content/docs` before the
  build by the project's own tooling, and their freshness is checked in CI.

## Developing the theme

```sh
npm install
npm run dev      # the demo site, with every component
npm run build
```

Release by tagging `vX.Y.Z` on main; sites pin the theme by tag and move to a
new one with a one-line change. [CHANGELOG.md](CHANGELOG.md) lists what
changed.

## License

MIT. See [LICENSE](LICENSE). The Pulzr mark and the Pulzar wordmark are
Pulzar LLC's trademarks; use them only for Pulzar's own projects.

## Maintained by Pulzar

Maintained by [Pulzar](https://pulzr.net) for its open-source projects.
