export default [
  {
    path: '/explore',
    name: 'explore',
    component: () => import('@/components/data-exploration/DataExplorationView.vue'),
  },
  {
    path: '/explore/institution/:institutionid([a-fA-F0-9-]+)/',
    name: 'institution',
    component: () => import('@/components/data-exploration/institution/InstitutionView.vue'),
  },
  {
    path: '/explore/period/:periodid([a-fA-F0-9-]+)/',
    name: 'period',
    component: () => import('@/components/data-exploration/period/PeriodView.vue'),
  },
  {
    path: '/explore/person/:personid([a-fA-F0-9-]+)/',
    name: 'person',
    component: () => import('@/components/data-exploration/person/PersonView.vue'),
  },
];
