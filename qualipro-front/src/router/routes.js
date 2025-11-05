const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/users',
    children: [
      { path: '/users', name: 'user.list', component: () => import('pages/users/list.vue') },
      { path: '/users/create', meta: { role: "Admin" }, name: 'user.create', component: () => import('pages/users/form.vue') },
      { path: '/users/edit/:id', meta: { role: "Admin" }, name: 'user.edit', component: () => import('pages/users/form.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    redirect: '/auth/login',
    children: [
      { path: 'login', component: () => import('pages/Auth/login.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
