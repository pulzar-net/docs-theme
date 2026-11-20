# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project
follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2026-11-20

### Added

- `pulzr-docs init` and the README say how to have Dependabot bring each new
  theme release to a site, now that sites pin the theme from npm.

### Changed

- First release published by the release workflow, with npm provenance.

## [0.2.0] - 2026-11-20

### Changed

- The theme is on npm as `@pulzr/docs-theme`, so a site pins a version
  (`npm install --save-exact @pulzr/docs-theme`) and shows in the
  repository's "Used by". Imports change from `@pulzar-net/docs-theme` to
  `@pulzr/docs-theme`; the git-tag install of 0.1.x stops at 0.1.3.
- `pulzar-docs init` is `pulzr-docs init`: `npx @pulzr/docs-theme init`.
  The starter pins the theme from npm.

### Added

- A release workflow: a `v*` tag publishes to npm with provenance and makes
  the GitHub release from this changelog.

## [0.1.3] - 2026-11-20

### Added

- Status badges in plain Markdown tables: in a column headed State or
  Status, a cell that is only a status word is drawn as its badge.

### Fixed

- One hairline under the header on a phone, not two.
- A heading that is only a link (a changelog's `## [1.2.0]`) reads as a
  heading, not as a large link.
- A long project name fits in the header on a phone.
- On a phone the hero leads with the project's name; the mark is in the
  header already.
- The starter's workflow uses the current GitHub actions, and Dependabot
  keeps them current.

## [0.1.2] - 2026-11-20

### Fixed

- Edit links open the page's file. They repeated `src/content/docs`, so every
  "Edit page" link was a 404. The `docsPath` option is now `siteDir`: the
  docs site's directory in the repository (default `docs`). CI checks that
  every edit link in the demo names a file that exists.

## [0.1.1] - 2026-11-20

### Added

- `linkValidator`: more options for the link validator, such as
  `errorOnRelativeLinks: false` for a page that embeds a README.

### Fixed

- A page that embeds a whole Markdown file in `<div class="pz-included">`
  (a changelog, a format spec) no longer repeats the file's H1 or a
  README's badge line.
- Rust code blocks with rustdoc attributes (`rust,no_run`, `rust,ignore`)
  are highlighted as Rust.
- Feature cards fall into three columns, so six cards make two even rows.

## [0.1.0] - 2026-11-20

### Added

- A Starlight plugin with the Pulzr brand (mark, the console's colors and
  type, light and dark), a project switcher across Pulzar's open-source
  projects, a footer with "Maintained by Pulzar", edit links, the favicon,
  and internal link validation.
- Components: Hero, Features, StatusBadge, StatusMatrix, HardwareTable,
  ReleaseDownload, MqttTopic and Snippet.
- `pulzar-docs init`, which writes a new project's docs site and its
  GitHub Pages workflow.
- A demo site with every component, published to GitHub Pages.

[Unreleased]: https://github.com/pulzar-net/docs-theme/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/pulzar-net/docs-theme/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/pulzar-net/docs-theme/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/pulzar-net/docs-theme/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/pulzar-net/docs-theme/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/pulzar-net/docs-theme/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/pulzar-net/docs-theme/releases/tag/v0.1.0
