<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Horizontally scrollable row (category tabs etc.).
 * - native touch swipe on phones (Lenis is told to leave it alone)
 * - drag-to-scroll with the mouse
 * - fading edges that hint there is more content
 * - the active item (`.is-active`) is scrolled into view on mount
 */
const scroller = ref(null)
const atStart = ref(true)
const atEnd = ref(true)

function update() {
  const el = scroller.value
  if (!el) return
  atStart.value = el.scrollLeft <= 2
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
}

// Mouse drag (touch uses native scrolling)
let dragging = false
let moved = false
let startX = 0
let startLeft = 0
function onPointerDown(e) {
  if (e.pointerType !== 'mouse' || e.button !== 0) return
  dragging = true
  moved = false
  startX = e.clientX
  startLeft = scroller.value.scrollLeft
}
function onPointerMove(e) {
  if (!dragging) return
  const dx = e.clientX - startX
  if (Math.abs(dx) > 4) moved = true
  scroller.value.scrollLeft = startLeft - dx
}
function onPointerUp() {
  dragging = false
}
// Swallow the click that ends a drag so it doesn't navigate.
function onClickCapture(e) {
  if (moved) {
    e.preventDefault()
    e.stopPropagation()
    moved = false
  }
}

let ro
onMounted(async () => {
  await nextTick()
  const el = scroller.value
  const active = el.querySelector('.is-active')
  if (active) el.scrollLeft = active.offsetLeft - el.clientWidth / 2 + active.offsetWidth / 2
  update()
  ro = new ResizeObserver(update)
  ro.observe(el)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
})
onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div class="relative">
    <div
      ref="scroller"
      class="scroll-tabs overflow-x-auto overscroll-x-contain select-none"
      data-lenis-prevent
      @scroll.passive="update"
      @pointerdown="onPointerDown"
      @click.capture="onClickCapture"
      @dragstart.prevent
    >
      <slot />
    </div>
    <!-- Edge fades -->
    <span
      class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-ivory to-transparent transition-opacity duration-300"
      :class="atStart ? 'opacity-0' : 'opacity-100'"
      aria-hidden="true"
    />
    <span
      class="pointer-events-none absolute inset-y-0 right-0 w-14 bg-linear-to-l from-ivory to-transparent transition-opacity duration-300"
      :class="atEnd ? 'opacity-0' : 'opacity-100'"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.scroll-tabs {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  cursor: grab;
}
.scroll-tabs:active {
  cursor: grabbing;
}
.scroll-tabs::-webkit-scrollbar {
  display: none;
}
</style>
