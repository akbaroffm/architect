<script setup>
import { categories } from '../data/projects'
import { contact, designer, nav } from '../data/site'
import { lenis } from '../composables/lenis'
import BaseIcon from './BaseIcon.vue'

const year = new Date().getFullYear()
const socials = [
  { name: 'Instagram', icon: 'instagram', url: contact.instagram.url },
  { name: 'Telegram', icon: 'telegram', url: contact.telegram.url },
  { name: 'Email', icon: 'mail', url: `mailto:${contact.email}` },
  { name: 'Telefon', icon: 'phone', url: contact.phoneHref },
]

function toTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.6 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative overflow-hidden bg-charcoal text-stone">
    <!-- Big CTA -->
    <div class="container-x"><div class="border-b border-ivory/10 pt-24 pb-20 sm:pt-32">
      <p class="eyebrow text-taupe!" v-reveal>Loyihangiz bormi?</p>
      <RouterLink to="/contact" class="group mt-8 flex flex-wrap items-end justify-between gap-8" v-reveal="100">
        <span class="font-serif text-[clamp(3.25rem,10vw,9.5rem)] leading-[0.9] text-ivory">
          Keling,
          <em class="text-taupe transition-colors duration-700 group-hover:text-ivory">gaplashamiz</em>
        </span>
        <span
          class="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-all duration-700 ease-luxe group-hover:scale-110 group-hover:border-taupe group-hover:bg-taupe group-hover:text-charcoal sm:h-32 sm:w-32"
        >
          <BaseIcon name="arrow-up-right" :size="34" :stroke="1" class="transition-transform duration-700 group-hover:rotate-45" />
        </span>
      </RouterLink>
    </div></div>

    <div class="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="font-serif text-3xl text-ivory">{{ designer.name }}</p>
        <p class="mt-2 text-[0.65rem] tracking-[0.3em] text-taupe uppercase">{{ designer.title }}</p>
        <p class="mt-6 max-w-xs text-sm leading-relaxed text-stone/70">{{ designer.tagline }}</p>
        <div class="mt-8 flex gap-3">
          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.url"
            :target="s.url.startsWith('http') ? '_blank' : undefined"
            rel="noopener"
            :aria-label="s.name"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 transition-all duration-500 hover:-translate-y-1 hover:border-ivory hover:bg-ivory hover:text-charcoal"
          >
            <BaseIcon :name="s.icon" :size="17" />
          </a>
        </div>
      </div>

      <nav class="lg:col-span-2" aria-label="Sahifalar">
        <p class="text-[0.65rem] tracking-[0.3em] text-taupe uppercase">Sahifalar</p>
        <ul class="mt-5 space-y-3 text-sm">
          <li><RouterLink to="/" class="link-underline hover:text-ivory">Bosh sahifa</RouterLink></li>
          <li v-for="item in nav" :key="item.to">
            <RouterLink :to="item.to" class="link-underline hover:text-ivory">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav class="lg:col-span-3" aria-label="Yo‘nalishlar">
        <p class="text-[0.65rem] tracking-[0.3em] text-taupe uppercase">Yo‘nalishlar</p>
        <ul class="mt-5 space-y-3 text-sm">
          <li v-for="c in categories" :key="c.slug">
            <RouterLink :to="`/projects/category/${c.slug}`" class="link-underline hover:text-ivory">{{ c.name }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="lg:col-span-3">
        <p class="text-[0.65rem] tracking-[0.3em] text-taupe uppercase">Aloqa</p>
        <ul class="mt-5 space-y-3 text-sm">
          <li><a :href="contact.phoneHref" class="link-underline text-lg text-ivory">{{ contact.phone }}</a></li>
          <li><a :href="`mailto:${contact.email}`" class="link-underline hover:text-ivory">{{ contact.email }}</a></li>
          <li class="text-stone/70">{{ contact.address }}</li>
          <li class="text-stone/70">{{ contact.hours[0].days }}: {{ contact.hours[0].time }}</li>
        </ul>
      </div>
    </div>

    <div class="container-x"><div class="flex flex-col gap-4 border-t border-ivory/10 py-8 text-xs text-stone/55 sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ year }} {{ designer.studio }}. Barcha huquqlar himoyalangan.</p>
      <button type="button" class="group flex items-center gap-2 tracking-[0.2em] uppercase transition-colors hover:text-ivory" @click="toTop">
        Yuqoriga
        <BaseIcon name="arrow-up" :size="14" class="transition-transform duration-500 group-hover:-translate-y-1" />
      </button>
    </div></div>
  </footer>
</template>
