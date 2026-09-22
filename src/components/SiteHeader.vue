<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { contact, designer, nav } from '../data/site'
import { lockScroll, unlockScroll } from '../composables/useScrollLock'
import BaseIcon from './BaseIcon.vue'

const route = useRoute()
const scrolled = ref(false)
const hidden = ref(false)
const progress = ref(0)
const menuOpen = ref(false)

let lastY = 0
let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrolled.value = y > 40
    // Hide while scrolling down, reveal on scroll up.
    if (y > 600 && y > lastY + 2 && !menuOpen.value) hidden.value = true
    else if (y < lastY - 2 || y <= 600) hidden.value = false
    progress.value = max > 0 ? y / max : 0
    lastY = y
    ticking = false
  })
}
function onKey(e) {
  if (e.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})

watch(menuOpen, (open) => (open ? lockScroll() : unlockScroll()))
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    hidden.value = false
  },
)

// Light text while over a dark hero photo (or over the open mobile menu).
const onDark = computed(() => menuOpen.value || (route.meta.dark && !scrolled.value))
const isActive = (to) => (to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`))
const mobileNav = [{ to: '/', label: 'Bosh sahifa' }, ...nav]
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[translate,background-color,color,box-shadow] duration-700 ease-luxe"
    :class="[
      hidden ? '-translate-y-full' : 'translate-y-0',
      onDark ? 'text-ivory' : 'text-charcoal',
      scrolled && !menuOpen && 'bg-ivory/90 shadow-[0_1px_0_rgba(31,29,27,0.08)] backdrop-blur-lg',
    ]"
  >
    <div class="container-x flex items-center justify-between transition-[height] duration-500" :class="scrolled ? 'h-16 lg:h-18' : 'h-[4.5rem] lg:h-24'">
      <!-- Logo -->
      <RouterLink to="/" class="relative z-50 flex min-w-0 items-center gap-3" aria-label="Bosh sahifa">
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-serif text-[0.8rem] font-semibold tracking-wider transition-colors duration-500 lg:h-10 lg:w-10 lg:text-sm"
          :class="onDark ? 'border-ivory/40' : 'border-charcoal/25'"
          >{{ designer.initials }}</span
        >
        <span class="min-w-0 leading-none">
          <span class="block truncate font-serif text-[1.2rem] font-medium tracking-[0.01em] lg:text-[1.35rem]">{{ designer.name }}</span>
          <span class="mt-1.5 block truncate text-[0.5rem] font-medium tracking-[0.3em] uppercase opacity-60 lg:text-[0.55rem] lg:tracking-[0.35em]">
            {{ designer.title }}
          </span>
        </span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="Asosiy menyu">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="link-underline pb-1 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-opacity duration-300"
          :class="isActive(item.to) ? 'is-active opacity-100' : 'opacity-70 hover:opacity-100'"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <RouterLink
        to="/contact"
        class="group hidden items-center gap-2 border px-5 py-3 text-[0.66rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500 xl:inline-flex"
        :class="onDark ? 'border-ivory/50 hover:bg-ivory hover:text-charcoal' : 'border-charcoal/40 hover:bg-charcoal hover:text-ivory'"
      >
        Konsultatsiya
        <BaseIcon name="arrow-up-right" :size="14" class="transition-transform duration-500 group-hover:rotate-45" />
      </RouterLink>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="group relative z-50 -mr-1 flex shrink-0 items-center gap-3 pl-3 lg:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'"
        @click="menuOpen = !menuOpen"
      >
        <span class="hidden text-[0.6rem] font-medium tracking-[0.3em] uppercase min-[400px]:block">
          <span class="relative block h-3 overflow-hidden">
            <span class="block transition-transform duration-500 ease-luxe" :class="menuOpen && '-translate-y-full'">Menyu</span>
            <span class="absolute inset-x-0 top-full block transition-transform duration-500 ease-luxe" :class="menuOpen && '-translate-y-full'">Yopish</span>
          </span>
        </span>
        <span
          class="relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500"
          :class="onDark ? 'border-ivory/35' : 'border-charcoal/20'"
        >
          <span
            class="absolute h-px w-5 bg-current transition-transform duration-500 ease-luxe"
            :class="menuOpen ? 'rotate-45' : '-translate-y-[3px]'"
          />
          <span
            class="absolute h-px bg-current transition-[translate,rotate,width] duration-500 ease-luxe"
            :class="menuOpen ? 'w-5 -rotate-45' : 'w-3 translate-x-1 translate-y-[3px]'"
          />
        </span>
      </button>
    </div>

    <!-- Scroll progress -->
    <div
      class="absolute bottom-0 left-0 h-px w-full origin-left bg-bronze transition-opacity duration-500"
      :class="scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </header>

  <!-- Mobile menu (outside the header: its transform would trap position:fixed).
       Opens as a circle growing from the menu button. -->
  <Transition name="menu">
    <div
      v-if="menuOpen"
      id="mobile-menu"
      class="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-charcoal text-ivory lg:hidden"
      data-lenis-prevent
    >
      <div class="container-x flex min-h-full flex-col pt-28 pb-8">
        <p class="menu-item text-[0.6rem] font-medium tracking-[0.35em] text-taupe uppercase" style="--i: 0">Menyu</p>

        <nav class="mt-6 flex flex-col" aria-label="Mobil menyu">
          <RouterLink
            v-for="(item, i) in mobileNav"
            :key="item.to"
            :to="item.to"
            class="menu-item group flex items-center gap-4 border-b border-ivory/10 py-[1.1rem]"
            :style="{ '--i': i + 1 }"
          >
            <span class="w-6 font-sans text-[0.65rem] text-taupe tabular-nums">0{{ i + 1 }}</span>
            <span
              class="flex-1 font-serif text-[2.35rem] leading-none font-medium transition-colors duration-300 min-[400px]:text-[2.6rem]"
              :class="isActive(item.to) ? 'text-taupe italic' : 'text-ivory'"
              >{{ item.label }}</span
            >
            <BaseIcon
              name="arrow-up-right"
              :size="18"
              class="transition-transform duration-500 group-active:rotate-45"
              :class="isActive(item.to) ? 'text-taupe' : 'text-ivory/40'"
            />
          </RouterLink>
        </nav>

        <div class="menu-item mt-10 grid grid-cols-2 gap-6" style="--i: 7">
          <div class="min-w-0">
            <p class="text-[0.58rem] font-medium tracking-[0.3em] text-taupe uppercase">Aloqa</p>
            <a :href="contact.phoneHref" class="mt-3 block font-serif text-xl font-medium text-ivory">{{ contact.phone }}</a>
            <a :href="`mailto:${contact.email}`" class="mt-1 block truncate text-xs text-stone/80">{{ contact.email }}</a>
          </div>
          <div>
            <p class="text-[0.58rem] font-medium tracking-[0.3em] text-taupe uppercase">Ijtimoiy tarmoqlar</p>
            <a :href="contact.instagram.url" target="_blank" rel="noopener" class="mt-3 flex items-center gap-2 text-sm text-ivory">
              <BaseIcon name="instagram" :size="15" /> Instagram
            </a>
            <a :href="contact.telegram.url" target="_blank" rel="noopener" class="mt-2 flex items-center gap-2 text-sm text-ivory">
              <BaseIcon name="telegram" :size="15" /> Telegram
            </a>
          </div>
        </div>

        <div class="menu-item mt-auto pt-10" style="--i: 8">
          <RouterLink to="/contact" class="btn-light group w-full">
            Konsultatsiyaga yozilish
            <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
          </RouterLink>
          <p class="mt-5 text-center text-[0.58rem] tracking-[0.3em] text-stone/50 uppercase">{{ designer.studio }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Circle reveal from the menu button (top-right corner). */
.menu-enter-active,
.menu-leave-active {
  transition: clip-path 0.8s var(--ease-curtain);
}
.menu-leave-active {
  transition-duration: 0.6s;
}
.menu-enter-from,
.menu-leave-to {
  clip-path: circle(0% at calc(100% - 2.6rem) 2.25rem);
}
.menu-enter-to,
.menu-leave-from {
  clip-path: circle(150% at calc(100% - 2.6rem) 2.25rem);
}

/* Staggered rise of the menu content. */
.menu-enter-active .menu-item {
  animation: menu-item 0.9s var(--ease-luxe) both;
  animation-delay: calc(0.25s + var(--i, 0) * 0.06s);
}
.menu-leave-active .menu-item {
  transition: opacity 0.25s ease;
  opacity: 0;
}
@keyframes menu-item {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
