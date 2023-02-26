export default [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/components/about/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/components/contact/ContactView.vue'),
  },
  {
    path: '/contrib',
    name: 'contrib',
    component: () => import('@/components/contrib/ContribView.vue'),
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: () => import('@/components/faqs/FAQsView.vue'),
  },
  {
    path: '/license',
    name: 'license',
    component: () => import('@/components/license/LicenseView.vue'),
  },
];
