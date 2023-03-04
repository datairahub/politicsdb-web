import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/components/home/HomeView.vue';
import main from '@/router/main';
import dataExplore from '@/router/dataExplore';
import dataAnalysis from '@/router/dataAnalysis';
import dataDownload from '@/router/dataDownload';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...main,
    ...dataExplore,
    ...dataAnalysis,
    ...dataDownload,
  ],
});

export default router;
