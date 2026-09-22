import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { getCategory, getProject } from './data/projects'
import { coverPage, setReady, uncoverPage } from './composables/appState'
import { scrollToTop } from './composables/lenis'
import { setSeo } from './composables/useSeo'

// `dark: true` — the page opens with a full-bleed photo, so the header starts light-on-dark.
const routes = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue'), meta: { dark: true, label: 'Bosh sahifa' } },
  { path: '/projects', name: 'projects', component: () => import('./pages/ProjectsPage.vue'), meta: { label: 'Loyihalar' } },
  {
    path: '/projects/category/:category',
    name: 'category',
    component: () => import('./pages/ProjectsPage.vue'),
    meta: { dark: true },
  },
  { path: '/projects/:slug', name: 'project', component: () => import('./pages/ProjectPage.vue'), meta: { dark: true } },
  { path: '/services', name: 'services', component: () => import('./pages/ServicesPage.vue'), meta: { label: 'Xizmatlar' } },
  { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue'), meta: { label: 'Men haqimda' } },
  { path: '/contact', name: 'contact', component: () => import('./pages/ContactPage.vue'), meta: { label: 'Aloqa' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFoundPage.vue'), meta: { label: '404' } },
]

function labelFor(to) {
  if (to.name === 'project') return getProject(to.params.slug)?.title ?? ''
  if (to.name === 'category') return getCategory(to.params.category)?.name ?? ''
  return to.meta.label ?? ''
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scrolling is handled while the curtain covers the page (see below).
  scrollBehavior: () => false,
})

router.beforeEach(async (to, from) => {
  if (!from.matched.length || to.path === from.path) return
  setReady(false)
  await coverPage(labelFor(to))
})

router.afterEach(async (to, from, failure) => {
  if (failure) return uncoverPage().then(() => setReady(true))
  setSeo({ title: to.name === 'home' ? '' : labelFor(to) })
  if (!from.matched.length || to.path === from.path) return
  await nextTick()
  scrollToTop()
  setTimeout(() => setReady(true), 500)
  await uncoverPage()
})

export default router
