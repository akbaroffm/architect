<script setup>
import { featuredProjects, getCategory, projects } from '../data/projects'
import { marquee, services } from '../data/site'
import BaseIcon from '../components/BaseIcon.vue'
import CategoryList from '../components/CategoryList.vue'
import CtaBand from '../components/CtaBand.vue'
import HomeHero from '../components/HomeHero.vue'
import MarqueeStrip from '../components/MarqueeStrip.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import ProcessSteps from '../components/ProcessSteps.vue'
import StudioIntro from '../components/StudioIntro.vue'
import TestimonialSlider from '../components/TestimonialSlider.vue'

const showcase = featuredProjects.slice(0, 4)
</script>

<template>
  <HomeHero />

  <StudioIntro />

  <MarqueeStrip :items="marquee" />

  <!-- Featured projects -->
  <section class="section">
    <div class="container-x">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow" v-reveal>Portfolio</p>
          <h2 class="heading-xl mt-6" v-reveal="100">Tanlangan <em class="text-bronze">loyihalar</em></h2>
        </div>
        <RouterLink to="/projects" class="group flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase" v-reveal="200">
          <span class="link-underline">Barcha loyihalar ({{ projects.length }})</span>
          <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
        </RouterLink>
      </div>

      <div class="mt-20 space-y-28 lg:mt-28 lg:space-y-40">
        <article
          v-for="(p, i) in showcase"
          :key="p.slug"
          class="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
        >
          <RouterLink
            :to="`/projects/${p.slug}`"
            class="group block lg:col-span-7"
            :class="i % 2 && 'lg:order-2 lg:col-start-6'"
            data-cursor="Ko‘rish"
            v-reveal="{ variant: 'img' }"
          >
            <div class="overflow-hidden">
              <ParallaxImage
                :src="p.cover"
                :alt="p.title"
                class="aspect-4/3 transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.03] lg:aspect-5/4"
              />
            </div>
          </RouterLink>

          <div class="lg:col-span-4" :class="i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'">
            <p class="font-serif text-7xl text-stone lg:text-8xl" v-reveal>{{ String(i + 1).padStart(2, '0') }}</p>
            <p class="eyebrow mt-6" v-reveal="80">{{ getCategory(p.category)?.name }}</p>
            <h3 class="mt-4 text-4xl leading-tight sm:text-5xl" v-reveal="140">{{ p.title }}</h3>
            <p class="mt-5 leading-relaxed text-muted" v-reveal="200">{{ p.summary }}</p>
            <dl class="mt-8 grid grid-cols-3 gap-4 border-y border-stone py-5 text-sm" v-reveal="260">
              <div>
                <dt class="text-[0.6rem] tracking-[0.2em] text-muted uppercase">Maydon</dt>
                <dd class="mt-1 text-charcoal">{{ p.area }} m²</dd>
              </div>
              <div>
                <dt class="text-[0.6rem] tracking-[0.2em] text-muted uppercase">Yil</dt>
                <dd class="mt-1 text-charcoal">{{ p.year }}</dd>
              </div>
              <div>
                <dt class="text-[0.6rem] tracking-[0.2em] text-muted uppercase">Joy</dt>
                <dd class="mt-1 truncate text-charcoal">{{ p.location.split(',')[0] }}</dd>
              </div>
            </dl>
            <RouterLink :to="`/projects/${p.slug}`" class="group mt-8 inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase" v-reveal="320">
              <span class="link-underline">Loyihani ko‘rish</span>
              <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="section bg-sand/60">
    <div class="container-x">
      <div class="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p class="eyebrow" v-reveal>Yo‘nalishlar</p>
          <h2 class="heading-xl mt-6" v-reveal="100">Har bir makon — <em class="text-bronze">o‘z hikoyasi</em></h2>
        </div>
        <p class="max-w-md leading-relaxed text-muted lg:justify-self-end" v-reveal="200">
          Xonadonlardan restoranlargacha — o‘zingizni qiziqtirgan yo‘nalishni tanlang va shu turdagi loyihalarimni batafsil ko‘ring.
        </p>
      </div>
      <CategoryList />
    </div>
  </section>

  <!-- Services teaser -->
  <section class="section">
    <div class="container-x">
      <div class="grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p class="eyebrow" v-reveal>Xizmatlar</p>
          <h2 class="heading-xl mt-6" v-reveal="100">G‘oyadan <em class="text-bronze">kalitgacha</em></h2>
        </div>
        <p class="max-w-md leading-relaxed text-muted lg:justify-self-end" v-reveal="200">
          To‘liq “kalit topshirish” loyihasini yoki faqat sizga kerakli xizmatlarni tanlang.
        </p>
      </div>

      <div class="mt-16 grid gap-px border border-stone/70 bg-stone/70 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="(s, i) in services"
          :key="s.title"
          to="/services"
          class="group relative overflow-hidden bg-ivory p-8 sm:p-10"
          v-reveal="(i % 3) * 120"
        >
          <span class="absolute inset-0 origin-bottom scale-y-0 bg-charcoal transition-transform duration-700 ease-luxe group-hover:scale-y-100" aria-hidden="true" />
          <div class="relative">
            <div class="flex items-start justify-between">
              <span class="flex h-14 w-14 items-center justify-center rounded-full border border-stone text-bronze transition-colors duration-700 group-hover:border-taupe group-hover:text-sand">
                <BaseIcon :name="s.icon" :size="24" :stroke="1.25" />
              </span>
              <BaseIcon name="arrow-up-right" :size="20" class="text-stone transition-all duration-700 group-hover:rotate-45 group-hover:text-taupe" />
            </div>
            <h3 class="mt-10 text-[1.9rem] transition-colors duration-700 group-hover:text-ivory">{{ s.title }}</h3>
            <p class="mt-3 leading-relaxed text-muted transition-colors duration-700 group-hover:text-stone">{{ s.short }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <ProcessSteps />
  <TestimonialSlider />
  <CtaBand />
</template>
