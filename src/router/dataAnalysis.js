export default [
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('@/components/data-analysis/DataAnalysisView.vue'),
  },
  {
    path: '/analysis/institution/:institutionid([a-fA-F0-9-]+)/age/',
    name: 'analysis-institution-age',
    component: () => import('@/components/data-analysis/institution/InstitutionAgeView.vue'),
  },
];
