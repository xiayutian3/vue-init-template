const routes = [
  {
    path: '/',
    name: 'map',
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "map" */ '../views/Home.vue')
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '',
        name: 'subAbort',
        component: () => import(/* webpackChunkName: "subAbort" */ '../views/SubAbout.vue')
      }
    ]
  }
]
export default routes
