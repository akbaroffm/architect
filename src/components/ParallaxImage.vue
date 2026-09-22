<script setup>
import { onMounted, ref } from 'vue'
import { useParallax } from '../composables/useParallax'

/** An image that drifts gently inside its frame while scrolling and fades in once loaded. */
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  strength: { type: Number, default: 7 },
  eager: { type: Boolean, default: false },
})

// The image overhangs the frame by the parallax range (+1% safety) on each side.
const overhang = props.strength + 1
const frame = ref(null)
const img = ref(null)
const loaded = ref(false)
useParallax(frame, img, props.strength)
onMounted(() => {
  if (img.value?.complete && img.value.naturalWidth) loaded.value = true
})
</script>

<template>
  <div ref="frame" class="relative overflow-hidden bg-sand">
    <img
      ref="img"
      :src="src"
      :alt="alt"
      class="img-fade absolute inset-x-0 w-full max-w-none object-cover transition-opacity duration-900 ease-luxe will-change-transform"
      :class="loaded && 'is-loaded'"
      :style="{ top: `-${overhang}%`, height: `${100 + overhang * 2}%` }"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      @load="loaded = true"
    />
  </div>
</template>
