<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="overflow-hidden border-y border-stone/70 py-7 select-none sm:py-9" aria-hidden="true">
    <div class="flex w-max animate-marquee hover:[animation-play-state:paused]">
      <template v-for="copy in 2" :key="copy">
        <span
          v-for="item in items"
          :key="`${copy}-${item}`"
          class="flex items-center gap-10 pr-10 font-serif text-4xl whitespace-nowrap text-charcoal italic sm:text-6xl"
        >
          {{ item }}
          <span class="h-2 w-2 rotate-45 bg-taupe" />
        </span>
      </template>
    </div>
  </div>
</template>
