import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/',
    redirect: '/resume',
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('../views/Resume.vue'),
  },
  {
    path: '/movies',
    name: 'movies',
    component: () =>
      import('../views/Movies.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
