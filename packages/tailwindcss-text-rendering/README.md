# tailwindcss-text-rendering

Text-rendering utilities for Tailwind CSS v4. Plain CSS, no JavaScript.

Live demo: <https://type.avolkov.dev>

```sh
npm install tailwindcss-text-rendering
```

```css
@import "tailwindcss";
@import "tailwindcss-text-rendering";
```

```html
<h1 class="rendering-precision">…</h1>
```

| Class | Value |
| --- | --- |
| `rendering-auto` | `auto` |
| `rendering-speed` | `optimizeSpeed` |
| `rendering-legibility` | `optimizeLegibility` |
| `rendering-precision` | `geometricPrecision` |
| `rendering-[…]` | `any value` |

Variants work as usual: `hover:`, `md:`, `print:`, `first-letter:`.

**Browser support:** Chrome, Edge and Safari. Firefox supports it with platform differences. Kerning and ligatures are on by default in modern browsers, so `rendering-legibility` rarely changes much now; `rendering-precision` still matters for text that is scaled or animated.

**Upgrading from 1.x:** 2.0 is for Tailwind v4 only. Replace `plugins: [require("tailwindcss-text-rendering")]` in `tailwind.config.js` with the `@import` line above. The class names are unchanged. On Tailwind v3, stay on `tailwindcss-text-rendering@1`.

Part of [tailwind-typography-extras](https://github.com/slimcandy/tailwind-typography-extras). MIT licence.
