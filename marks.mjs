/**
 * Every third-party name these sites show beside a project: languages,
 * protocols, registries and platforms. A mark whose owner's policy allows
 * our use shows the owner's own logo file, unmodified (assets/marks/); the
 * others are their word, with the trademark symbol their owner uses. Each
 * entry's notice is printed on the Trademarks and attributions page.
 *
 * Add a logo only after reading its owner's policy, record that policy's
 * URL in `policy`, and copy the owner's file in unchanged. No redrawn or
 * look-alike logos (icon sets' paths are still the owner's trademark).
 */

/**
 * @typedef {object} Mark
 * @property {string} name The name as written in text, with its symbol.
 * @property {string} [owner] Who owns the mark, as far as their own site says.
 * @property {string} [notice] The line printed on the attributions page; none for a name that is not a trademark.
 * @property {string} [policy] The owner's policy we followed.
 * @property {{ light: string, dark: string, width: number, height: number, wordmark?: boolean }} [logo] Files in assets/marks/: for a light and a dark page. A `wordmark` logo spells the name, so beside text the text alone is shown.
 * @property {{ text: string, url: string }} [credit] A license credit the logo file asks for, and the license.
 */

/** @type {Record<string, Mark>} */
export const marks = {
	// Logos: the owner's policy allows showing them to name the thing.
	rust: {
		name: 'Rust',
		owner: 'Rust Foundation',
		notice: 'Rust and the Rust logo are trademarks of the Rust Foundation, used here only to say a project is written in Rust.',
		policy: 'https://rustfoundation.org/policy/rust-trademark-policy/',
		logo: { light: 'rust-logo.svg', dark: 'rust-logo-white-outline.svg', width: 106, height: 106 },
		credit: { text: 'Rust logo by the Rust Foundation, unmodified, under CC BY 4.0.', url: 'https://creativecommons.org/licenses/by/4.0/' },
	},
	python: {
		name: 'Python',
		owner: 'Python Software Foundation',
		notice: '"Python" and the Python logos are trademarks or registered trademarks of the Python Software Foundation.',
		policy: 'https://www.python.org/psf/trademarks/',
		logo: { light: 'python-logo-only.svg', dark: 'python-logo-only.svg', width: 110, height: 110 },
	},
	github: {
		name: 'GitHub',
		owner: 'GitHub, Inc.',
		notice: 'GitHub® and the Invertocat logo are trademarks of GitHub, Inc., used here to link to GitHub.',
		policy: 'https://brand.github.com/foundations/logo',
		logo: { light: 'GitHub_Invertocat_Black.svg', dark: 'GitHub_Invertocat_White.svg', width: 98, height: 96 },
	},
	starlight: {
		name: 'Starlight',
		owner: 'Astro',
		notice: 'Starlight and its logo belong to the Astro project, shown per its press guidelines to say these sites are built with Starlight.',
		policy: 'https://astro.build/press',
		logo: { light: 'starlight-logo-dark.svg', dark: 'starlight-logo-light.svg', width: 200, height: 55, wordmark: true },
	},

	// Word marks: logo use is limited to members, licensees or certified
	// products, needs permission, or has no policy we could read.
	bluetooth: {
		name: 'Bluetooth®',
		owner: 'Bluetooth SIG, Inc.',
		notice: 'The Bluetooth® word mark is a registered trademark owned by Bluetooth SIG, Inc.',
		policy: 'https://www.bluetooth.com/develop-with-bluetooth/marketing-branding/',
	},
	zigbee: {
		name: 'Zigbee',
		owner: 'Connectivity Standards Alliance',
		notice: 'Zigbee is a trademark of the Connectivity Standards Alliance.',
		policy: 'https://csa-iot.org/terms-conditions/',
	},
	matter: {
		name: 'Matter',
		owner: 'Connectivity Standards Alliance',
		notice: 'Matter is a trademark of the Connectivity Standards Alliance.',
		policy: 'https://csa-iot.org/terms-conditions/',
	},
	thread: {
		name: 'Thread',
		owner: 'Thread Group, Inc.',
		notice: 'Thread is a trademark of Thread Group, Inc.',
		policy: 'https://www.threadgroup.org/Terms-Of-Use',
	},
	zwave: {
		name: 'Z-Wave®',
		owner: 'Z-Wave Alliance, Inc.',
		notice: 'Z-Wave® is a registered trademark of Z-Wave Alliance, Inc.',
		policy: 'https://z-wavealliance.org/terms-of-use/',
	},
	lorawan: {
		name: 'LoRaWAN®',
		owner: 'LoRa Alliance',
		notice: 'LoRaWAN® is a registered trademark of the LoRa Alliance®.',
		policy: 'https://lora-alliance.org/brand-guidelines/',
	},
	lora: {
		name: 'LoRa®',
		owner: 'Semtech Corporation',
		notice: 'LoRa® is a registered trademark of Semtech Corporation.',
		policy: 'https://semtech.com/company/trademarks-list',
	},
	modbus: {
		name: 'Modbus',
		owner: 'its owner',
		notice: 'Modbus is a trademark of its owner; the protocol is published by the Modbus Organization.',
		policy: 'https://www.modbus.org/legal',
	},
	openwrt: {
		name: 'OpenWrt',
		owner: 'the OpenWrt project',
		notice: 'OpenWrt is the name of the OpenWrt project. These projects are not affiliated with or endorsed by it.',
		policy: 'https://openwrt.org/trademark_policy',
	},
	npm: {
		name: 'npm',
		owner: 'npm, Inc.',
		notice: 'npm is a registered trademark of npm, Inc.',
		policy: 'https://docs.npmjs.com/policies/logos-and-usage',
	},
	crates: {
		name: 'crates.io',
		owner: 'Rust Foundation',
		notice: 'crates.io is the Rust community’s package registry; Cargo is a trademark of the Rust Foundation.',
		policy: 'https://rustfoundation.org/policy/rust-trademark-policy/',
	},
	pypi: {
		name: 'PyPI',
		owner: 'Python Software Foundation',
		notice: 'PyPI is a registered trademark of the Python Software Foundation.',
		policy: 'https://pypi.org/trademarks/',
	},
	perses: {
		name: 'Perses™',
		owner: 'The Linux Foundation',
		notice: 'Perses™ is a trademark of The Linux Foundation.',
		policy: 'https://www.linuxfoundation.org/trademark-usage',
	},
	typescript: {
		name: 'TypeScript',
		owner: 'Microsoft',
		notice: 'TypeScript is developed by Microsoft.',
		policy: 'https://www.typescriptlang.org/branding/',
	},
	javascript: {
		name: 'JavaScript',
		owner: 'Oracle Corporation',
		notice: 'JavaScript is a trademark of Oracle Corporation.',
	},
	webassembly: {
		name: 'WebAssembly',
		owner: 'W3C',
		notice: 'WebAssembly is a W3C standard.',
		policy: 'https://webassembly.org/',
	},
	mqtt: {
		name: 'MQTT',
		owner: 'OASIS',
		notice: 'MQTT is an OASIS standard.',
		policy: 'https://mqtt.org/',
	},
	// Not trademarks: listed so projects can name them like the rest.
	c: { name: 'C' },
	shell: { name: 'Shell' },
};

/** The type the sites are set in, credited on the same page. */
export const fonts = [
	{
		name: 'IBM Plex®',
		notice: 'Type is IBM Plex® Sans and IBM Plex® Mono by IBM, under the SIL Open Font License 1.1.',
		url: 'https://github.com/IBM/plex',
	},
];
