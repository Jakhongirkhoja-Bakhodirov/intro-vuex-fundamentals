import { createRouter, createWebHistory } from 'vue-router';
import EventList from '../views/EventList.vue';
import EventDetails from '../views/event/Details.vue';
import EventLayout from '../views/event/Layout.vue';
import EventRegister from '../views/event/Register.vue';
import EventEdit from '../views/event/Edit.vue';
const About = () =>
  import(/* webpackChunkName:"creator" */ '../views/AboutView.vue');
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';
import NProgress from 'nprogress';
import EventService from '@/services/EventService';
import GStore from '@/store/index';

const routes = [
  {
    path: '/',
    name: 'EventList',
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      return EventService.getEventById(to.params.id)
        .then((response) => {
          GStore.event = response.data;
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' },
            };
          } else {
            return {
              name: 'NetworkError',
            };
          }
        });
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/events/:id',
    redirect: () => {
      return { name: 'EventDetails' };
    },
    children: [
      { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
      { path: 'edit', redirect: () => ({ name: 'EventEdit' }) },
    ],
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    alias: '/about',
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  NProgress.start();
  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page';
    setTimeout(() => {
      GStore.flashMessage = '';
    }, 3000);
    if (from.href) {
      return false;
    } else {
      return { path: '/' };
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
