import { nextTick, onBeforeUnmount, watch } from 'vue'
import { lockScroll, unlockScroll } from './useScrollLock'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Shared dialog behaviour: scroll lock, focus on open, Tab focus trap,
 * focus restore on close, and keyboard handling.
 *
 * @param {() => boolean} isOpen   reactive getter
 * @param {import('vue').Ref<HTMLElement>} container
 * @param {(e: KeyboardEvent) => void} onKey  extra key handling (Esc, arrows…)
 * @param {() => boolean} [isPaused]  true while a nested dialog is on top
 */
export function useDialog(isOpen, container, onKey, isPaused = () => false) {
  let previous = null

  function handleKey(e) {
    if (isPaused()) return
    if (e.key === 'Tab' && container.value) {
      const items = [...container.value.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
      return
    }
    onKey?.(e)
  }

  function open() {
    previous = document.activeElement
    lockScroll()
    document.addEventListener('keydown', handleKey)
    nextTick(() => container.value?.querySelector('[data-autofocus]')?.focus({ preventScroll: true }))
  }

  function close() {
    unlockScroll()
    document.removeEventListener('keydown', handleKey)
    previous?.focus?.({ preventScroll: true })
  }

  watch(isOpen, (v, old) => {
    if (v && !old) open()
    else if (!v && old) close()
  })

  onBeforeUnmount(() => {
    if (isOpen()) close()
  })
}
