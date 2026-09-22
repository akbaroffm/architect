import { designer } from '../data/site'

const SUFFIX = `${designer.name} — ${designer.title}`

function setTag(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [key, name] = selector.match(/\[(\w+)="([^"]+)"\]/).slice(1)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Sets the page <title>, description and Open Graph tags. */
export function setSeo({ title, description, image } = {}) {
  const full = title ? `${title} — ${designer.name}` : SUFFIX
  document.title = full
  const desc = description || designer.tagline
  setTag('meta[name="description"]', 'content', desc)
  setTag('meta[property="og:title"]', 'content', full)
  setTag('meta[property="og:description"]', 'content', desc)
  if (image) setTag('meta[property="og:image"]', 'content', image)
}
