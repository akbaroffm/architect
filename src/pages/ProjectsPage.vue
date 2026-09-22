<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { categories, getCategory, projects, projectsIn } from '../data/projects'
import { ready } from '../composables/appState'
import { setSeo } from '../composables/useSeo'
import BaseIcon from '../components/BaseIcon.vue'
import CtaBand from '../components/CtaBand.vue'
import NotFoundPage from './NotFoundPage.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ScrollTabs from '../components/ScrollTabs.vue'

const route = useRoute()
const slug = computed(() => route.params.category)
const category = computed(() => (slug.value ? getCategory(slug.value) : null))
const notFound = computed(() => slug.value && !category.value)
const list = computed(() => (category.value ? projectsIn(category.value.slug) : projects))
const others = computed(() => categories.filter((c) => c.slug !== slug.value))

watchEffect(() => {
  if (category.value) setSeo({ title: category.value.title, description: category.value.description, image: category.value.cover })
  else if (!slug.value) setSeo({ title: 'Loyihalar', description: 'Turar-joy, tijorat, ofis va restoran interyerlari — barcha loyihalar.' })
})

const columns = computed(() => {
  const cols = [[], []]
  list.value.forEach((p, i) => cols[i % 2].push({ p, i }))
  return cols
})

const tab =
  'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors duration-300 sm:px-5'
const tabOn = 'is-active border-charcoal bg-charcoal text-ivory'
const tabOff = 'border-stone text-ink hover:border-charcoal'

// Editorial rhythm: alternate tall and wide frames, offset the right column.
const aspectFor = (i) => (['aspect-4/5', 'aspect-5/4', 'aspect-5/4', 'aspect-4/5'][i % 4])
</script>

<template>
  <NotFoundPage v-if="notFound" />

  <template v-else>
    <!-- Category hero -->
    <section v-if="category" class="relative flex h-[88svh] min-h-[560px] items-end overflow-hidden bg-charcoal text-ivory">
      <ParallaxImage :src="category.cover" :alt="category.title" class="absolute! inset-0" :strength="10" eager />
      <div class="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/30 to-charcoal/40" />
      <div class="container-x relative pb-14 sm:pb-20">
        <nav class="text-[0.65rem] tracking-[0.25em] text-sand/80 uppercase" :class="ready ? 'animate-fade' : 'opacity-0'" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-ivory">Bosh sahifa</RouterLink>
          <span class="mx-2">/</span>
          <RouterLink to="/projects" class="hover:text-ivory">Loyihalar</RouterLink>
          <span class="mx-2">/</span>
          <span class="text-ivory">{{ category.name }}</span>
        </nav>
        <h1 class="mt-6 font-serif text-[clamp(2.7rem,min(9vw,15vh),9rem)] leading-[0.95] text-ivory">
          <span class="mask-line"><span class="block" :class="ready ? 'animate-rise [animation-delay:150ms]' : 'opacity-0'">{{ category.title }}</span></span>
        </h1>
        <div class="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end" :class="ready ? 'animate-fade [animation-delay:450ms]' : 'opacity-0'">
          <p class="max-w-2xl text-lg leading-relaxed text-ivory/85 lg:col-span-7">{{ category.description }}</p>
          <p class="font-serif text-2xl text-sand lg:col-span-3 lg:col-start-10 lg:text-right">
            {{ list.length }} ta loyiha
          </p>
        </div>
      </div>
    </section>

    <!-- All-projects header -->
    <section v-else class="container-x pt-40 pb-6 sm:pt-48 lg:pt-56">
      <p class="eyebrow" :class="ready ? 'animate-fade' : 'opacity-0'">Portfolio · {{ projects.length }} ta loyiha</p>
      <h1 class="mt-6 font-serif text-[clamp(3.2rem,min(12vw,18vh),11rem)] leading-[0.9]">
        <span class="mask-line"><span class="block" :class="ready ? 'animate-rise' : 'opacity-0'">Loyihalar</span></span>
      </h1>
      <p class="mt-10 max-w-xl text-lg leading-relaxed text-muted" :class="ready ? 'animate-fade [animation-delay:350ms]' : 'opacity-0'">
        Har bir loyiha — mijoz bilan birga bosib o‘tilgan yo‘l. Rasmni bosing va loyiha tarixi, yechimlar hamda materiallar bilan batafsil tanishing.
      </p>
    </section>

    <!-- Category tabs -->
    <div class="border-b border-stone/70 py-5 sm:py-6" :class="category ? '' : 'mt-10 sm:mt-14'">
      <ScrollTabs>
        <div class="container-x">
          <nav class="flex w-max gap-2" aria-label="Turkumlar">
            <RouterLink to="/projects" :class="[tab, !category ? tabOn : tabOff]">
              Barchasi <span class="text-[0.6rem] opacity-60">{{ projects.length }}</span>
            </RouterLink>
            <RouterLink
              v-for="c in categories"
              :key="c.slug"
              :to="`/projects/category/${c.slug}`"
              :class="[tab, category?.slug === c.slug ? tabOn : tabOff]"
            >
              {{ c.name }} <span class="text-[0.6rem] opacity-60">{{ projectsIn(c.slug).length }}</span>
            </RouterLink>
            <!-- keeps the container padding after the last tab when scrolled to the end -->
            <span class="w-3 shrink-0 sm:w-6" aria-hidden="true" />
          </nav>
        </div>
      </ScrollTabs>
    </div>

    <!-- Grid: two independent columns (the right one offset), so rows never leave gaps.
         Below md the column wrappers dissolve (display: contents) and `order` restores 1, 2, 3… -->
    <section class="container-x py-20 sm:py-28">
      <div class="flex flex-col gap-20 md:grid md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
        <div v-for="col in 2" :key="col" class="contents md:flex md:flex-col md:gap-24 lg:gap-32" :class="col === 2 && 'md:pt-40'">
          <ProjectCard
            v-for="{ p, i } in columns[col - 1]"
            :key="p.slug"
            :project="p"
            :index="i"
            :aspect="aspectFor(i)"
            :style="{ order: i }"
            :delay="(i % 2) * 120"
          />
        </div>
      </div>
    </section>

    <!-- Other categories -->
    <section v-if="category" class="border-t border-stone/70 bg-sand/60 py-24 sm:py-32">
      <div class="container-x">
        <p class="eyebrow" v-reveal>Boshqa yo‘nalishlar</p>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <RouterLink
            v-for="(c, i) in others"
            :key="c.slug"
            :to="`/projects/category/${c.slug}`"
            class="group relative block aspect-3/4 overflow-hidden bg-charcoal"
            v-reveal="i * 80"
          >
            <img :src="c.cover.replace(/w=\d+/, 'w=800')" :alt="c.name" class="h-full w-full object-cover opacity-80 transition-all duration-[1.4s] ease-luxe group-hover:scale-108 group-hover:opacity-60" loading="lazy" />
            <div class="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-ivory">
              <span class="font-serif text-2xl leading-tight">{{ c.name }}</span>
              <BaseIcon name="arrow-up-right" :size="18" class="transition-transform duration-500 group-hover:rotate-45" />
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </template>
</template>
