import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Kezdőlap' },
    },
    {
      name: '404',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/PageNotFoundView.vue'),
      meta: { title: '404' },
    },
  ],
});

export default router;
