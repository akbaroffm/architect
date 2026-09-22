import { lenis } from './lenis'

// Ref-counted body scroll lock, so a lightbox opened on top of the mobile
// menu (or similar) does not unlock the page when it closes.
let locks = 0

export function lockScroll() {
  if (locks++ === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    lenis?.stop()
  }
}

export function unlockScroll() {
  if (locks === 0) return
  if (--locks === 0) {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    lenis?.start()
  }
}
