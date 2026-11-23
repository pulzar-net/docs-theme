# docs-theme

[![npm](https://img.shields.io/npm/v/@pulzr/docs-theme.svg)](https://www.npmjs.com/package/@pulzr/docs-theme)
[![CI](https://github.com/pulzar-net/docs-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/pulzar-net/docs-theme/actions/workflows/ci.yml)
[![Demo](https://img.shields.io/badge/demo-oss.pulzr.net-blue)](https://oss.pulzr.net/docs-theme/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

One [Starlight](https://starlight.astro.build) theme for the documentation of
every Pulzr open-source project, so they read as one family: the same brand,
the same chrome, the same components for the pages every project needs, and a
starter that gives a new project its docs site in one command.

**[Demo and component gallery](https://oss.pulzr.net/docs-theme/)**

## What it provides

- **A compact, technical look.** Dense reference docs: IBM Plex Sans for text
  and IBM Plex Mono for code and identifiers, small steps in the type scale,
  hairlines instead of shadows, and the Pulzr console's emerald as the one
  accent. Light and dark follow the browser (there is no switch), and pages
  use the window's width, with prose kept to a readable measure.
- **Logos where we name a real thing, under each owner's rules.**
  [`marks.mjs`](marks.mjs) lists every language, protocol, registry and
  platform the sites name. Where an owner's policy allows our use, its own
  logo file is shown unmodified (Rust, Python, GitHub, Starlight); elsewhere
  the name is shown with the owner's trademark symbol. Every site gets a
  **Trademarks and attributions** page (`attributions.html`), linked from the
  footer, with each owner's notice and the files' credits. Never use an icon
  that redraws a logo, such as Starlight's `seti:rust` or `github` icons.
- **Shared chrome.** A project switcher across the family
  ([`projects.mjs`](projects.mjs)), a footer with "Maintained by Pulzr", the
  license and the security reporting link, edit links to the page's source,
  a GitHub link, the favicon, and Starlight's Pagefind search.
- **Link checking.** Every internal link is checked at build time
  ([starlight-links-validator](https://github.com/HiDeoo/starlight-links-validator));
  a broken link fails the build.
- **Components** for MDX pages:

| Component | For |
|---|---|
| `Hero` | a landing page's name, one line, the project's stack from `projects.mjs`, and actions |
| `Features` | what a project does, as a list of entries; an entry may show a `mark`, never a stock icon |
| `Mark` | a language, protocol, registry or platform: its logo where allowed, else its name |
| `AsyncApiReference` | an AsyncAPI document (an MQTT API) as a reference: servers, channels, operations, message schemas |
| `StatusBadge` | a tested, expected, in progress, planned or unsupported pill |
| `StatusMatrix` | a feature matrix with status badges and versions |
| `HardwareTable` | hardware with tested, expected and unsupported badges |
| `ReleaseDownload` | download a release binary and check it against `SHA256SUMS` |
| `MqttTopic` | one MQTT topic: direction, retention, purpose, example payload |
| `Snippet` | a code region from another file (between `ANCHOR:` lines), so docs show code a test runs |

A plain Markdown table needs no component for its badges: in a column headed
**State** or **Status**, a cell that is only a status word (`tested`,
`expected`, `in progress`, `planned`, `unsupported`, ...) is drawn as that
badge.

`AsyncApiReference` renders with [Scalar's API reference](https://github.com/scalar/scalar),
an optional peer dependency, so only a site that uses it installs it:

```sh
npm install --save-exact @scalar/api-reference@1.82.1
```

```mdx
---
title: MQTT reference
tableOfContents: false
---
import AsyncApiReference from '@pulzr/docs-theme/components/AsyncApiReference.astro';

<AsyncApiReference spec="/my-project/asyncapi.json" />
```

It follows the browser's light or dark preference and the theme's type and
colors, with Scalar's sidebar, client, toolbar and extras off. It is not in
`@pulzr/docs-theme/components`, so sites without it never load Scalar.

The [component gallery](https://oss.pulzr.net/docs-theme/components.html)
shows each one with its props.

## A new project's docs, in one command

In the root of the project's repository:

```sh
npx --yes @pulzr/docs-theme init --project my-project --description "What it is, in one sentence."
```

This writes `docs/` (a Starlight site with the theme, a landing page and a
getting started page) and `.github/workflows/docs.yml` (build, link check,
publish to GitHub Pages). It never overwrites a file. Then:

```sh
cd docs && npm install && npm run dev
```

Enable GitHub Pages with the source "GitHub Actions". The site is served at
`https://oss.pulzr.net/<repository>/`: the organization's Pages site has that
custom domain, so every project site without its own domain is served under
it. Add the project to [`projects.mjs`](projects.mjs) (with `docs: true`) so
it appears in every site's switcher and on the [landing page](https://oss.pulzr.net/).

The site pins the theme at an exact version. To get each new release as a
pull request, give Dependabot the docs directory:

```yaml
# .github/dependabot.yml, under updates:
- package-ecosystem: npm
  directory: /docs
  schedule:
    interval: weekly
```

## Using the theme in an existing Starlight site

```sh
npm install --save-exact @pulzr/docs-theme
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { pulzarPlugins } from '@pulzr/docs-theme';

export default defineConfig({
  site: 'https://oss.pulzr.net',
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
| `siteDir` | `docs` | the docs site's directory in the repository, for edit links; `.` for a site at the root |
| `validateLinks` | `true` | fail the build on a broken internal link |
| `linkExclude` | `[]` | link patterns the validator skips, such as API docs added after the build |
| `linkValidator` | `{}` | more [starlight-links-validator options](https://starlight-links-validator.vercel.app/configuration/), such as `errorOnRelativeLinks: false` for a page that embeds a README |

Components:

```mdx
import { Hero, StatusMatrix } from '@pulzr/docs-theme/components';
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

To release, set `version` in `package.json` and push an annotated tag
`vX.Y.Z` on main whose message is the release notes
(`git tag -a vX.Y.Z --cleanup=whitespace -F notes.md`). The release
workflow publishes `@pulzr/docs-theme` to npm with provenance and makes the
GitHub release with those notes. There is no changelog file: what changed is
in the [releases](https://github.com/pulzar-net/docs-theme/releases). New
sites from the starter link there too. Sites pin an exact version and
move to a new one with a one-line change.

## License

MIT. See [LICENSE](LICENSE). The Pulzr mark and wordmark are Pulzar LLC's
trademarks; use them only for Pulzr's own projects.

## Maintained by Pulzr

Maintained by [Pulzr](https://pulzr.net) for its open-source projects.
