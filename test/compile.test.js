// The judge: every class is compiled by the real Tailwind v4 compiler,
// with each package loaded the way users load it: `@import "<package>"`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { compile } from '@tailwindcss/node'

async function build(pkg, candidates) {
  const input = `@import "tailwindcss"; @import "${pkg}";`
  const compiler = await compile(input, { base: import.meta.dirname, onDependency() {} })
  return compiler.build(candidates)
}

// Returns the declarations of the rule for `selector`, e.g. { 'text-rendering': 'auto' }.
function declarations(css, selector) {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) return null
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start))
  return Object.fromEntries(
    body
      .split(';')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => [line.slice(0, line.indexOf(':')).trim(), line.slice(line.indexOf(':') + 1).trim()]),
  )
}

const cases = {
  'tailwindcss-text-rendering': [
    ['rendering-auto', '.rendering-auto', { 'text-rendering': 'auto' }],
    ['rendering-speed', '.rendering-speed', { 'text-rendering': 'optimizeSpeed' }],
    ['rendering-legibility', '.rendering-legibility', { 'text-rendering': 'optimizeLegibility' }],
    ['rendering-precision', '.rendering-precision', { 'text-rendering': 'geometricPrecision' }],
    ['rendering-[geometricPrecision]', '.rendering-\\[geometricPrecision\\]', { 'text-rendering': 'geometricPrecision' }],
  ],
  'tailwind-hanging-punctuation': [
    ['hanging-punctuation-none', '.hanging-punctuation-none', { 'hanging-punctuation': 'none' }],
    ['hanging-punctuation-first', '.hanging-punctuation-first', { 'hanging-punctuation': 'first' }],
    ['hanging-punctuation-last', '.hanging-punctuation-last', { 'hanging-punctuation': 'last' }],
    ['hanging-punctuation-force-end', '.hanging-punctuation-force-end', { 'hanging-punctuation': 'force-end' }],
    ['hanging-punctuation-allow-end', '.hanging-punctuation-allow-end', { 'hanging-punctuation': 'allow-end' }],
    ['hanging-punctuation-book', '.hanging-punctuation-book', { 'hanging-punctuation': 'first last force-end' }],
    ['hanging-punctuation-[first_allow-end]', '.hanging-punctuation-\\[first_allow-end\\]', { 'hanging-punctuation': 'first allow-end' }],
  ],
  'tailwind-font-variant-caps': [
    ['font-variant-caps-normal', '.font-variant-caps-normal', { 'font-variant-caps': 'normal' }],
    ['font-variant-caps-small', '.font-variant-caps-small', { 'font-variant-caps': 'small-caps' }],
    ['font-variant-caps-all', '.font-variant-caps-all', { 'font-variant-caps': 'all-small-caps' }],
    ['font-variant-caps-petite', '.font-variant-caps-petite', { 'font-variant-caps': 'petite-caps' }],
    ['font-variant-caps-all-petite', '.font-variant-caps-all-petite', { 'font-variant-caps': 'all-petite-caps' }],
    ['font-variant-caps-unicase', '.font-variant-caps-unicase', { 'font-variant-caps': 'unicase' }],
    ['font-variant-caps-titling', '.font-variant-caps-titling', { 'font-variant-caps': 'titling-caps' }],
  ],
  'tailwind-initial-letter': [
    ['initial-letter-normal', '.initial-letter-normal', { '-webkit-initial-letter': 'normal', 'initial-letter': 'normal' }],
    ['initial-letter-initial', '.initial-letter-initial', { '-webkit-initial-letter': 'initial', 'initial-letter': 'initial' }],
    ['initial-letter-3', '.initial-letter-3', { '-webkit-initial-letter': '3', 'initial-letter': '3' }],
    ['initial-letter-1.5', '.initial-letter-1\\.5', { '-webkit-initial-letter': '1.5', 'initial-letter': '1.5' }],
    ['initial-letter-[3_2]', '.initial-letter-\\[3_2\\]', { '-webkit-initial-letter': '3 2', 'initial-letter': '3 2' }],
  ],
}

for (const [pkg, rows] of Object.entries(cases)) {
  test(pkg, async (t) => {
    const css = await build(pkg, rows.map(([candidate]) => candidate))
    for (const [candidate, selector, expected] of rows) {
      await t.test(candidate, () => assert.deepEqual(declarations(css, selector), expected))
    }
  })
}

test('variants work on @utility rules', async () => {
  const css = await build('tailwindcss-text-rendering', ['hover:rendering-precision', 'md:rendering-auto'])
  assert.match(css, /\.hover\\:rendering-precision:hover\s*{\s*text-rendering: geometricPrecision;/)
  assert.match(css, /@media \(width >= 48rem\)\s*{\s*\.md\\:rendering-auto\s*{\s*text-rendering: auto;/)
})

test('first-letter: variant makes a drop cap', async () => {
  const css = await build('tailwind-initial-letter', ['first-letter:initial-letter-3'])
  assert.match(css, /\.first-letter\\:initial-letter-3::first-letter\s*{\s*-webkit-initial-letter: 3;\s*initial-letter: 3;/)
})

test('unknown values produce no CSS', async () => {
  const css = await build('tailwindcss-text-rendering', ['rendering-nope', 'hanging-punctuation-nope'])
  assert.doesNotMatch(css, /rendering-nope|hanging-punctuation-nope/)
})
