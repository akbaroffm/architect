<script setup>
import { computed } from 'vue'
import { curtain } from './composables/appState'
import CursorLabel from './components/CursorLabel.vue'
import PageCurtain from './components/PageCurtain.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import ThePreloader from './components/ThePreloader.vue'

// The old page drifts up and dims under the curtain; the new one rises into place.
const pageMotion = computed(() => ({ in: 'page-leave', out: 'page-enter' })[curtain.phase] ?? '')
</script>

<template>
  <a href="#main" class="fixed top-3 left-3 z-100 -translate-y-20 bg-charcoal px-4 py-2 text-sm text-ivory transition-transform focus:translate-y-0">
    Asosiy mazmunga o‘tish
  </a>
  <ThePreloader />
  <PageCurtain />
  <CursorLabel />
  <SiteHeader />
  <main id="main" :class="pageMotion">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </main>
  <SiteFooter />
</template>
