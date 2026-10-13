// Hanging punctuation: which marks should hang for each value. `allow-end` hangs
// nothing here, because every line of the specimen fits without hanging.
const HANGS = {
  none: [],
  first: ['first'],
  last: ['last'],
  'force-end': ['end'],
  'allow-end': [],
  book: ['first', 'last', 'end'],
}

// Browsers accept every value but may not draw it (Safari 27 draws only `first`).
// So measure the letter next to each mark: if it doesn't touch the edge, the mark
// isn't hanging, and the page simulates it (see .sim-* in input.css) and says so.
function letterRect(mark, side) {
  const walker = document.createTreeWalker(mark.parentElement, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  const i = nodes.indexOf(mark.firstChild)
  const node = side === 'after' ? nodes[i + 1] : nodes[i - 1]
  const range = document.createRange()
  const at = side === 'after' ? 0 : node.length - 1
  range.setStart(node, at)
  range.setEnd(node, at + 1)
  return range.getBoundingClientRect()
}

function isHanging(block, kind) {
  const edge = block.getBoundingClientRect()
  const marks = [...block.querySelectorAll(`[data-hang="${kind}"]`)]
  if (kind === 'first') return Math.abs(letterRect(marks[0], 'after').left - edge.left) < 1
  return marks
    .filter((mark) => kind === 'last' || mark.hasAttribute('data-line-end'))
    .some((mark) => Math.abs(letterRect(mark, 'before').right - edge.right) < 1)
}

// A comma or full stop only hangs when it ends a line: the next character is lower.
function markLineEnds(block) {
  const chars = []
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) {
    const node = walker.currentNode
    for (let i = 0; i < node.length; i++) if (node.data[i].trim()) chars.push({ node, i })
  }
  const top = ({ node, i }) => {
    const range = document.createRange()
    range.setStart(node, i)
    range.setEnd(node, i + 1)
    return range.getBoundingClientRect().top
  }
  for (const mark of block.querySelectorAll('[data-hang="end"]')) {
    const at = chars.findIndex((c) => c.node === mark.firstChild)
    const next = chars[at + 1]
    mark.toggleAttribute('data-line-end', !!next && top(next) > top(chars[at]) + 4)
  }
}

function showHanging(demo, value) {
  const block = demo.querySelector('[data-target]')
  block.classList.remove('sim-first', 'sim-end', 'sim-last')
  markLineEnds(block)

  const missing = HANGS[value].filter((kind) => !isHanging(block, kind))
  // Real and simulated hanging don't mix well in WebKit, so if anything is missing,
  // switch the real property off and simulate the whole value.
  const simulated = missing.length ? HANGS[value] : []
  if (simulated.length) {
    block.className = block.className.replace(/hanging-punctuation-\S+/, 'hanging-punctuation-none')
    markLineEnds(block)
  }
  for (const kind of simulated) block.classList.add(`sim-${kind}`)

  const note = demo.querySelector('[data-render-note]')
  if (!HANGS[value].length) note.textContent = 'Nothing hangs with this value.'
  else if (!simulated.length) note.textContent = 'Drawn by your browser.'
  else if (missing.length < HANGS[value].length) note.textContent = 'Simulated: your browser draws only the opening quote of this value, so the whole value is simulated.'
  else if (simulated.includes('first')) note.textContent = 'Simulated: only Safari draws hanging punctuation today.'
  else note.textContent = 'Simulated: browsers accept this value but don’t draw it yet (tested in Safari 27).'
}

// Toggle groups: each button swaps one utility class on the demo's targets.
for (const demo of document.querySelectorAll('[data-demo]')) {
  const buttons = [...demo.querySelectorAll('button[data-class]')]
  const targets = demo.querySelectorAll('[data-target]')
  const current = demo.querySelector('[data-current]')

  function select(button) {
    for (const target of targets) {
      for (const b of buttons) target.classList.remove(b.dataset.class)
      target.classList.add(button.dataset.class)
    }
    for (const b of buttons) b.setAttribute('aria-pressed', String(b === button))
    current.textContent = button.dataset.class
    if ('hanging' in demo.dataset) showHanging(demo, button.dataset.class.replace('hanging-punctuation-', ''))
  }

  for (const button of buttons) button.addEventListener('click', () => select(button))
  select(buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ?? buttons[0])
}

// Browser support notes.
for (const note of document.querySelectorAll('[data-support]')) {
  const supported = [note.dataset.support, note.dataset.supportAlt].filter(Boolean).some((d) => CSS.supports(`(${d})`))
  note.textContent = supported ? note.dataset.supported : note.dataset.unsupported
}
