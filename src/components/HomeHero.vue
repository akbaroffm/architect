<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { featuredProjects, getCategory } from '../data/projects'
import { designer } from '../data/site'
import { ready } from '../composables/appState'
import BaseIcon from './BaseIcon.vue'

const INTERVAL = 6500
const slides = featuredProjects
const current = ref(0)
const previous = ref(-1)
// Bumped each time a slide becomes active, to restart its Ken Burns zoom.
const runs = ref(slides.map(() => 0))
const paused = ref(false)
const slide = computed(() => slides[current.value])
let timer

function go(i) {
  const next = (i + slides.length) % slides.length
  if (next === current.value) return restart()
  previous.value = current.value
  runs.value[next]++
  current.value = next
  restart()
}
function restart() {
  clearInterval(timer)
  timer = setInterval(() => {
    if (!paused.value && !document.hidden) go(current.value + 1)
  }, INTERVAL)
}

// Content drifts up and fades as the hero scrolls away.
const offset = ref(0)
let raf = 0
function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const y = window.scrollY
    if (y < window.innerHeight * 1.2) offset.value = y
  })
}

onMounted(() => {
  restart()
  window.addEventListener('scroll', onScroll, { passive: true })
  // Warm the cache for the next slides.
  slides.slice(1).forEach((s) => (new Image().src = s.cover))
})
onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('scroll', onScroll)
})

let touchX = 0
const onTouchStart = (e) => (touchX = e.touches[0].clientX)
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 60) go(current.value + (dx < 0 ? 1 : -1))
}
</script>

<template>
  <section
    class="relative flex min-h-svh flex-col overflow-hidden bg-charcoal text-ivory"
    @touchstart.passive="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- Slides -->
    <div class="absolute inset-0" :style="{ transform: `translate3d(0, ${offset * 0.3}px, 0)` }">
      <div
        v-for="(s, i) in slides"
        :key="s.slug"
        class="absolute inset-0 transition-opacity duration-[1.6s] ease-luxe"
        :class="i === current ? 'z-10 opacity-100' : i === previous ? 'z-5 opacity-0' : 'z-0 opacity-0'"
      >
        <!-- The outgoing slide keeps its zoom while fading, so nothing jumps. -->
        <img
          :key="`${s.slug}-${runs[i]}`"
          :src="s.cover"
          :alt="s.title"
          class="h-full w-full object-cover will-change-transform"
          :class="(i === current || i === previous) && 'animate-kenburns'"
          :fetchpriority="i === 0 ? 'high' : 'low'"
          decoding="async"
        />
      </div>
    </div>
    <div class="absolute inset-0 z-10 bg-linear-to-t from-charcoal/90 via-charcoal/25 to-charcoal/45" />

    <!-- Main content -->
    <div
      class="relative z-20 flex flex-1 flex-col justify-end pt-28"
      :style="{ transform: `translate3d(0, ${offset * -0.15}px, 0)`, opacity: 1 - offset / 700 }"
    >
      <div class="container-x pb-8 sm:pb-14 lg:pb-16">
        <p class="mb-5 text-[0.62rem] font-medium tracking-[0.35em] text-sand uppercase sm:mb-7 sm:text-[0.68rem] sm:tracking-[0.4em]" :class="ready ? 'animate-fade [animation-delay:200ms]' : 'opacity-0'">
          <span class="hidden sm:inline">{{ designer.name }} — </span>{{ designer.title }}
        </p>

        <h1 class="font-serif text-[clamp(3rem,min(11.5vw,19vh),11.5rem)] leading-[0.9] text-ivory">
          <span class="mask-line">
            <span class="block" :class="ready ? 'animate-rise [animation-delay:300ms]' : 'opacity-0'">Nafosat</span>
          </span>
          <span class="mask-line">
            <span class="block italic sm:pl-[1.1em]" :class="ready ? 'animate-rise [animation-delay:450ms]' : 'opacity-0'">har bir detalda</span>
          </span>
        </h1>

        <div class="mt-6 grid gap-8 sm:mt-10 sm:gap-10 lg:mt-12 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-6" :class="ready ? 'animate-fade [animation-delay:800ms]' : 'opacity-0'">
            <p class="max-w-md text-base leading-relaxed text-ivory/85 sm:text-lg">{{ designer.tagline }}</p>
            <div class="mt-6 flex gap-3 sm:mt-8">
              <RouterLink to="/projects" class="btn-light group max-sm:px-5 max-sm:py-3.5">
                Loyihalar
                <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
              </RouterLink>
              <RouterLink to="/contact" class="btn-outline-light max-sm:px-5 max-sm:py-3.5"><span>Konsultatsiya<span class="hidden sm:inline"> olish</span></span></RouterLink>
            </div>
          </div>

          <!-- Current slide card -->
          <div
            class="lg:col-span-5 lg:col-start-8"
            :class="ready ? 'animate-fade [animation-delay:1000ms]' : 'opacity-0'"
            @mouseenter="paused = true"
            @mouseleave="paused = false"
          >
            <div class="flex items-end justify-between gap-4 border-t border-ivory/25 pt-4 sm:gap-6 sm:pt-5">
              <div class="min-w-0">
                <p class="text-[0.62rem] tracking-[0.3em] text-sand/80 uppercase">
                  Tanlangan loyiha · {{ String(current + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}
                </p>
                <Transition name="fade" mode="out-in">
                  <RouterLink :key="slide.slug" :to="`/projects/${slide.slug}`" class="group mt-2 block">
                    <span class="block truncate font-serif text-2xl sm:text-4xl">{{ slide.title }}</span>
                    <span class="mt-1 flex items-center gap-2 text-sm text-ivory/70">
                      {{ getCategory(slide.category)?.name }} · {{ slide.location }}
                      <BaseIcon name="arrow-up-right" :size="14" class="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </RouterLink>
                </Transition>
              </div>
              <div class="flex shrink-0 gap-2">
                <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 sm:h-12 sm:w-12 transition-colors hover:bg-ivory hover:text-charcoal" aria-label="Oldingi loyiha" @click="go(current - 1)">
                  <BaseIcon name="arrow-left" :size="16" />
                </button>
                <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 sm:h-12 sm:w-12 transition-colors hover:bg-ivory hover:text-charcoal" aria-label="Keyingi loyiha" @click="go(current + 1)">
                  <BaseIcon name="arrow-right" :size="16" />
                </button>
              </div>
            </div>
            <div class="mt-5 flex gap-2">
              <button
                v-for="(s, i) in slides"
                :key="s.slug"
                type="button"
                class="relative flex-1 py-2"
                :aria-label="`${i + 1}-slayd: ${s.title}`"
                :aria-current="i === current"
                @click="go(i)"
              >
                <span class="block h-px bg-ivory/25" />
                <span
                  :key="i === current ? `a-${current}` : i"
                  class="absolute inset-x-0 top-1/2 h-px origin-left bg-ivory"
                  :class="i === current ? 'animate-progress' : 'scale-x-0'"
                  :style="i === current ? { animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' } : null"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
