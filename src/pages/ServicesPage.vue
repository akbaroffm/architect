<script setup>
import { ref } from 'vue'
import { faq, services } from '../data/site'
import BaseIcon from '../components/BaseIcon.vue'
import CtaBand from '../components/CtaBand.vue'
import PageHero from '../components/PageHero.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import ProcessSteps from '../components/ProcessSteps.vue'

const open = ref(0)
</script>

<template>
  <PageHero eyebrow="Xizmatlar" intro="Bitta xonadan tortib butun binogacha — to‘liq “kalit topshirish” loyihasini yoki faqat sizga kerakli xizmatlarni tanlang.">
    Xizmatlar
    <template #aside>
      <div class="flex flex-wrap gap-2">
        <a
          v-for="(s, i) in services"
          :key="s.title"
          :href="`#xizmat-${i + 1}`"
          class="rounded-full border border-stone px-4 py-2 text-xs text-ink transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
        >
          {{ s.title }}
        </a>
      </div>
    </template>
  </PageHero>

  <!-- Detailed services -->
  <section class="container-x pb-24 sm:pb-32">
    <article
      v-for="(s, i) in services"
      :id="`xizmat-${i + 1}`"
      :key="s.title"
      class="grid scroll-mt-28 gap-10 border-t border-stone py-16 sm:py-24 lg:grid-cols-12 lg:gap-16"
    >
      <div class="lg:col-span-5" :class="i % 2 && 'lg:order-2 lg:col-start-8'">
        <div v-reveal="{ variant: 'img' }">
          <ParallaxImage :src="s.image" :alt="s.title" class="aspect-4/3 lg:aspect-4/5" :strength="6" />
        </div>
      </div>

      <div class="flex flex-col lg:col-span-6" :class="i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'">
        <div class="flex items-center gap-5" v-reveal>
          <span class="flex h-14 w-14 items-center justify-center rounded-full border border-stone text-bronze">
            <BaseIcon :name="s.icon" :size="24" :stroke="1.25" />
          </span>
          <span class="font-serif text-xl text-taupe">{{ String(i + 1).padStart(2, '0') }}</span>
        </div>
        <h2 class="heading-lg mt-8" v-reveal="80">{{ s.title }}</h2>
        <p class="mt-6 text-[1.05rem] leading-relaxed text-muted" v-reveal="140">{{ s.text }}</p>

        <p class="mt-10 text-[0.62rem] tracking-[0.25em] text-muted uppercase" v-reveal="180">Nimalar kiradi</p>
        <ul class="mt-4 grid gap-3 sm:grid-cols-2" v-reveal="220">
          <li v-for="item in s.includes" :key="item" class="flex items-start gap-3 text-ink">
            <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sand text-bronze">
              <BaseIcon name="check" :size="12" :stroke="2" />
            </span>
            {{ item }}
          </li>
        </ul>

        <div class="mt-auto flex flex-wrap items-end justify-between gap-6 pt-12" v-reveal="260">
          <div>
            <p class="text-[0.62rem] tracking-[0.25em] text-muted uppercase">Narxi</p>
            <p class="mt-2 font-serif text-3xl text-charcoal">{{ s.price }}</p>
          </div>
          <RouterLink to="/contact" class="btn-outline group">
            Buyurtma berish
            <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>
    </article>
  </section>

  <ProcessSteps />

  <!-- FAQ -->
  <section class="section">
    <div class="container-x grid gap-14 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="eyebrow" v-reveal>Savol-javob</p>
        <h2 class="heading-lg mt-6" v-reveal="100">Ko‘p beriladigan <em class="text-bronze">savollar</em></h2>
        <p class="mt-6 max-w-sm leading-relaxed text-muted" v-reveal="200">
          Javob topa olmadingizmi? <RouterLink to="/contact" class="link-underline text-charcoal">Menga yozing</RouterLink> — bir ish kuni ichida javob beraman.
        </p>
      </div>
      <div class="border-t border-stone lg:col-span-7 lg:col-start-6">
        <div v-for="(item, i) in faq" :key="item.q" class="border-b border-stone" v-reveal="i * 70">
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-6 py-7 text-left font-serif text-2xl text-charcoal transition-colors hover:text-bronze sm:text-[1.7rem]"
              :aria-expanded="open === i"
              :aria-controls="`faq-${i}`"
              @click="open = open === i ? -1 : i"
            >
              {{ item.q }}
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone transition-transform duration-500" :class="open === i && 'rotate-45 bg-charcoal text-ivory'">
                <BaseIcon name="plus" :size="16" />
              </span>
            </button>
          </h3>
          <div
            :id="`faq-${i}`"
            class="grid transition-[grid-template-rows,opacity] duration-600 ease-luxe"
            :class="open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
          >
            <div class="overflow-hidden">
              <p class="max-w-2xl pb-8 leading-relaxed text-muted">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <CtaBand />
</template>
