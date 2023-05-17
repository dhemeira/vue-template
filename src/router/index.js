import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    document.querySelector('.drawer-content').scrollTo(0, 0)
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Home' },
    },
    {
      name: 'Error',
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/ErrorView.vue'),
      meta: { title: '404' },
    },
  ],
});

export default router;
