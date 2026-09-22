<script setup>
import { computed, reactive, ref } from 'vue'
import { categories } from '../data/projects'
import { contact } from '../data/site'
import BaseIcon from './BaseIcon.vue'

const form = reactive({ name: '', phone: '', type: '', area: '', message: '', website: '' /* honeypot */ })
const touched = reactive({ name: false, phone: false, message: false })
const status = ref('idle') // idle | sending | success | error

const rules = {
  name: (v) => (v.trim().length < 2 ? 'Iltimos, ismingizni kiriting.' : ''),
  phone: (v) => {
    const digits = v.replace(/\D/g, '')
    if (!v.trim()) return 'Iltimos, telefon raqamingizni kiriting.'
    if (!/^\+?[\d\s()-]+$/.test(v.trim()) || digits.length < 9 || digits.length > 15)
      return 'Telefon raqami noto‘g‘ri. Masalan: +998 90 123 45 67'
    return ''
  },
  message: (v) => (v.trim().length < 10 ? 'Loyihangiz haqida biroz yozing (kamida 10 ta belgi).' : ''),
}

const errors = computed(() => Object.fromEntries(Object.keys(rules).map((k) => [k, rules[k](form[k])])))
const show = (field) => touched[field] && errors.value[field]

async function submit() {
  Object.keys(touched).forEach((k) => (touched[k] = true))
  const firstInvalid = Object.keys(rules).find((k) => errors.value[k])
  if (firstInvalid) {
    document.getElementById(`field-${firstInvalid}`)?.focus()
    return
  }
  if (form.website) return // bot

  status.value = 'sending'
  try {
    if (contact.formEndpoint) {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, type: form.type, area: form.area, message: form.message }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
    } else {
      // Demo rejim — src/data/site.js da formEndpoint ko‘rsatilmagan
      await new Promise((r) => setTimeout(r, 900))
    }
    status.value = 'success'
    Object.assign(form, { name: '', phone: '', type: '', area: '', message: '' })
    Object.keys(touched).forEach((k) => (touched[k] = false))
  } catch {
    status.value = 'error'
  }
}

const inputClass =
  'peer w-full border-0 border-b bg-transparent px-0 pt-6 pb-3 text-lg text-charcoal placeholder-transparent transition-colors duration-300 focus:ring-0 focus:outline-none'
const labelClass =
  'pointer-events-none absolute top-6 left-0 text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.62rem] peer-focus:tracking-[0.2em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.62rem] peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:uppercase'
const smallLabel = 'block text-[0.62rem] tracking-[0.2em] text-muted uppercase'
</script>

<template>
  <div class="relative bg-ivory p-7 shadow-[0_40px_90px_-50px_rgba(31,29,27,0.45)] sm:p-12">
    <Transition name="fade" mode="out-in">
      <div v-if="status === 'success'" key="ok" class="flex min-h-[520px] flex-col items-center justify-center text-center">
        <span class="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal text-ivory">
          <BaseIcon name="check" :size="26" />
        </span>
        <h3 class="mt-8 text-4xl">Rahmat!</h3>
        <p class="mt-3 max-w-sm text-muted">Xabaringiz yuborildi. Bir ish kuni ichida siz bilan bog‘lanaman.</p>
        <button type="button" class="link-underline mt-8 text-xs tracking-[0.2em] uppercase" @click="status = 'idle'">
          Yana xabar yuborish
        </button>
      </div>

      <form v-else key="form" novalidate @submit.prevent="submit">
        <h3 class="text-3xl sm:text-4xl">Konsultatsiyaga yozilish</h3>
        <p class="mt-2 text-sm text-muted">* bilan belgilangan maydonlar majburiy.</p>

        <div class="mt-8 space-y-7">
          <div class="grid gap-7 sm:grid-cols-2">
            <div class="relative">
              <input
                id="field-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Ismingiz"
                :class="[inputClass, show('name') ? 'border-red-700' : 'border-stone focus:border-charcoal']"
                :aria-invalid="!!show('name')"
                aria-describedby="error-name"
                @blur="touched.name = true"
              />
              <label for="field-name" :class="labelClass">Ismingiz *</label>
              <p id="error-name" class="mt-2 min-h-5 text-sm text-red-700" aria-live="polite">{{ show('name') || '' }}</p>
            </div>
            <div class="relative">
              <input
                id="field-phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                inputmode="tel"
                placeholder="Telefon"
                :class="[inputClass, show('phone') ? 'border-red-700' : 'border-stone focus:border-charcoal']"
                :aria-invalid="!!show('phone')"
                aria-describedby="error-phone"
                @blur="touched.phone = true"
              />
              <label for="field-phone" :class="labelClass">Telefon raqamingiz *</label>
              <p id="error-phone" class="mt-2 min-h-5 text-sm text-red-700" aria-live="polite">{{ show('phone') || '' }}</p>
            </div>
          </div>

          <div class="grid gap-7 sm:grid-cols-2">
            <div>
              <label for="field-type" :class="smallLabel">Loyiha turi</label>
              <select
                id="field-type"
                v-model="form.type"
                class="mt-2 w-full border-0 border-b border-stone bg-transparent px-0 py-3 text-lg text-charcoal focus:border-charcoal focus:ring-0 focus:outline-none"
              >
                <option value="">Tanlang</option>
                <option v-for="c in categories" :key="c.slug" :value="c.name">{{ c.name }}</option>
                <option value="Boshqa">Boshqa</option>
              </select>
            </div>
            <div>
              <label for="field-area" :class="smallLabel">Taxminiy maydon, m²</label>
              <input
                id="field-area"
                v-model="form.area"
                type="text"
                inputmode="numeric"
                placeholder="Masalan, 120"
                class="mt-2 w-full border-0 border-b border-stone bg-transparent px-0 py-3 text-lg text-charcoal placeholder-stone focus:border-charcoal focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <div class="relative">
            <textarea
              id="field-message"
              v-model="form.message"
              rows="4"
              placeholder="Xabar"
              :class="[inputClass, 'resize-none', show('message') ? 'border-red-700' : 'border-stone focus:border-charcoal']"
              :aria-invalid="!!show('message')"
              aria-describedby="error-message"
              @blur="touched.message = true"
            />
            <label for="field-message" :class="labelClass">Loyihangiz haqida qisqacha *</label>
            <p id="error-message" class="mt-2 min-h-5 text-sm text-red-700" aria-live="polite">{{ show('message') || '' }}</p>
          </div>

          <!-- Honeypot: odamlarga ko‘rinmaydi, botlarni ushlaydi -->
          <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
        </div>

        <p v-if="status === 'error'" class="mt-6 text-sm text-red-700" role="alert">
          Xatolik yuz berdi. Qaytadan urinib ko‘ring yoki {{ contact.phone }} raqamiga qo‘ng‘iroq qiling.
        </p>

        <div class="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" class="btn-dark group w-full sm:w-auto" :disabled="status === 'sending'">
            <template v-if="status === 'sending'">
              <span class="h-4 w-4 animate-spin rounded-full border border-ivory/30 border-t-ivory" /> Yuborilmoqda…
            </template>
            <template v-else>
              Xabar yuborish
              <BaseIcon name="arrow-right" :size="16" class="transition-transform duration-500 group-hover:translate-x-1" />
            </template>
          </button>
          <p class="text-xs text-muted">Birinchi konsultatsiya — bepul.</p>
        </div>
      </form>
    </Transition>
  </div>
</template>
