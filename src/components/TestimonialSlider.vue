<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { testimonials } from '../data/site'
import BaseIcon from './BaseIcon.vue'

const INTERVAL = 7000
const current = ref(0)
const direction = ref('next')
const paused = ref(false)
let timer

function go(step) {
  direction.value = step > 0 ? 'next' : 'prev'
  current.value = (current.value + step + testimonials.length) % testimonials.length
  restart()
}
function restart() {
  clearInterval(timer)
  timer = setInterval(() => {
    if (!paused.value && !document.hidden) go(1)
  }, INTERVAL)
}
onMounted(restart)
onBeforeUnmount(() => clearInterval(timer))

let startX = 0
const onTouchStart = (e) => (startX = e.touches[0].clientX)
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - startX
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
}
</script>

<template>
  <section class="section overflow-hidden">
    <div class="container-x grid gap-14 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="eyebrow" v-reveal>Mijozlar fikri</p>
        <h2 class="heading-lg mt-6" v-reveal="100">Ular nima <em class="text-bronze">deydi</em></h2>

        <div class="mt-10 flex items-center gap-3" v-reveal="200">
          <button
            type="button"
            class="flex h-14 w-14 items-center justify-center rounded-full border border-stone transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            aria-label="Oldingi fikr"
            @click="go(-1)"
          >
            <BaseIcon name="arrow-left" :size="18" />
          </button>
          <button
            type="button"
            class="flex h-14 w-14 items-center justify-center rounded-full border border-stone transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            aria-label="Keyingi fikr"
            @click="go(1)"
          >
            <BaseIcon name="arrow-right" :size="18" />
          </button>
          <span class="ml-4 font-serif text-lg text-muted tabular-nums">
            {{ String(current + 1).padStart(2, '0') }} <span class="text-stone">/ {{ String(testimonials.length).padStart(2, '0') }}</span>
          </span>
        </div>
      </div>

      <div
        class="relative lg:col-span-8"
        v-reveal="200"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
      >
        <span class="pointer-events-none absolute -top-16 -left-2 font-serif text-[12rem] leading-none text-sand select-none" aria-hidden="true">“</span>

        <div class="relative min-h-[340px] sm:min-h-[290px]" aria-live="polite">
          <Transition :name="`slide-${direction}`" mode="out-in">
            <figure :key="current">
              <blockquote class="font-serif text-[1.65rem] leading-snug text-charcoal sm:text-[2.4rem] sm:leading-snug">
                {{ testimonials[current].quote }}
              </blockquote>
              <figcaption class="mt-10 flex items-center gap-4">
                <img :src="testimonials[current].avatar" :alt="testimonials[current].name" class="h-14 w-14 rounded-full object-cover grayscale" loading="lazy" />
                <div>
                  <p class="font-medium text-charcoal">{{ testimonials[current].name }}</p>
                  <p class="text-sm text-muted">{{ testimonials[current].role }}</p>
                </div>
              </figcaption>
            </figure>
          </Transition>
        </div>

        <div class="mt-12 flex gap-2">
          <button
            v-for="(t, i) in testimonials"
            :key="t.name"
            type="button"
            class="relative flex-1 py-3"
            :aria-label="`${i + 1}-fikrni ko‘rsatish`"
            :aria-current="i === current"
            @click="go(i - current)"
          >
            <span class="block h-px bg-stone" />
            <span
              :key="i === current ? `active-${current}` : i"
              class="absolute inset-x-0 top-1/2 h-px origin-left bg-charcoal"
              :class="i < current ? 'scale-x-100' : i === current ? 'animate-progress' : 'scale-x-0'"
              :style="i === current ? { animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' } : null"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
