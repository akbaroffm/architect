<script setup>
import { process } from '../data/site'
import BaseIcon from './BaseIcon.vue'
</script>

<template>
  <section class="section bg-charcoal text-ivory">
    <div class="container-x">
      <div class="grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p class="eyebrow text-taupe!" v-reveal>Ish jarayoni</p>
          <h2 class="heading-xl mt-6 text-ivory" v-reveal="100">
            Qanday <em class="text-taupe">ishlaymiz</em>
          </h2>
        </div>
        <p class="max-w-md leading-relaxed text-stone/80 lg:justify-self-end" v-reveal="200">
          Aniq va shaffof jarayon — keyingi qadam doimo sizga ma’lum, ekranda yoqtirmaguningizcha hech narsa qurilmaydi.
        </p>
      </div>

      <ol class="relative mt-20 grid gap-14 lg:grid-cols-4 lg:gap-10">
        <span
          class="absolute top-0 bottom-0 left-7 w-px bg-taupe/50 lg:top-7 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full"
          aria-hidden="true"
          v-reveal="{ variant: 'line', delay: 200 }"
        />
        <li v-for="(step, i) in process" :key="step.title" class="relative pl-20 lg:pl-0" v-reveal="300 + i * 180">
          <div
            class="absolute top-0 left-0 flex h-14 w-14 items-center justify-center rounded-full border border-taupe/60 bg-charcoal text-sand transition-colors duration-500 hover:bg-taupe hover:text-charcoal lg:relative"
          >
            <BaseIcon :name="step.icon" :size="22" :stroke="1.25" />
          </div>
          <p class="mt-1 font-serif text-sm text-taupe italic lg:mt-8">{{ String(i + 1).padStart(2, '0') }}-bosqich · {{ step.duration }}</p>
          <h3 class="mt-2 text-3xl text-ivory">{{ step.title }}</h3>
          <p class="mt-3 leading-relaxed text-stone/75">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
