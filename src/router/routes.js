
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LogMood.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/report', component: () => import('pages/ReportMood.vue') },
      { path: '/user', component: () => import('pages/User.vue') },
      { path: '/register', component: () => import('pages/Registration.vue') }
    
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
