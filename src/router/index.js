import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import isAuthenticatedGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "full-page" */ '@/views/FullPageView.vue'),
    children: [
      {
        meta: {
          title: 'Login'
        },
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "full-page" */ '@/views/full-page/LoginView.vue')
      }
    ]
  },
  {
    meta: {
      title: 'Clientes'
    },
    path: '/clientes',
    name: 'clientes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter: isAuthenticatedGuard,
    component: () => import(/* webpackChunkName: "clientes" */ '@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Tickets'
    },
    path: '/tickets',
    name: 'tickets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter: isAuthenticatedGuard,
    component: () => import(/* webpackChunkName: "clientes" */ '@/views/TicketsView.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter: isAuthenticatedGuard,
    component: HomeView
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Reservas'
    },
    path: '/reservas',
    name: 'reservas',
    beforeEnter: isAuthenticatedGuard,
    component: () => import(/* webpackChunkName: "clientes" */ '@/views/ReservesView')
  },

  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    beforeEnter: isAuthenticatedGuard,
    component: () => import(/* webpackChunkName: "forms" */ '@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    beforeEnter: isAuthenticatedGuard,
    component: () => import(/* webpackChunkName: "profile" */ '@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'New Client'
    },
    path: '/client/new',
    name: 'client.new',
    beforeEnter: isAuthenticatedGuard,
    component: () => import(/* webpackChunkName: "client-form" */ '@/views/ClientFormView.vue')
  },
  {
    meta: {
      title: 'Edit Client'
    },
    path: '/client/:id',
    name: 'client.edit',
    beforeEnter: isAuthenticatedGuard,
    component: () => import(/* webpackChunkName: "client-form" */ '@/views/ClientFormView.vue'),
    props: true
  }

]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router

export function useRouter () {
  return router
}
