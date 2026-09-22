<script setup>
import { onMounted, ref } from 'vue'
import { designer } from '../data/site'
import { featuredProjects } from '../data/projects'
import { setReady } from '../composables/appState'
import { lockScroll, unlockScroll } from '../composables/useScrollLock'

/**
 * First-visit intro: the name rises letter by letter while a counter runs
 * to 100, then the panel lifts like a curtain. Shown once per session.
 */
const KEY = 'mr-intro-seen'
const seen = (() => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
})()
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const visible = ref(!seen && !reduced)
const leaving = ref(false)
const count = ref(0)
const letters = designer.name.split('')

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })
}

function runCounter(duration) {
  return new Promise((resolve) => {
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      count.value = Math.round(100 * (1 - Math.pow(1 - t, 3)))
      if (t < 1) requestAnimationFrame(tick)
      else resolve()
    }
    requestAnimationFrame(tick)
  })
}

onMounted(async () => {
  if (!visible.value) return setReady(true)
  lockScroll()
  const assets = Promise.all([
    document.fonts?.ready,
    location.pathname === '/' ? preload(featuredProjects[0].cover) : null,
  ])
  // Never hold visitors longer than ~4s, even on a slow connection.
  const timeout = new Promise((r) => setTimeout(r, 4000))
  await Promise.all([runCounter(2000), Promise.race([assets, timeout])])

  leaving.value = true
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* private mode */
  }
  setTimeout(() => {
    unlockScroll()
    setReady(true)
  }, 450)
  setTimeout(() => (visible.value = false), 1400)
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-100 flex flex-col bg-charcoal text-ivory transition-transform duration-[1.2s] ease-curtain"
    :class="leaving ? '-translate-y-full' : 'translate-y-0'"
    aria-hidden="true"
  >
    <div class="flex flex-1 flex-col items-center justify-center px-6 transition-opacity duration-500" :class="leaving && 'opacity-0'">
      <p class="mask-line text-center font-serif whitespace-nowrap text-[clamp(2.4rem,9vw,7.5rem)] leading-none">
        <span
          v-for="(ch, i) in letters"
          :key="i"
          class="inline-block animate-rise"
          :class="ch === ' ' && 'w-[0.28em]'"
          :style="{ animationDelay: `${150 + i * 45}ms` }"
          >{{ ch }}</span
        >
      </p>
      <p class="mt-6 animate-fade text-[0.65rem] tracking-[0.45em] text-taupe uppercase [animation-delay:900ms]">
        {{ designer.title }}
      </p>
    </div>

    <div class="container-x flex items-end justify-between pb-8 transition-opacity duration-500" :class="leaving && 'opacity-0'">
      <p class="text-[0.65rem] tracking-[0.3em] text-stone/60 uppercase">{{ designer.studio }}</p>
      <p class="font-serif text-6xl leading-none tabular-nums sm:text-8xl">
        {{ String(count).padStart(3, '0') }}
      </p>
    </div>
    <div class="h-px w-full bg-ivory/10">
      <div class="h-full origin-left bg-taupe" :style="{ transform: `scaleX(${count / 100})` }" />
    </div>
  </div>
</template>
