import { whenReady } from '../composables/appState'

/**
 * v-reveal — fades/slides an element in when it scrolls into view.
 *
 *   v-reveal                      → fade up
 *   v-reveal="150"                → fade up after 150ms
 *   v-reveal="{ delay: 150, variant: 'img' }"
 *
 * Variants: 'up' (default), 'left', 'right', 'img' (clip-path wipe on the
 * first child, so wrap images in it), 'line' (draws horizontally on desktop,
 * vertically below lg), 'fade' (opacity only).
 *
 * Observation starts only after the preloader / page curtain has lifted.
 */
const variants = {
  up: ['reveal'],
  left: ['reveal', 'reveal-left'],
  right: ['reveal', 'reveal-right'],
  fade: ['reveal', 'reveal-fade'],
  img: ['reveal-img'],
  line: ['reveal-line'],
}

let observer

// Wait (max 2.5s) for the images inside `el` so a wipe never reveals an empty frame.
function imagesReady(el) {
  const pending = [...el.querySelectorAll('img')].filter((img) => !img.complete)
  if (!pending.length) return Promise.resolve()
  const loads = pending.map(
    (img) =>
      new Promise((r) => {
        img.addEventListener('load', r, { once: true })
        img.addEventListener('error', r, { once: true })
      }),
  )
  return Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, 2500))])
}

function show(el) {
  if (el.classList.contains('reveal-img')) imagesReady(el).then(() => el.classList.add('is-visible'))
  else el.classList.add('is-visible')
}

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target)
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

export default {
  mounted(el, { value }) {
    if (!('IntersectionObserver' in window)) return
    const opts = typeof value === 'number' ? { delay: value } : value || {}
    el.classList.add(...(variants[opts.variant] || variants.up))
    if (opts.delay) el.style.setProperty('--reveal-delay', `${opts.delay}ms`)
    el._revealCancel = whenReady(() => getObserver().observe(el))
  },
  unmounted(el) {
    el._revealCancel?.()
    observer?.unobserve(el)
  },
}
