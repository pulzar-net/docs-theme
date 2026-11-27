/**
 * Pulzr's open-source projects, in one place: every site's project switcher
 * and the landing page at https://oss.pulzr.net/ are built from this list.
 * Add a new public project here (and tag a release of this package) to have
 * it appear on both.
 *
 * `stack` names what each project speaks and is written in (ids in
 * marks.mjs); `packages` says where its releases are published.
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
	{ id: 'PulzrOS', area: 'gateway', docs: true, description: 'Gateway OS for LoRaWAN, Bluetooth LE and IP devices, on OpenWrt', stack: ['openwrt', 'lorawan', 'shell'], packages: [{ registry: 'github' }] },
	{ id: 'pulzr-edge', area: 'gateway', description: 'Edge daemon: one process per radio or bus, store-and-forward, one protocol to the platform', stack: ['rust', 'modbus'] },
	{ id: 'zigbee-bridge', area: 'radio', docs: true, description: 'Zigbee coordinator stack and Zigbee to MQTT bridge', stack: ['zigbee', 'rust', 'mqtt'], packages: [{ registry: 'crates', name: 'zigbee-host' }] },
	{ id: 'zwave-bridge', area: 'radio', docs: true, description: 'Z-Wave controller stack and Z-Wave to MQTT bridge', stack: ['zwave', 'rust', 'mqtt'], packages: [{ registry: 'crates', name: 'zwave-host' }] },
	{ id: 'bluetooth-bridge', area: 'radio', docs: true, description: 'Bluetooth host stack on raw HCI and BLE to MQTT bridge', stack: ['bluetooth', 'rust', 'mqtt'], packages: [{ registry: 'crates', name: 'bluetooth-host' }] },
	{ id: 'matter-bridge', area: 'radio', docs: true, description: 'Matter controller and Matter to MQTT bridge', stack: ['matter', 'thread', 'rust', 'mqtt'], packages: [{ registry: 'github' }] },
	{ id: 'zigbee-codec-catalog', area: 'devices', docs: true, description: 'Zigbee device definitions from zigbee-herdsman-converters, as data', stack: ['zigbee', 'typescript'], packages: [{ registry: 'github' }] },
	{ id: 'zwave-config-catalog', area: 'devices', description: "Z-Wave JS's device configuration lookup as one script for any JavaScript engine", stack: ['zwave', 'typescript'], packages: [{ registry: 'github' }] },
	{ id: 'codec-test', area: 'devices', description: 'Run LoRaWAN payload codecs as ChirpStack and The Things Stack do, against their test vectors', stack: ['lorawan', 'javascript'] },
	{ id: 'oui', area: 'devices', description: 'MAC address vendor lookup as small static files, rebuilt weekly from the IEEE registries', stack: ['python', 'javascript'] },
	{ id: 'pulzr-sdk', area: 'build', docs: 'https://app.pulzr.net/docs/sdks', description: 'Python and TypeScript SDKs for the Pulzr API', stack: ['python', 'typescript'], packages: [{ registry: 'pypi', name: 'pulzr' }, { registry: 'npm', name: '@pulzr/sdk' }] },
	{ id: 'pulzr-package-sdk', area: 'build', docs: true, description: 'SDK for sandboxed gateway packages', stack: ['rust', 'webassembly', 'python'], packages: [{ registry: 'crates', name: 'pulzr-package' }, { registry: 'pypi', name: 'pulzr-pkg' }] },
	{ id: 'connectivity-1nce', area: 'build', description: '1NCE IoT SIMs as a carrier driver: a sandboxed package on the Pulzr package SDK', stack: ['rust', 'webassembly'], packages: [{ registry: 'github' }] },
	{ id: 'pulzr-ui', area: 'build', description: "The consoles' design language: tokens, status, radio icons, device images and the ports diagram", stack: ['typescript'], packages: [{ registry: 'github' }] },
	{ id: 'docs-theme', area: 'build', docs: true, description: 'The Starlight theme and starter for these docs', stack: ['starlight'], packages: [{ registry: 'npm', name: '@pulzr/docs-theme' }] },
	{ id: 'basicstation-gate', area: 'lorawan', description: 'LoRa Basics Station front door and CUPS server for ChirpStack and other network servers', stack: ['lorawan', 'python'] },
	{ id: 'lorawan-locate', area: 'lorawan', description: 'Locate LoRaWAN devices from the gateways that heard them', stack: ['lorawan', 'python'] },
	{ id: 'sx1302_hal', area: 'lorawan', description: 'The SX1302 concentrator HAL and packet forwarder PulzrOS builds on', stack: ['lora', 'c'] },
	{ id: 'perses-pulzr-datasource', area: 'dashboards', description: 'Pulzr data in Perses: readings, SQL, analytics, field changes and devices', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-pulzr-datasource' }] },
	{ id: 'perses-timeseries-panel', area: 'dashboards', description: 'Time series with step and smooth lines and target bands', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-timeseries-panel' }] },
	{ id: 'perses-state-panel', area: 'dashboards', description: 'What a value means now, and since when', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-state-panel' }] },
	{ id: 'perses-latest-panel', area: 'dashboards', description: "Each series' current value and how long ago it was read", stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-latest-panel' }] },
	{ id: 'perses-map-panel', area: 'dashboards', description: 'Series on a MapLibre map by their position labels', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-map-panel' }] },
	{ id: 'perses-week-heatmap-panel', area: 'dashboards', description: 'A value by weekday and hour, as a grid of cells', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-week-heatmap-panel' }] },
	{ id: 'perses-figure-panel', area: 'dashboards', description: 'One figure, with its change against the period before', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-figure-panel' }] },
	{ id: 'perses-category-panel', area: 'dashboards', description: 'Values by category as columns, lines, areas or a strip of cells', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-category-panel' }] },
	{ id: 'perses-donut-panel', area: 'dashboards', description: 'Shares of a whole as a donut, with a table of the slices', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-donut-panel' }] },
	{ id: 'perses-sankey-panel', area: 'dashboards', description: 'How amounts flow from sources to where they end up', stack: ['perses', 'typescript'], packages: [{ registry: 'npm', name: '@pulzr/perses-sankey-panel' }] },
	{ id: 'perses-panel-preview', area: 'dashboards', description: 'A GitHub Action that renders a sample image of a panel plugin', stack: ['perses', 'javascript'], packages: [{ registry: 'github' }] },
];

/**
 * @typedef {object} Project
 * @property {string} id The GitHub repository name, and the docs site's path.
 * @property {string} name
 * @property {string} area An id from `areas`.
 * @property {string} description One line.
 * @property {string[]} stack What it speaks and is written in: ids in marks.mjs, protocol first.
 * @property {{ registry: 'crates' | 'npm' | 'pypi' | 'github', name?: string }[]} [packages] Where its releases are published; `github` is its GitHub releases.
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
