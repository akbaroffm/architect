<script setup>
import { computed, ref, watch } from 'vue'
import { useDialog } from '../composables/useDialog'
import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  images: { type: Array, default: () => [] },
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
})
const index = defineModel('index', { type: Number, default: 0 })
const emit = defineEmits(['close'])

const root = ref(null)
const direction = ref('next')
const count = computed(() => props.images.length)

function go(step) {
  if (count.value < 2) return
  direction.value = step > 0 ? 'next' : 'prev'
  index.value = (index.value + step + count.value) % count.value
}

useDialog(
  () => props.open,
  root,
  (e) => {
    if (e.key === 'Escape') {
      emit('close')
    } else if (e.key === 'ArrowRight') go(1)
    else if (e.key === 'ArrowLeft') go(-1)
  },
)

// Preload neighbours so navigation feels instant.
watch([() => props.open, index], () => {
  if (!props.open) return
  for (const step of [1, -1]) {
    const src = props.images[(index.value + step + count.value) % count.value]
    if (src) new Image().src = src
  }
})

// Swipe on touch devices
let startX = 0
let startY = 0
function onTouchStart(e) {
  startX = e.touches[0].clientX
  startY = e.touches[0].clientY
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - startX
  const dy = e.changedTouches[0].clientY - startY
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  else if (dy > 120 && Math.abs(dy) > Math.abs(dx)) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        ref="root"
        class="fixed inset-0 z-70 flex flex-col bg-[#141312]/97 text-ivory"
        role="dialog"
        aria-modal="true"
        :aria-label="`${title} — rasmlar`"
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div class="flex items-center justify-between px-5 py-4 sm:px-8">
          <p class="text-xs tracking-[0.25em] text-ivory/70 uppercase tabular-nums">
            {{ String(index + 1).padStart(2, '0') }} / {{ String(count).padStart(2, '0') }}
            <span class="ml-3 hidden normal-case tracking-normal text-ivory/50 sm:inline">{{ title }}</span>
          </p>
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-ivory/10"
            aria-label="Yopish"
            data-autofocus
            @click="emit('close')"
          >
            <BaseIcon name="x" :size="22" />
          </button>
        </div>

        <div class="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-20" @click.self="emit('close')">
          <Transition :name="`slide-${direction}`" mode="out-in">
            <img
              :key="images[index]"
              :src="images[index]"
              :alt="`${title} — ${index + 1}-rasm`"
              class="max-h-full max-w-full object-contain shadow-2xl select-none"
              draggable="false"
            />
          </Transition>

          <template v-if="count > 1">
            <button
              type="button"
              class="absolute top-1/2 left-3 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-charcoal sm:flex"
              aria-label="Oldingi rasm"
              @click="go(-1)"
            >
              <BaseIcon name="chevron-left" :size="22" />
            </button>
            <button
              type="button"
              class="absolute top-1/2 right-3 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-charcoal sm:flex"
              aria-label="Keyingi rasm"
              @click="go(1)"
            >
              <BaseIcon name="chevron-right" :size="22" />
            </button>
          </template>
        </div>

        <!-- Dots (mobile hint for swipe) -->
        <div v-if="count > 1" class="flex justify-center gap-1 pb-4">
          <button
            v-for="(img, i) in images"
            :key="img"
            type="button"
            class="group px-1 py-3"
            :aria-label="`${i + 1}-rasm`"
            :aria-current="i === index"
            @click="go(i - index)"
          >
            <span
              class="block h-1 rounded-full transition-all duration-500"
              :class="i === index ? 'w-8 bg-ivory' : 'w-3 bg-ivory/30 group-hover:bg-ivory/60'"
            />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
