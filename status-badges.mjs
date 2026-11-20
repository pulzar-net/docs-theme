// Badges in plain Markdown tables. In a table with a "State" or "Status"
// column, a cell of that column that holds only a status word (expected,
// tested, unsupported, planned, "in progress", ...) is shown as the status
// badge. The Markdown stays a plain table that reads the same on GitHub.
//
// A hast plugin for Sätteri, Astro's Markdown processor.

import { findStatus } from './status.mjs';

const COLUMN = /^(state|status)$/i;

const elements = (node, tag) => (node.children ?? []).filter((c) => c.type === 'element' && (!tag || tag.includes(c.tagName)));
const text = (node) => (node.type === 'text' ? node.value : (node.children ?? []).map(text).join(''));

const badge = (status) => ({
	type: 'element',
	tagName: 'span',
	properties: { className: ['pz-badge', `pz-tone-${status.tone}`] },
	children: [{ type: 'text', value: status.label }],
});

/** The table's rows, header row first, through thead/tbody or not. */
function rows(table) {
	return elements(table).flatMap((part) => (part.tagName === 'tr' ? [part] : elements(part, ['tr'])));
}

/** A copy of `node` with `fn` applied to each of its rows. Sätteri's nodes are
    read-only, so the table is rebuilt; untouched nodes are reused. */
function mapRows(node, fn) {
	if (node.type !== 'element') return node;
	if (node.tagName === 'tr') return fn(node);
	return { ...node, children: node.children.map((c) => mapRows(c, fn)) };
}

export function statusBadgesPlugin() {
	return {
		name: 'pulzar-status-badges',
		element: {
			filter: ['table'],
			visit(table) {
				const [head] = rows(table);
				const col = head ? elements(head, ['th', 'td']).findIndex((cell) => COLUMN.test(text(cell).trim())) : -1;
				if (col < 0) return;
				let changed = false;
				const out = mapRows(table, (tr) => {
					if (tr === head) return tr;
					let i = -1;
					return {
						...tr,
						children: tr.children.map((cell) => {
							if (cell.type !== 'element' || !['th', 'td'].includes(cell.tagName) || ++i !== col) return cell;
							const status = findStatus(text(cell));
							if (!status) return cell;
							changed = true;
							return { ...cell, children: [badge(status)] };
						}),
					};
				});
				return changed ? out : undefined;
			},
		},
	};
}
