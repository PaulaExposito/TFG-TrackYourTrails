
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Explore.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'tracker', component: () => import('pages/Tracker.vue')},
      { path: 'explore', component: () => import('pages/Explore.vue')},
      { path: 'trail', component: () => import('pages/Trail.vue')},
      { path: 'events', component: () => import('pages/Events.vue')},
      { path: 'profile', component: () => import('pages/Profile.vue')},
      { path: 'mytrails', component: () => import('pages/MyTrails.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
