<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getCategory, getProject, projects, projectsIn } from '../data/projects'
import { ready } from '../composables/appState'
import { setSeo } from '../composables/useSeo'
import BaseIcon from '../components/BaseIcon.vue'
import ImageLightbox from '../components/ImageLightbox.vue'
import NotFoundPage from './NotFoundPage.vue'
import ParallaxImage from '../components/ParallaxImage.vue'
import ProjectCard from '../components/ProjectCard.vue'

const route = useRoute()
const project = computed(() => getProject(route.params.slug))
const category = computed(() => project.value && getCategory(project.value.category))

const index = computed(() => projects.findIndex((p) => p.slug === project.value?.slug))
const next = computed(() => projects[(index.value + 1) % projects.length])
const related = computed(() =>
  project.value ? projectsIn(project.value.category).filter((p) => p.slug !== project.value.slug).slice(0, 2) : [],
)

watchEffect(() => {
  if (project.value) setSeo({ title: project.value.title, description: project.value.summary, image: project.value.cover })
})

// All photos, in page order, for the lightbox.
const gallery = computed(() => (project.value ? [project.value.cover, ...project.value.images] : []))

// Photos after the first full-bleed one, grouped into alternating rows.
const rows = computed(() => {
  const rest = project.value?.images.slice(1) ?? []
  const out = []
  let i = 0
  let pair = true
  while (i < rest.length) {
    if (pair && rest.length - i >= 2) {
      out.push({ type: 'pair', items: [{ src: rest[i], n: i + 2 }, { src: rest[i + 1], n: i + 3 }] })
      i += 2
    } else {
      out.push({ type: 'wide', items: [{ src: rest[i], n: i + 2 }] })
      i += 1
    }
    pair = !pair
  }
  return out
})

const facts = computed(() => {
  const p = project.value
  if (!p) return []
  return [
    { icon: 'pin', label: 'Joylashuv', value: p.location },
    { icon: 'ruler', label: 'Maydon', value: `${p.area} m²` },
    { icon: 'calendar', label: 'Yil', value: p.year },
    { icon: 'clock', label: 'Davomiyligi', value: p.duration },
    { icon: 'user', label: 'Mijoz', value: p.client },
  ]
})

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
function openLightbox(i) {
  lightboxIndex.value = i
  lightboxOpen.value = true
}
</script>

<template>
  <NotFoundPage v-if="!project" />

  <article v-else :key="project.slug">
    <!-- Hero -->
    <section class="relative flex h-svh min-h-[620px] items-end overflow-hidden bg-charcoal text-ivory">
      <ParallaxImage :src="project.cover" :alt="project.title" class="absolute! inset-0" :strength="12" eager />
      <div class="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/20 to-charcoal/45" />

      <div class="container-x relative pb-14 sm:pb-20">
        <nav class="text-[0.65rem] tracking-[0.25em] text-sand/80 uppercase" :class="ready ? 'animate-fade' : 'opacity-0'" aria-label="Breadcrumb">
          <RouterLink to="/projects" class="hover:text-ivory">Loyihalar</RouterLink>
          <span class="mx-2">/</span>
          <RouterLink :to="`/projects/category/${category.slug}`" class="hover:text-ivory">{{ category.name }}</RouterLink>
        </nav>
        <h1 class="mt-6 font-serif text-[clamp(2.9rem,min(10vw,16vh),10rem)] leading-[0.92] text-ivory">
          <span class="mask-line"><span class="block" :class="ready ? 'animate-rise [animation-delay:150ms]' : 'opacity-0'">{{ project.title }}</span></span>
        </h1>
        <div class="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" :class="ready ? 'animate-fade [animation-delay:450ms]' : 'opacity-0'">
          <p class="max-w-xl text-lg leading-relaxed text-ivory/85 sm:text-xl">{{ project.summary }}</p>
          <p class="flex items-center gap-3 text-[0.62rem] tracking-[0.3em] text-ivory/60 uppercase">
            Loyiha tarixi
            <span class="relative h-10 w-px overflow-hidden bg-ivory/25"><span class="absolute top-0 left-0 h-3 w-px animate-scroll-dot bg-ivory" /></span>
          </p>
        </div>
      </div>
    </section>

    <!-- Facts -->
    <section class="border-b border-stone/70">
      <dl class="container-x grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-5">
        <div v-for="(f, i) in facts" :key="f.label" class="flex gap-3 pr-4" v-reveal="i * 80">
          <BaseIcon :name="f.icon" :size="18" class="mt-0.5 shrink-0 text-bronze" />
          <div>
            <dt class="text-[0.6rem] tracking-[0.25em] text-muted uppercase">{{ f.label }}</dt>
            <dd class="mt-1.5 text-charcoal">{{ f.value }}</dd>
          </div>
        </div>
      </dl>
    </section>

    <!-- Overview -->
    <section class="section">
      <div class="container-x grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="eyebrow" v-reveal>Loyiha haqida</p>
          <ul class="mt-8 flex flex-wrap gap-2" v-reveal="100">
            <li v-for="s in project.scope" :key="s" class="rounded-full border border-stone px-4 py-2 text-xs text-ink">{{ s }}</li>
          </ul>
        </div>
        <p class="font-serif text-[1.85rem] leading-[1.3] text-charcoal sm:text-[2.4rem] lg:col-span-8 lg:text-[2.8rem]" v-reveal="150">
          {{ project.intro }}
        </p>
      </div>
    </section>

    <!-- First image, full bleed -->
    <button type="button" class="group block w-full overflow-hidden" data-cursor="Kattalashtirish" aria-label="1-rasmni kattalashtirish" @click="openLightbox(1)" v-reveal="{ variant: 'img' }">
      <ParallaxImage :src="project.images[0]" :alt="`${project.title} — 1`" class="transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-[1.03] aspect-4/3 w-full sm:aspect-16/8" :strength="8" />
    </button>

    <!-- Challenge / solution -->
    <section class="section">
      <div class="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div v-reveal>
          <p class="font-serif text-6xl text-stone">01</p>
          <h2 class="mt-4 text-4xl sm:text-5xl">Vazifa</h2>
          <p class="mt-6 text-[1.05rem] leading-relaxed text-muted">{{ project.challenge }}</p>
        </div>
        <div class="lg:mt-32" v-reveal="150">
          <p class="font-serif text-6xl text-stone">02</p>
          <h2 class="mt-4 text-4xl sm:text-5xl">Yechim</h2>
          <p class="mt-6 text-[1.05rem] leading-relaxed text-muted">{{ project.solution }}</p>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="container-x space-y-6 sm:space-y-10">
      <template v-for="(row, r) in rows" :key="r">
        <div v-if="row.type === 'pair'" class="grid gap-6 sm:grid-cols-12 sm:gap-10">
          <button
            v-for="(img, k) in row.items"
            :key="img.src"
            type="button"
            class="group block overflow-hidden"
            :class="k === 0 ? 'sm:col-span-7' : 'sm:col-span-5 sm:mt-40'"
            data-cursor="Kattalashtirish"
            :aria-label="`${img.n}-rasmni kattalashtirish`"
            @click="openLightbox(img.n)"
            v-reveal="{ variant: 'img', delay: k * 150 }"
          >
            <ParallaxImage :src="img.src" :alt="`${project.title} — ${img.n}`" class="transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-[1.03]" :class="k === 0 ? 'aspect-4/5' : 'aspect-3/4'" :strength="6" />
          </button>
        </div>
        <button
          v-else
          type="button"
          class="group block w-full overflow-hidden"
          data-cursor="Kattalashtirish"
          :aria-label="`${row.items[0].n}-rasmni kattalashtirish`"
          @click="openLightbox(row.items[0].n)"
          v-reveal="{ variant: 'img' }"
        >
          <ParallaxImage :src="row.items[0].src" :alt="`${project.title} — ${row.items[0].n}`" class="transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-[1.03] aspect-16/10" :strength="6" />
        </button>
      </template>
    </section>

    <!-- Result -->
    <section class="section">
      <div class="container-x grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="font-serif text-6xl text-stone" v-reveal>03</p>
          <h2 class="mt-4 text-4xl sm:text-5xl" v-reveal="80">Natija</h2>
        </div>
        <p class="font-serif text-[1.9rem] leading-snug text-bronze italic sm:text-[2.6rem] lg:col-span-8 lg:col-start-5" v-reveal="150">
          {{ project.result }}
        </p>
      </div>
    </section>

    <!-- Materials + scope -->
    <section class="bg-sand/60 py-24 sm:py-32">
      <div class="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p class="eyebrow" v-reveal>Materiallar palitrasi</p>
          <ul class="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <li v-for="(m, i) in project.materials" :key="m.name" v-reveal="i * 90">
              <span class="block aspect-square w-full shadow-[inset_0_0_0_1px_rgba(31,29,27,0.08)]" :style="{ background: m.color }" />
              <span class="mt-3 block text-sm text-charcoal">{{ m.name }}</span>
              <span class="block text-xs text-muted uppercase">{{ m.color }}</span>
            </li>
          </ul>
        </div>
        <div>
          <p class="eyebrow" v-reveal>Bajarilgan ishlar</p>
          <ol class="mt-10 border-t border-stone">
            <li v-for="(s, i) in project.scope" :key="s" class="flex items-baseline gap-6 border-b border-stone py-5" v-reveal="i * 70">
              <span class="text-xs text-taupe tabular-nums">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="font-serif text-2xl text-charcoal sm:text-[1.7rem]">{{ s }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Client quote -->
    <section v-if="project.testimonial" class="section">
      <figure class="container-x max-w-5xl text-center">
        <span class="font-serif text-8xl leading-none text-stone" aria-hidden="true" v-reveal>“</span>
        <blockquote class="mt-2 font-serif text-[1.9rem] leading-snug text-charcoal sm:text-[2.6rem]" v-reveal="100">
          {{ project.testimonial.quote }}
        </blockquote>
        <figcaption class="mt-8 text-xs tracking-[0.25em] text-muted uppercase" v-reveal="200">— {{ project.testimonial.name }}</figcaption>
      </figure>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="container-x border-t border-stone/70 py-24 sm:py-32">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 class="heading-lg" v-reveal>Shu yo‘nalishdagi <em class="text-bronze">boshqa loyihalar</em></h2>
        <RouterLink :to="`/projects/category/${category.slug}`" class="group flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase" v-reveal="100">
          <span class="link-underline">{{ category.name }} — barchasi</span>
          <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
        </RouterLink>
      </div>
      <div class="mt-14 grid gap-12 md:grid-cols-2 lg:gap-16">
        <ProjectCard v-for="(p, i) in related" :key="p.slug" :project="p" aspect="aspect-5/4" :delay="i * 120" />
      </div>
    </section>

    <!-- Next project -->
    <RouterLink :to="`/projects/${next.slug}`" class="group relative flex h-[85svh] min-h-[520px] items-center justify-center overflow-hidden bg-charcoal text-center text-ivory" data-cursor="Keyingi">
      <img :src="next.cover" :alt="next.title" class="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-[2s] ease-luxe group-hover:scale-105 group-hover:opacity-65" loading="lazy" />
      <div class="relative px-5">
        <p class="text-[0.65rem] tracking-[0.4em] text-sand uppercase" v-reveal>Keyingi loyiha</p>
        <p class="mt-6 font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95]" v-reveal="100">{{ next.title }}</p>
        <p class="mt-6 text-sm text-ivory/75" v-reveal="200">{{ getCategory(next.category)?.name }} · {{ next.location }}</p>
        <span class="mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-ivory/40 transition-all duration-700 group-hover:scale-110 group-hover:bg-ivory group-hover:text-charcoal" v-reveal="300">
          <BaseIcon name="arrow-right" :size="22" />
        </span>
      </div>
    </RouterLink>

    <ImageLightbox v-model:index="lightboxIndex" :open="lightboxOpen" :images="gallery" :title="project.title" @close="lightboxOpen = false" />
  </article>
</template>
