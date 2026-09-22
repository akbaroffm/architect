<script setup>
import { onMounted } from 'vue'
import { designer } from '../data/site'
import { ready } from '../composables/appState'
import { setSeo } from '../composables/useSeo'
import BaseIcon from '../components/BaseIcon.vue'
import CountUp from '../components/CountUp.vue'
import CtaBand from '../components/CtaBand.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import TestimonialSlider from '../components/TestimonialSlider.vue'

onMounted(() => setSeo({ title: 'Men haqimda', description: designer.intro, image: designer.photo }))
</script>

<template>
  <!-- Hero -->
  <section class="container-x grid gap-14 pt-36 pb-24 sm:pt-44 lg:grid-cols-12 lg:gap-16 lg:pt-52 lg:pb-32">
    <div class="flex flex-col lg:col-span-7">
      <p class="eyebrow" :class="ready ? 'animate-fade' : 'opacity-0'">Men haqimda</p>
      <h1 class="mt-6 font-serif text-[clamp(2.9rem,min(8vw,14vh),7.5rem)] leading-[0.95]">
        <span class="mask-line"><span class="block" :class="ready ? 'animate-rise' : 'opacity-0'">Salom, men</span></span>
        <span class="mask-line"><em class="block text-bronze" :class="ready ? 'animate-rise [animation-delay:150ms]' : 'opacity-0'">{{ designer.name }}</em></span>
      </h1>
      <p class="mt-10 max-w-xl font-serif text-2xl leading-snug text-charcoal sm:text-3xl" :class="ready ? 'animate-fade [animation-delay:450ms]' : 'opacity-0'">
        {{ designer.intro }}
      </p>
      <div class="mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-10" :class="ready ? 'animate-fade [animation-delay:600ms]' : 'opacity-0'">
        <RouterLink to="/projects" class="btn-dark group">
          Loyihalarimni ko‘rish
          <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
        </RouterLink>
        <RouterLink to="/contact" class="btn-outline">Bog‘lanish</RouterLink>
      </div>
    </div>
    <div class="relative lg:col-span-5">
      <div class="absolute -top-6 -right-6 hidden h-2/3 w-2/3 border border-stone sm:block" />
      <div class="relative overflow-hidden" :class="ready ? 'animate-fade [animation-delay:200ms]' : 'opacity-0'">
        <ParallaxImage :src="designer.photo" :alt="`${designer.name} portreti`" class="aspect-4/5" :strength="6" eager />
      </div>
      <p class="absolute -bottom-5 left-6 bg-charcoal px-5 py-3 text-[0.62rem] tracking-[0.3em] text-ivory uppercase">{{ designer.title }}</p>
    </div>
  </section>

  <!-- Stats -->
  <section class="border-y border-stone/70">
    <dl class="container-x grid grid-cols-2 gap-y-12 py-14 sm:grid-cols-4">
      <div v-for="(stat, i) in designer.stats" :key="stat.label" class="flex flex-col" v-reveal="i * 100">
        <dt class="order-2 mt-3 text-[0.65rem] tracking-[0.2em] text-muted uppercase">{{ stat.label }}</dt>
        <dd class="font-serif text-5xl text-charcoal sm:text-6xl"><CountUp :to="stat.value" />{{ stat.suffix }}</dd>
      </div>
    </dl>
  </section>

  <!-- Story -->
  <section class="section">
    <div class="container-x grid gap-14 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="eyebrow" v-reveal>Mening yo‘lim</p>
        <h2 class="heading-lg mt-6" v-reveal="100">Tinglashdan <em class="text-bronze">boshlanadi</em></h2>
      </div>
      <div class="space-y-6 text-[1.1rem] leading-relaxed text-muted lg:col-span-7 lg:col-start-6">
        <p v-for="(para, i) in designer.bio" :key="i" v-reveal="i * 100">{{ para }}</p>
      </div>
    </div>
  </section>

  <!-- Philosophy with work photo -->
  <section class="relative flex min-h-[85vh] items-center overflow-hidden bg-charcoal text-ivory">
    <ParallaxImage :src="designer.workPhoto" class="absolute! inset-0 opacity-45" :strength="10" />
    <div class="container-x relative py-28">
      <p class="eyebrow text-sand!" v-reveal>Falsafam</p>
      <blockquote class="mt-8 max-w-5xl font-serif text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.12] text-ivory italic" v-reveal="100">
        “{{ designer.philosophy }}”
      </blockquote>
    </div>
  </section>

  <!-- Values -->
  <section class="section">
    <div class="container-x">
      <p class="eyebrow" v-reveal>Tamoyillar</p>
      <div class="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
        <div v-for="(v, i) in designer.values" :key="v.title" class="border-t border-charcoal pt-8" v-reveal="i * 120">
          <p class="font-serif text-lg text-taupe">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="mt-4 text-4xl">{{ v.title }}</h3>
          <p class="mt-4 leading-relaxed text-muted">{{ v.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Timeline + awards -->
  <section class="bg-sand/60 py-24 sm:py-32">
    <div class="container-x grid gap-20 lg:grid-cols-2 lg:gap-24">
      <div>
        <p class="eyebrow" v-reveal>Tarjimai hol</p>
        <h2 class="heading-lg mt-6" v-reveal="100">Yillar <em class="text-bronze">davomida</em></h2>
        <ol class="relative mt-14 border-l border-stone pl-8">
          <li v-for="(t, i) in designer.timeline" :key="t.year" class="relative pb-10 last:pb-0" v-reveal="i * 80">
            <span class="absolute top-2 -left-[37px] h-2.5 w-2.5 rounded-full border border-bronze bg-ivory" />
            <p class="font-serif text-3xl text-bronze">{{ t.year }}</p>
            <p class="mt-2 text-ink">{{ t.text }}</p>
          </li>
        </ol>
      </div>
      <div>
        <p class="eyebrow" v-reveal>Mukofotlar</p>
        <h2 class="heading-lg mt-6" v-reveal="100">E’tirof</h2>
        <ul class="mt-14 border-t border-stone">
          <li v-for="(a, i) in designer.awards" :key="a.title + a.year" class="group grid grid-cols-[auto_1fr] gap-x-6 border-b border-stone py-6" v-reveal="i * 80">
            <span class="row-span-2 flex h-12 w-12 items-center justify-center rounded-full border border-stone text-bronze transition-colors duration-500 group-hover:bg-charcoal group-hover:text-ivory">
              <BaseIcon name="award" :size="20" :stroke="1.25" />
            </span>
            <p class="font-serif text-2xl text-charcoal">{{ a.title }}</p>
            <p class="text-sm text-muted">{{ a.org }} · {{ a.year }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <TestimonialSlider />
  <CtaBand />
</template>
