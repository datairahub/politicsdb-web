export default [
  {
    path: '/data',
    name: 'data',
    component: () => import('@/components/data/DataView.vue'),
  },
  {
    path: '/data/institution/:institutionid([a-fA-F0-9-]+)/',
    name: 'institution',
    component: () => import('@/components/institution/InstitutionView.vue'),
  },
];
