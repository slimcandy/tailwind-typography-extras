# tailwind-font-variant-caps

Font-variant-caps utilities for Tailwind CSS v4: small caps, petite caps, titling caps. Plain CSS, no JavaScript.

Live demo: <https://type.avolkov.dev>

```sh
npm install tailwind-font-variant-caps
```

```css
@import "tailwindcss";
@import "tailwind-font-variant-caps";
```

```html
<p>Founded by the <abbr class="font-variant-caps-all">NATO</abbr> working group…</p>
```

| Class | Value |
| --- | --- |
| `font-variant-caps-normal` | `normal` |
| `font-variant-caps-small` | `small-caps` |
| `font-variant-caps-all` | `all-small-caps` |
| `font-variant-caps-petite` | `petite-caps` |
| `font-variant-caps-all-petite` | `all-petite-caps` |
| `font-variant-caps-unicase` | `unicase` |
| `font-variant-caps-titling` | `titling-caps` |

Variants work as usual: `hover:`, `md:`, `print:`, `first-letter:`.

**Browser support:** All modern browsers. Real small caps need a font that has them (OpenType `smcp`, `c2sc`, `pcap`, `titl`); otherwise the browser fakes them by shrinking capitals.

**Upgrading from 1.x:** 2.0 is for Tailwind v4 only. Replace `plugins: [require("tailwind-font-variant-caps")]` in `tailwind.config.js` with the `@import` line above. The class names are unchanged. New: `font-variant-caps-all-petite`. On Tailwind v3, stay on `tailwind-font-variant-caps@1`.

Part of [tailwind-typography-extras](https://github.com/slimcandy/tailwind-typography-extras). MIT licence.
