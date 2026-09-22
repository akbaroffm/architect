<script setup>
import { computed } from 'vue'
import { curtain, CURTAIN_IN, CURTAIN_OUT } from '../composables/appState'
import { designer } from '../data/site'

/**
 * Page transition: two stacked layers (bronze leads, charcoal follows) sweep
 * up over the page with a curved, "liquid" leading edge, show the destination
 * title, then continue upwards to uncover the new page.
 */
const phase = computed(() => curtain.phase)
const vars = { '--dur-in': `${CURTAIN_IN - 100}ms`, '--dur-out': `${CURTAIN_OUT - 120}ms` }
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-90 overflow-hidden"
    :class="phase !== 'idle' && 'pointer-events-auto'"
    :style="vars"
    aria-hidden="true"
  >
    <div class="layer bg-taupe" :class="`is-${phase}`" style="--delay-in: 0ms; --delay-out: 120ms" />
    <div class="layer bg-charcoal" :class="`is-${phase}`" style="--delay-in: 100ms; --delay-out: 0ms">
      <div class="flex h-full flex-col items-center justify-center px-6 text-ivory">
        <div class="content text-center" :class="`is-${phase}`">
          <span class="mask-line">
            <span class="block font-serif text-[clamp(2.4rem,7vw,6rem)] leading-none italic" :class="phase === 'in' && 'label-in'">
              {{ curtain.label }}
            </span>
          </span>
          <span class="mx-auto mt-8 block h-px w-40 overflow-hidden bg-ivory/15">
            <span class="block h-full origin-left bg-taupe" :class="phase === 'in' && 'bar-in'" />
          </span>
        </div>
        <p class="absolute bottom-8 text-[0.6rem] tracking-[0.4em] text-taupe uppercase">{{ designer.studio }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layer {
  position: absolute;
  inset: 0;
  transform: translateY(100%);
}
/* Curved caps: the top cap bulges while rising in, the bottom cap trails on the way out. */
.layer::before,
.layer::after {
  content: '';
  position: absolute;
  left: -10%;
  right: -10%;
  height: 16vh;
  background: inherit;
  transform: scaleY(0);
}
.layer::before {
  bottom: calc(100% - 1px);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  transform-origin: bottom;
}
.layer::after {
  top: calc(100% - 1px);
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  transform-origin: top;
}

.layer.is-idle {
  transition: none;
}
.layer.is-in {
  transform: translateY(0);
  transition: transform var(--dur-in) var(--ease-curtain) var(--delay-in);
}
.layer.is-in::before {
  animation: cap var(--dur-in) var(--ease-curtain) var(--delay-in) both;
}
.layer.is-out {
  transform: translateY(-100%);
  transition: transform var(--dur-out) var(--ease-curtain) var(--delay-out);
}
.layer.is-out::after {
  animation: cap var(--dur-out) var(--ease-curtain) var(--delay-out) both;
}
@keyframes cap {
  0% { transform: scaleY(0); }
  45% { transform: scaleY(1); }
  100% { transform: scaleY(0); }
}

.label-in {
  animation: label-in 0.8s var(--ease-luxe) 0.18s both;
}
@keyframes label-in {
  from { transform: translateY(120%); }
  to { transform: none; }
}
.bar-in {
  animation: bar 1s var(--ease-luxe) 0.25s both;
}
@keyframes bar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.content {
  transition: transform 0.6s var(--ease-curtain), opacity 0.4s ease;
}
.content.is-out {
  transform: translateY(-6vh);
  opacity: 0;
}
</style>
