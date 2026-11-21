/**
 * Pulzar's open-source projects, in one place: every site's project switcher
 * and the landing page at https://oss.pulzr.net/ are built from this list.
 * Add a new public project here (and tag a release of this package) to have
 * it appear on both.
 *
 * `docs: true` means the project's docs are a site on this theme, at
 * `${site}/<id>/`; a URL string means its docs live elsewhere; no `docs`
 * means its README is the documentation. Order is the order shown.
 */

/** Where every project's docs site is served, as `${site}/<repository>/`. */
export const site = 'https://oss.pulzr.net';

/** The landing page's sections, in order. */
export const areas = [
	{ id: 'gateway', name: 'Gateway' },
	{ id: 'radio', name: 'Radio stacks', description: 'Host stacks in Rust, each with a standalone bridge to MQTT and Home Assistant.' },
	{ id: 'devices', name: 'Device libraries' },
	{ id: 'build', name: 'Build on Pulzr' },
	{ id: 'lorawan', name: 'LoRaWAN' },
	{ id: 'dashboards', name: 'Dashboards', description: 'A Perses datasource for Pulzr data, and the panels that show it.' },
];

const list = [
	{ id: 'PulzrOS', area: 'gateway', docs: true, description: 'Gateway OS for LoRaWAN, Bluetooth LE and IP devices, on OpenWrt' },
	{ id: 'pulzr-edge', area: 'gateway', description: 'Edge daemon: one process per radio or bus, store-and-forward, one protocol to the platform' },
	{ id: 'zigbee-bridge', area: 'radio', docs: true, description: 'Zigbee coordinator stack and Zigbee to MQTT bridge' },
	{ id: 'zwave-bridge', area: 'radio', docs: true, description: 'Z-Wave controller stack and Z-Wave to MQTT bridge' },
	{ id: 'bluetooth-bridge', area: 'radio', docs: true, description: 'Bluetooth host stack on raw HCI and BLE to MQTT bridge' },
	{ id: 'matter-bridge', area: 'radio', docs: true, description: 'Matter controller and Matter to MQTT bridge' },
	{ id: 'zigbee-codec-catalog', area: 'devices', docs: true, description: 'Zigbee device definitions from zigbee-herdsman-converters, as data' },
	{ id: 'zwave-config-catalog', area: 'devices', description: "Z-Wave JS's device configuration lookup as one script for any JavaScript engine" },
	{ id: 'codec-test', area: 'devices', description: 'Run LoRaWAN payload codecs as ChirpStack and The Things Stack do, against their test vectors' },
	{ id: 'oui', area: 'devices', description: 'MAC address vendor lookup as small static files, rebuilt weekly from the IEEE registries' },
	{ id: 'pulzr-sdk', area: 'build', docs: 'https://app.pulzr.net/docs/sdks', description: 'Python and TypeScript SDKs for the Pulzr API' },
	{ id: 'pulzr-package-sdk', area: 'build', docs: true, description: 'SDK for sandboxed gateway packages' },
	{ id: 'docs-theme', area: 'build', docs: true, description: 'The Starlight theme and starter for these docs' },
	{ id: 'basicstation-gate', area: 'lorawan', description: 'LoRa Basics Station front door and CUPS server for ChirpStack and other network servers' },
	{ id: 'lorawan-locate', area: 'lorawan', description: 'Locate LoRaWAN devices from the gateways that heard them' },
	{ id: 'sx1302_hal', area: 'lorawan', description: 'The SX1302 concentrator HAL and packet forwarder PulzrOS builds on' },
	{ id: 'perses-pulzr-datasource', area: 'dashboards', description: 'Pulzr data in Perses: readings, SQL, analytics, field changes and devices' },
	{ id: 'perses-timeseries-panel', area: 'dashboards', description: 'Time series with step and smooth lines and target bands' },
	{ id: 'perses-state-panel', area: 'dashboards', description: 'What a value means now, and since when' },
	{ id: 'perses-latest-panel', area: 'dashboards', description: "Each series' current value and how long ago it was read" },
	{ id: 'perses-map-panel', area: 'dashboards', description: 'Series on a MapLibre map by their position labels' },
	{ id: 'perses-week-heatmap-panel', area: 'dashboards', description: 'A value by weekday and hour, as a grid of cells' },
	{ id: 'perses-figure-panel', area: 'dashboards', description: 'One figure, with its change against the period before' },
	{ id: 'perses-category-panel', area: 'dashboards', description: 'Values by category as columns, lines, areas or a strip of cells' },
	{ id: 'perses-donut-panel', area: 'dashboards', description: 'Shares of a whole as a donut, with a table of the slices' },
	{ id: 'perses-sankey-panel', area: 'dashboards', description: 'How amounts flow from sources to where they end up' },
	{ id: 'perses-panel-preview', area: 'dashboards', description: 'A GitHub Action that renders a sample image of a panel plugin' },
];

/**
 * @typedef {object} Project
 * @property {string} id The GitHub repository name, and the docs site's path.
 * @property {string} name
 * @property {string} area An id from `areas`.
 * @property {string} description One line.
 * @property {string} repo The repository's URL.
 * @property {string} [docs] The docs' URL, if they are more than the README.
 * @property {boolean} site True when the docs are a site on this theme.
 */

/** @type {Project[]} */
export const projects = list.map((p) => ({
	...p,
	name: p.name ?? p.id,
	repo: `https://github.com/pulzar-net/${p.id}`,
	docs: p.docs === true ? `${site}/${p.id}/` : p.docs,
	site: p.docs === true,
}));
