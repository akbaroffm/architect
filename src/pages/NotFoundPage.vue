<script setup>
import { onMounted } from 'vue'
import { setSeo } from '../composables/useSeo'
import BaseIcon from '../components/BaseIcon.vue'

onMounted(() => setSeo({ title: 'Sahifa topilmadi' }))
</script>

<template>
  <section class="container-x flex min-h-svh flex-col justify-center py-40">
    <p class="eyebrow">Xato 404</p>
    <h1 class="mt-6 font-serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.9]">Sahifa <em class="text-bronze">topilmadi</em></h1>
    <p class="mt-8 max-w-md text-lg text-muted">Bu sahifa ko‘chirilgan yoki umuman mavjud emas. Keling, sizni to‘g‘ri yo‘lga qaytaramiz.</p>
    <div class="mt-10 flex flex-wrap gap-3">
      <RouterLink to="/" class="btn-dark group">
        Bosh sahifa
        <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
      </RouterLink>
      <RouterLink to="/projects" class="btn-outline">Loyihalar</RouterLink>
    </div>
  </section>
</template>
