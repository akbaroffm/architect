<script setup>
import { computed, onMounted, ref } from 'vue'
import { getCategory } from '../data/projects'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  project: { type: Object, required: true },
  // Tailwind aspect class for the image frame
  aspect: { type: String, default: 'aspect-4/5' },
  index: { type: Number, default: null },
  // Reveal stagger in ms
  delay: { type: Number, default: 0 },
})
const category = computed(() => getCategory(props.project.category))

const img = ref(null)
const loaded = ref(false)
onMounted(() => {
  if (img.value?.complete && img.value.naturalWidth) loaded.value = true
})
</script>

<template>
  <article>
    <RouterLink :to="`/projects/${project.slug}`" class="group block" data-cursor="Ko‘rish">
      <!-- The wrapper is observed; its child receives the clip-path wipe. -->
      <div v-reveal="{ variant: 'img', delay }">
        <div class="relative overflow-hidden bg-sand" :class="aspect">
          <img
            ref="img"
            :src="project.cover.replace(/w=\d+/, 'w=1400')"
            :alt="project.title"
            class="img-fade h-full w-full object-cover transition-[opacity,scale] duration-[900ms,1400ms] ease-luxe will-change-[scale] group-hover:scale-106"
            :class="loaded && 'is-loaded'"
            loading="lazy"
            decoding="async"
            @load="loaded = true"
          />
          <div class="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/15" />
          <span class="absolute top-4 left-4 bg-ivory/90 px-3 py-1.5 text-[0.58rem] font-medium tracking-[0.22em] text-charcoal uppercase backdrop-blur-sm sm:top-5 sm:left-5">
            {{ category?.name }}
          </span>
          <!-- Touch devices: visible arrow instead of the cursor label -->
          <span class="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-charcoal sm:right-5 sm:bottom-5 [@media(hover:hover)]:hidden">
            <BaseIcon name="arrow-up-right" :size="18" />
          </span>
        </div>
      </div>

      <div class="mt-5 flex items-start justify-between gap-5 sm:mt-6" v-reveal="delay + 150">
        <div class="min-w-0">
          <h3 class="text-[1.75rem] leading-tight transition-colors duration-500 group-hover:text-bronze sm:text-4xl">
            <span v-if="index !== null" class="mr-3 align-top font-sans text-xs text-taupe">{{ String(index + 1).padStart(2, '0') }}</span>{{ project.title }}
          </h3>
          <p class="mt-2 max-w-md text-sm leading-relaxed text-muted">{{ project.summary }}</p>
        </div>
        <p class="shrink-0 pt-2 text-right text-xs leading-relaxed text-muted tabular-nums">
          {{ project.area }} m²<br />{{ project.year }}
        </p>
      </div>
    </RouterLink>
  </article>
</template>
