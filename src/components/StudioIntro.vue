<script setup>
import { designer } from '../data/site'
import BaseIcon from './BaseIcon.vue'
import CountUp from './CountUp.vue'
import ParallaxImage from './ParallaxImage.vue'
import ScrollText from './ScrollText.vue'

const years = designer.stats[0]
const badgeText = `${designer.name} · ${designer.title} · `
</script>

<template>
  <section class="section overflow-hidden">
    <div class="container-x">
      <!-- Heading row -->
      <div>
        <p class="eyebrow" v-reveal>Studiya haqida</p>
        <h2 class="mt-6 max-w-5xl font-serif text-[clamp(2.6rem,6.2vw,6rem)] leading-[1]" v-reveal="100">
          Makonni <em class="text-bronze">his qilib</em> loyihalayman
        </h2>
      </div>

      <div class="mt-16 grid gap-16 sm:mt-20 md:grid-cols-12 md:gap-12 lg:gap-20">
        <!-- Images -->
        <div class="relative mx-auto w-full max-w-md pb-14 sm:pb-20 md:col-span-5 md:max-w-none md:self-start">
          <div v-reveal="{ variant: 'img' }">
            <ParallaxImage :src="designer.photo" :alt="`${designer.name} portreti`" class="aspect-3/4" :strength="6" />
          </div>
          <div class="absolute right-0 bottom-0 w-[46%] border-[6px] border-ivory shadow-2xl sm:-right-8 sm:border-8 lg:-right-10" v-reveal="{ variant: 'img', delay: 250 }">
            <ParallaxImage :src="designer.workPhoto" alt="Eskiz ustida ishlash" class="aspect-4/5" :strength="5" />
          </div>

          <!-- Rotating badge -->
          <div class="absolute -top-8 -left-4 h-28 w-28 sm:-top-12 sm:-left-6 sm:h-36 sm:w-36 lg:-left-10" v-reveal="{ variant: 'fade', delay: 400 }">
            <div class="relative h-full w-full rounded-full bg-charcoal text-ivory shadow-xl">
              <svg viewBox="0 0 100 100" class="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]" aria-hidden="true">
                <defs><path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                <text class="fill-sand text-[7.2px] tracking-[0.18em] uppercase">
                  <textPath href="#badge-circle" textLength="236">{{ badgeText }}</textPath>
                </text>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="font-serif text-3xl leading-none sm:text-4xl">{{ years.value }}{{ years.suffix }}</span>
                <span class="mt-1 text-[0.5rem] tracking-[0.2em] text-taupe uppercase sm:text-[0.55rem]">yil tajriba</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Text -->
        <div class="flex flex-col md:col-span-7 lg:pt-6">
          <ScrollText :text="designer.intro" class="font-serif text-[1.7rem] leading-[1.3] text-charcoal sm:text-[2.2rem] lg:text-[2.5rem]" />
          <p class="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-muted" v-reveal>{{ designer.philosophy }}</p>

          <!-- Principles -->
          <ul class="mt-12 grid gap-8 border-t border-stone pt-10 sm:grid-cols-3 sm:gap-6 md:grid-cols-1 lg:grid-cols-3">
            <li v-for="(v, i) in designer.values" :key="v.title" v-reveal="i * 100">
              <span class="font-serif text-sm text-taupe">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="mt-2 text-2xl">{{ v.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ v.text }}</p>
            </li>
          </ul>

          <!-- Stats -->
          <dl class="mt-12 grid grid-cols-2 border-t border-l border-stone sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
            <div v-for="(stat, i) in designer.stats" :key="stat.label" class="flex flex-col border-r border-b border-stone p-5 sm:p-6" v-reveal="i * 90">
              <dt class="order-2 mt-2 text-[0.6rem] leading-snug tracking-[0.18em] text-muted uppercase">{{ stat.label }}</dt>
              <dd class="font-serif text-4xl text-charcoal sm:text-5xl"><CountUp :to="stat.value" />{{ stat.suffix }}</dd>
            </div>
          </dl>

          <!-- Signature -->
          <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6" v-reveal>
            <div class="mr-auto">
              <p class="font-serif text-3xl text-charcoal italic">{{ designer.name }}</p>
              <p class="mt-1 text-[0.62rem] tracking-[0.25em] text-muted uppercase">Asoschi · {{ designer.studio }}</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <RouterLink to="/about" class="btn-dark group">
                Men haqimda
                <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
              </RouterLink>
              <RouterLink to="/contact" class="btn-outline">Bog‘lanish</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
