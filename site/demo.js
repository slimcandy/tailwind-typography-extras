// Toggle groups: each button swaps one utility class on the demo's targets.
const hangingSupported = CSS.supports('hanging-punctuation', 'first')

for (const demo of document.querySelectorAll('[data-demo]')) {
  const buttons = [...demo.querySelectorAll('button[data-class]')]
  const targets = demo.querySelectorAll('[data-target]')
  const current = demo.querySelector('[data-current]')
  const simulate = demo.dataset.simulate === 'hanging-punctuation' && !hangingSupported

  function select(button) {
    for (const target of targets) {
      for (const b of buttons) target.classList.remove(b.dataset.class)
      target.classList.add(button.dataset.class)
      if (simulate) target.classList.toggle('simulate-hanging', /-(first|book)$/.test(button.dataset.class))
    }
    for (const b of buttons) b.setAttribute('aria-pressed', String(b === button))
    current.textContent = button.dataset.class
  }

  for (const button of buttons) button.addEventListener('click', () => select(button))
  select(buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ?? buttons[0])
}

// Browser support notes.
for (const note of document.querySelectorAll('[data-support]')) {
  const supported = [note.dataset.support, note.dataset.supportAlt].filter(Boolean).some((d) => CSS.supports(`(${d})`))
  note.textContent = supported ? note.dataset.supported : note.dataset.unsupported
}
