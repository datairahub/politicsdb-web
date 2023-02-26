import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/components/home/HomeView.vue';
import MainRoutes from '@/router/main';
import DataRoutes from '@/router/data';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...MainRoutes,
    ...DataRoutes,
  ],
});

export default router;
