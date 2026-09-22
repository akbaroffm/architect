import { reactive, ref } from 'vue'

/**
 * `ready` — true once the preloader / page curtain has uncovered the page.
 * Intro animations and scroll reveals wait for it, so they play in view
 * instead of behind the curtain.
 */
export const ready = ref(false)
const waiting = new Set()

export function whenReady(cb) {
  if (ready.value) cb()
  else waiting.add(cb)
  return () => waiting.delete(cb)
}

export function setReady(value) {
  ready.value = value
  if (value) {
    for (const cb of waiting) cb()
    waiting.clear()
  }
}

/* ── Page transition curtain ─────────────────────────────────── */
export const curtain = reactive({ phase: 'idle', label: '' }) // idle | in | out

export const CURTAIN_IN = 850
export const CURTAIN_OUT = 1000
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export async function coverPage(label) {
  if (reduced()) return
  curtain.label = label
  curtain.phase = 'in'
  await wait(CURTAIN_IN)
}

export async function uncoverPage() {
  if (curtain.phase !== 'in') return
  // Let the destination title sit for a beat before lifting.
  await wait(320)
  curtain.phase = 'out'
  await wait(CURTAIN_OUT)
  curtain.phase = 'idle'
}
