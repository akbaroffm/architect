<script setup>
import { ref } from 'vue'
import { categories, projectsIn } from '../data/projects'
import BaseIcon from './BaseIcon.vue'

/**
 * Editorial list of categories. On desktop, a preview photo follows the
 * pointer while hovering a row.
 */
const list = ref(null)
const hovered = ref(-1)
const pos = ref({ x: 0, y: 0 })

function onMove(e) {
  const r = list.value.getBoundingClientRect()
  pos.value = { x: e.clientX - r.left, y: e.clientY - r.top }
}
</script>

<template>
  <div ref="list" class="relative" @mousemove="onMove" @mouseleave="hovered = -1">
    <!-- Floating preview (desktop) -->
    <div
      class="pointer-events-none absolute top-0 left-0 z-10 hidden h-72 w-56 overflow-hidden transition-[opacity,scale] duration-500 ease-luxe lg:block"
      :class="hovered >= 0 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'"
      :style="{ transform: `translate3d(${pos.x - 112}px, ${pos.y - 144}px, 0) rotate(${hovered >= 0 ? -3 : 0}deg)` }"
      aria-hidden="true"
    >
      <img
        v-for="(c, i) in categories"
        :key="c.slug"
        :src="c.cover.replace(/w=\d+/, 'w=600')"
        alt=""
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        :class="hovered === i ? 'opacity-100' : 'opacity-0'"
        loading="lazy"
      />
    </div>

    <ul class="border-t border-stone">
      <li v-for="(c, i) in categories" :key="c.slug" v-reveal="i * 70">
        <RouterLink
          :to="`/projects/category/${c.slug}`"
          class="group flex items-center gap-5 border-b border-stone py-6 transition-colors duration-500 sm:gap-10 sm:py-8"
          @mouseenter="hovered = i"
        >
          <span class="w-8 shrink-0 font-sans text-xs text-taupe tabular-nums">{{ String(i + 1).padStart(2, '0') }}</span>
          <img :src="c.cover.replace(/w=\d+/, 'w=300')" alt="" class="h-14 w-14 shrink-0 object-cover lg:hidden" loading="lazy" />
          <span
            class="flex-1 font-serif text-[2rem] leading-none text-charcoal transition-all duration-700 ease-luxe group-hover:translate-x-4 group-hover:text-bronze sm:text-6xl lg:text-7xl"
          >
            {{ c.name }}
          </span>
          <span class="hidden text-sm text-muted sm:block">{{ projectsIn(c.slug).length }} ta loyiha</span>
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone transition-all duration-500 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-ivory"
          >
            <BaseIcon name="arrow-up-right" :size="18" class="transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
