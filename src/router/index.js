import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/components/home/HomeView.vue';
import main from '@/router/main';
import data from '@/router/data';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...main,
    ...data,
  ],
});

export default router;
