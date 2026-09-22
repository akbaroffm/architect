<script setup>
import { computed } from 'vue'
import { contact } from '../data/site'
import BaseIcon from '../components/BaseIcon.vue'
import ContactForm from '../components/ContactForm.vue'
import PageHero from '../components/PageHero.vue'

const mapSrc = computed(() => `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=15&output=embed`)
const channels = [
  { icon: 'phone', label: 'Telefon', value: contact.phone, href: contact.phoneHref },
  { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: 'telegram', label: 'Telegram', value: contact.telegram.handle, href: contact.telegram.url, external: true },
  { icon: 'instagram', label: 'Instagram', value: contact.instagram.handle, href: contact.instagram.url, external: true },
]
</script>

<template>
  <PageHero eyebrow="Aloqa" intro="Makoningiz haqida gapirib bering. Bir ish kuni ichida javob beraman, birinchi konsultatsiya esa bepul.">
    Keling, <em class="text-bronze">gaplashamiz</em>
  </PageHero>

  <section class="container-x grid gap-16 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-20">
    <div class="lg:col-span-5">
      <ul class="border-t border-stone">
        <li v-for="(c, i) in channels" :key="c.label" v-reveal="i * 80">
          <a
            :href="c.href"
            :target="c.external ? '_blank' : undefined"
            rel="noopener"
            class="group flex items-center gap-5 border-b border-stone py-6"
          >
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone text-bronze transition-colors duration-500 group-hover:bg-charcoal group-hover:text-ivory">
              <BaseIcon :name="c.icon" :size="18" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-[0.62rem] tracking-[0.25em] text-muted uppercase">{{ c.label }}</span>
              <span class="mt-1 block truncate font-serif text-2xl text-charcoal sm:text-[1.7rem]">{{ c.value }}</span>
            </span>
            <BaseIcon name="arrow-up-right" :size="18" class="text-stone transition-all duration-500 group-hover:rotate-45 group-hover:text-charcoal" />
          </a>
        </li>
      </ul>

      <div class="mt-12" v-reveal="300">
        <p class="flex items-center gap-2 text-[0.62rem] tracking-[0.25em] text-muted uppercase"><BaseIcon name="pin" :size="14" /> Studiya manzili</p>
        <p class="mt-3 font-serif text-2xl text-charcoal">{{ contact.address }}</p>
      </div>

      <div class="mt-12" v-reveal="350">
        <p class="flex items-center gap-2 text-[0.62rem] tracking-[0.25em] text-muted uppercase"><BaseIcon name="clock" :size="14" /> Ish vaqti</p>
        <dl class="mt-4 space-y-3">
          <div v-for="h in contact.hours" :key="h.days" class="flex justify-between gap-4 border-b border-stone/60 pb-3 text-sm">
            <dt class="text-muted">{{ h.days }}</dt>
            <dd class="text-right text-charcoal">{{ h.time }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="lg:col-span-7" v-reveal="{ variant: 'right', delay: 150 }">
      <ContactForm />
    </div>
  </section>

  <div class="h-[460px] w-full overflow-hidden bg-stone" v-reveal="{ variant: 'fade' }">
    <iframe
      :src="mapSrc"
      title="Studiya joylashuvi xaritada"
      class="h-full w-full border-0 grayscale-[0.9] transition-[filter] duration-700 hover:grayscale-0"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    />
  </div>
</template>
