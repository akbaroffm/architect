<script setup>
import { cta } from '../data/site'
import BaseIcon from './BaseIcon.vue'
import ParallaxImage from './ParallaxImage.vue'
</script>

<template>
  <section class="relative flex min-h-[80vh] items-center overflow-hidden bg-charcoal text-ivory">
    <ParallaxImage :src="cta.image" class="absolute! inset-0" :strength="10" />
    <div class="absolute inset-0 bg-charcoal/55" />
    <div class="container-x relative py-28 text-center">
      <p class="eyebrow justify-center text-sand!" v-reveal>Keyingi loyiha — sizniki</p>
      <h2 class="mx-auto mt-8 max-w-5xl font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] text-ivory" v-reveal="100">
        {{ cta.title }}
      </h2>
      <p class="mx-auto mt-8 max-w-md text-lg text-ivory/80" v-reveal="200">{{ cta.text }}</p>
      <div class="mt-12 flex flex-wrap justify-center gap-3" v-reveal="300">
        <RouterLink to="/contact" class="btn-light group">
          Konsultatsiyaga yozilish
          <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
        </RouterLink>
        <RouterLink to="/projects" class="btn-outline-light">Loyihalarni ko‘rish</RouterLink>
      </div>
    </div>
  </section>
</template>
