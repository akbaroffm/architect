import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Moves `target` vertically as its `container` crosses the viewport.
 * One shared scroll listener drives every instance.
 *
 * @param {import('vue').Ref<HTMLElement>} container
 * @param {import('vue').Ref<HTMLElement>} target
 * @param {number} strength  max shift in % of the container height (the target
 *                           must overhang the container by at least that much)
 */
const items = new Set()
let raf = 0

function update() {
  raf = 0
  const vh = window.innerHeight
  for (const { container, target, strength } of items) {
    const box = container.value
    const el = target.value
    if (!box || !el) continue
    const r = box.getBoundingClientRect()
    if (r.bottom < -100 || r.top > vh + 100) continue
    // -1 when entering at the bottom, +1 when leaving at the top
    const p = (vh - r.top) / (vh + r.height) * 2 - 1
    const shift = Math.max(-1, Math.min(1, p)) * strength * r.height / 100
    el.style.transform = `translate3d(0, ${(-shift).toFixed(1)}px, 0)`
  }
}
const schedule = () => raf || (raf = requestAnimationFrame(update))

export function useParallax(container, target, strength = 8) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const item = { container, target, strength }
  onMounted(() => {
    if (items.size === 0) {
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule, { passive: true })
    }
    items.add(item)
    schedule()
  })
  onBeforeUnmount(() => {
    items.delete(item)
    if (items.size === 0) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  })
}
