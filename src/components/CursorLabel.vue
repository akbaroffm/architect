<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * A soft circular label ("Ko‘rish") that follows the pointer over any element
 * with a `data-cursor` attribute. Desktop (fine pointer) only; the native
 * cursor stays visible.
 */
const enabled = ref(false)
const label = ref('')
const active = ref(false)
const el = ref(null)

let x = 0
let y = 0
let cx = 0
let cy = 0
let raf = 0

function onMove(e) {
  x = e.clientX
  y = e.clientY
  const target = e.target.closest?.('[data-cursor]')
  active.value = !!target
  if (target) label.value = target.dataset.cursor
}
function onLeave() {
  active.value = false
}
function loop() {
  cx += (x - cx) * 0.18
  cy += (y - cy) * 0.18
  if (el.value) el.value.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  enabled.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!enabled.value) return
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  // Hide while scrolling so it doesn't linger over the wrong element.
  window.addEventListener('scroll', onLeave, { passive: true })
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerleave', onLeave)
  window.removeEventListener('scroll', onLeave)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div v-if="enabled" ref="el" class="pointer-events-none fixed top-0 left-0 z-80" aria-hidden="true">
    <div
      class="-mt-12 -ml-12 flex h-24 w-24 items-center justify-center rounded-full bg-ivory/90 text-[0.62rem] font-medium tracking-[0.25em] text-charcoal uppercase shadow-xl backdrop-blur-sm transition-[scale,opacity] duration-500 ease-luxe"
      :class="active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
    >
      {{ label }}
    </div>
  </div>
</template>
