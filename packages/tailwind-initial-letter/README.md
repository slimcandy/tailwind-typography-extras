# tailwind-initial-letter

Initial-letter utilities for Tailwind CSS v4: drop caps and raised caps. Plain CSS, no JavaScript.

Live demo: <https://type.avolkov.dev>

```sh
npm install tailwind-initial-letter
```

```css
@import "tailwindcss";
@import "tailwind-initial-letter";
```

```html
<p class="first-letter:initial-letter-3">Once upon a time…</p>
```

| Class | Value |
| --- | --- |
| `initial-letter-normal` | `normal` |
| `initial-letter-initial` | `initial` |
| `initial-letter-<number>` | `initial-letter-3`, `initial-letter-1.5` |
| `initial-letter-[…]` | size and sink, e.g. `initial-letter-[3_2]` |

Variants work as usual: `hover:`, `md:`, `print:`, `first-letter:`.

**Browser support:** Safari (with the `-webkit-` prefix, included) and Chrome/Edge 110+. Firefox ignores it and shows a normal first letter.

**Upgrading from 1.x:** 2.0 is for Tailwind v4 only. Replace `plugins: [require("tailwind-initial-letter")]` in `tailwind.config.js` with the `@import` line above. The class names are unchanged. Any number now works (`initial-letter-5`), as do arbitrary values for size + sink. On Tailwind v3, stay on `tailwind-initial-letter@1`.

Part of [tailwind-typography-extras](https://github.com/slimcandy/tailwind-typography-extras). MIT licence.
