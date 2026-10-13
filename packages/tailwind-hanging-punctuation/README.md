# tailwind-hanging-punctuation

Hanging-punctuation utilities for Tailwind CSS v4. Plain CSS, no JavaScript.

Live demo: <https://type.avolkov.dev>

```sh
npm install tailwind-hanging-punctuation
```

```css
@import "tailwindcss";
@import "tailwind-hanging-punctuation";
```

```html
<blockquote class="hanging-punctuation-first">“Quotes hang outside the text block.”</blockquote>
```

| Class | Value |
| --- | --- |
| `hanging-punctuation-none` | `none` |
| `hanging-punctuation-first` | `first` |
| `hanging-punctuation-last` | `last` |
| `hanging-punctuation-force-end` | `force-end` |
| `hanging-punctuation-allow-end` | `allow-end` |
| `hanging-punctuation-book` | `first last force-end` |
| `hanging-punctuation-[…]` | any value, e.g. `[first_allow-end]` |

Variants work as usual: `hover:`, `md:`, `print:`, `first-letter:`.

**Browser support:** Safari only (macOS and iOS). Other browsers ignore it, so use it as a progressive enhancement: the text still reads fine without it.

**Upgrading from 1.x:** 2.0 is for Tailwind v4 only. Replace `plugins: [require("tailwind-hanging-punctuation")]` in `tailwind.config.js` with the `@import` line above. The camelCase classes are renamed: `hanging-punctuation-forceEnd` → `hanging-punctuation-force-end`, `hanging-punctuation-allowEnd` → `hanging-punctuation-allow-end`. On Tailwind v3, stay on `tailwind-hanging-punctuation@1`.

Part of [tailwind-typography-extras](https://github.com/slimcandy/tailwind-typography-extras). MIT licence.
