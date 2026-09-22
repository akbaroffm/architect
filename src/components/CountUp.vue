<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { whenReady } from '../composables/appState'

const props = defineProps({
  to: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
})

const el = ref(null)
const value = ref(0)
let observer
let cancel

function run() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return (value.value = props.to)
  const start = performance.now()
  const step = (now) => {
    const t = Math.min((now - start) / props.duration, 1)
    value.value = Math.round(props.to * (1 - Math.pow(1 - t, 4)))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        run()
        observer.disconnect()
      }
    },
    { threshold: 0.6 },
  )
  cancel = whenReady(() => el.value && observer.observe(el.value))
})
onBeforeUnmount(() => {
  cancel?.()
  observer?.disconnect()
})
</script>

<template>
  <span ref="el" class="tabular-nums">{{ value }}</span>
</template>
