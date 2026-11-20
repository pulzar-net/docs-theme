---
title: Getting started
description: Add the theme to a Starlight site.
---

Install the theme by its release tag, next to Astro and Starlight:

```sh
npm install "@pulzar-net/docs-theme@git+https://github.com/pulzar-net/docs-theme.git#v0.1.1"
```

Then add its plugins to Starlight:

```js title="astro.config.mjs"
import starlight from '@astrojs/starlight';
import { pulzarPlugins } from '@pulzar-net/docs-theme';

starlight({
  title: 'zigbee-bridge',
  plugins: pulzarPlugins({ project: 'zigbee-bridge' }),
});
```

:::note
Every internal link is checked when the site builds. A broken link fails the build.
:::

| Key | Default | What |
|---|---|---|
| `project` | required | the project's id, as in the project switcher |
| `license` | `MIT` | the license the footer names |
| `validateLinks` | `true` | fail the build on a broken internal link |

### Headings in the display face

Body text is Inter; headings are Outfit, as in the console.

### Rust that rustdoc compiles

```rust,no_run
fn main() {
    println!("highlighted as Rust");
}
```
