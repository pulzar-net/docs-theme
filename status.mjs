// The statuses a badge can show: the StatusBadge component and the table
// plugin (rehype-status-badges.mjs) both read them from here.

/** @type {Record<string, { label: string, tone: string }>} */
export const statuses = {
	tested: { label: 'Tested', tone: 'tested' },
	done: { label: 'Done', tone: 'tested' },
	expected: { label: 'Expected', tone: 'expected' },
	next: { label: 'Next release', tone: 'expected' },
	progress: { label: 'In progress', tone: 'progress' },
	planned: { label: 'Planned', tone: 'planned' },
	unsupported: { label: 'Unsupported', tone: 'unsupported' },
	'not-planned': { label: 'Not planned', tone: 'unsupported' },
};

/** A status from its id or its label, in any case ("Not planned", "in progress"). */
export function findStatus(text) {
	const key = text.trim().toLowerCase();
	if (statuses[key]) return statuses[key];
	return Object.values(statuses).find((s) => s.label.toLowerCase() === key);
}
