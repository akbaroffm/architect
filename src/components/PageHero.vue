<script setup>
import { ready } from '../composables/appState'

/** Light, typographic page header used by inner pages. */
defineProps({
  eyebrow: { type: String, default: '' },
  intro: { type: String, default: '' },
})
</script>

<template>
  <section class="container-x pt-40 pb-16 sm:pt-48 sm:pb-20 lg:pt-56">
    <p v-if="eyebrow" class="eyebrow transition-opacity duration-1000" :class="ready ? 'opacity-100' : 'opacity-0'">{{ eyebrow }}</p>
    <h1 class="mt-6 font-serif text-[clamp(2.9rem,min(9vw,15vh),8.5rem)] leading-[0.95]">
      <span class="mask-line"><span class="block" :class="ready ? 'animate-rise' : 'opacity-0'"><slot /></span></span>
    </h1>
    <div class="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <p
        v-if="intro"
        class="max-w-xl text-lg leading-relaxed text-muted"
        :class="ready ? 'animate-fade [animation-delay:350ms]' : 'opacity-0'"
      >
        {{ intro }}
      </p>
      <div :class="ready ? 'animate-fade [animation-delay:500ms]' : 'opacity-0'"><slot name="aside" /></div>
    </div>
  </section>
</template>
