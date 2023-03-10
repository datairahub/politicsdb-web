export default [
  {
    path: '/data',
    name: 'data',
    component: () => import('@/components/data/DataView.vue'),
  },
  {
    path: '/data/institution/:institutionid([a-fA-F0-9-]+)/',
    name: 'institution',
    component: () => import('@/components/data/institution/InstitutionView.vue'),
  },
  {
    path: '/data/institution/:institutionid([a-fA-F0-9-]+)/age-all/',
    name: 'institution-age-all',
    component: () => import('@/components/data/institution/charts/InstitutionAgeAllView.vue'),
  },
  {
    path: '/data/institution/:institutionid([a-fA-F0-9-]+)/age-mean/',
    name: 'institution-age-mean',
    component: () => import('@/components/data/institution/charts/InstitutionAgeMeanView.vue'),
  },
  {
    path: '/data/period/:periodid([a-fA-F0-9-]+)/',
    name: 'period',
    component: () => import('@/components/data/period/PeriodView.vue'),
  },
  {
    path: '/data/person/:personid([a-fA-F0-9-]+)/',
    name: 'person',
    component: () => import('@/components/data/person/PersonView.vue'),
  },
];
