<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Large statement text whose words light up one by one as it scrolls
 * through the viewport.
 */
const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'p' },
})

const el = ref(null)
const words = props.text.split(' ')
const progress = ref(0)
let raf = 0

function update() {
  raf = 0
  const r = el.value?.getBoundingClientRect()
  if (!r) return
  const vh = window.innerHeight
  // 0 when the top reaches 85% of the viewport, 1 when the bottom reaches 45%.
  const start = vh * 0.85
  const end = vh * 0.45
  const total = start - end + r.height
  progress.value = Math.min(1, Math.max(0, (start - r.top) / total))
}
const onScroll = () => raf || (raf = requestAnimationFrame(update))

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return (progress.value = 1)
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const opacity = (i) => {
  const p = progress.value * words.length
  return Math.min(1, Math.max(0.14, p - i + 0.4))
}
</script>

<template>
  <component :is="tag" ref="el" :aria-label="text">
    <span v-for="(w, i) in words" :key="i" aria-hidden="true" class="transition-opacity duration-300" :style="{ opacity: opacity(i) }"
      >{{ w }}{{ i < words.length - 1 ? ' ' : '' }}</span
    >
  </component>
</template>
