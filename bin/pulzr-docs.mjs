#!/usr/bin/env node
// pulzr-docs init: a new project's docs site, from the starter in this
// package. Run in the root of the project's repository:
//
//   npx --yes @pulzr/docs-theme init --project my-project --description "What it is."
//
// It writes docs/ (Starlight with the Pulzar theme) and
// .github/workflows/docs.yml, and refuses to overwrite a file that exists.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const usage = 'usage: pulzr-docs init --project NAME --description TEXT [--dir PATH]';

const { positionals, values } = parseArgs({
	allowPositionals: true,
	options: {
		project: { type: 'string' },
		description: { type: 'string' },
		dir: { type: 'string', default: '.' },
		help: { type: 'boolean', short: 'h' },
	},
});
if (values.help || positionals[0] !== 'init' || !values.project || !values.description) {
	console.error(usage);
	process.exit(values.help ? 0 : 2);
}

const vars = {
	project: values.project,
	description: values.description,
	themeVersion: pkg.version,
};
const fill = (text) => text.replace(/\{\{(\w+)\}\}/g, (m, k) => vars[k] ?? m);

const starter = join(root, 'starter');
// npm leaves .gitignore files out of a package, so the starter's is stored
// as `gitignore` and written under its real name.
const targetName = (f) => f.replace(/(^|[/\\])gitignore$/, '$1.gitignore');
const files = [];
(function walk(dir) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) walk(path);
		else files.push(relative(starter, path));
	}
})(starter);

const target = values.dir;
const clashes = files.map(targetName).filter((f) => existsSync(join(target, f)));
if (clashes.length) {
	console.error(`pulzr-docs: these exist already, nothing written:\n  ${clashes.join('\n  ')}`);
	process.exit(1);
}
for (const f of files) {
	const out = join(target, targetName(f));
	mkdirSync(dirname(out), { recursive: true });
	writeFileSync(out, fill(readFileSync(join(starter, f), 'utf8')));
	console.log(`wrote ${out}`);
}
console.log(`
Next:
  cd ${join(target, 'docs')} && npm install && npm run dev
  Enable GitHub Pages with source "GitHub Actions" for the repository.`);
