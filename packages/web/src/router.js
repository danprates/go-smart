import Vue from 'vue'
import Router from 'vue-router'
import Landpage from '@/views/landpage'

Vue.use(Router)

export default (store) => {
  const checkAuth = (redirect, auth = false) => (to, from, next) => {
    if (!!store.getters.token === auth) {
      next({ name: redirect, query: { to: to.path } })
    }

    next()
  }

  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'landpage',
        component: Landpage
      },
      {
        path: '/login',
        name: 'auth.login',
        beforeEnter: checkAuth('contracts.list', true),
        component: () => import(/* webpackChunkName: "auth.login" */ './views/auth/login.vue')
      },
      {
        path: '/cadastro',
        name: 'auth.register',
        beforeEnter: checkAuth('contracts.list', true),
        component: () => import(/* webpackChunkName: "auth.register" */ './views/auth/register.vue')
      },
      {
        path: '/saiba-mais',
        name: 'knowMore',
        component: () => import(/* webpackChunkName: "knowMore" */ './views/knowMore.vue')
      },
      {
        path: '/planos',
        name: 'user.plans',
        beforeEnter: checkAuth('auth.login'),
        component: () => import(/* webpackChunkName: "user.plans" */ './views/user/plans.vue')
      },
      {
        path: '/contratos',
        name: 'contracts.list',
        beforeEnter: checkAuth('auth.login'),
        component: () => import(/* webpackChunkName: "contracts.list" */ './views/contracts/list.vue')
      },
      {
        path: '/contratos/novo',
        name: 'contracts.create',
        beforeEnter: checkAuth('auth.login'),
        component: () => import(/* webpackChunkName: "contracts.create" */ './views/contracts/create.vue')
      },
      {
        path: '/contratos/:id',
        name: 'contracts.view',
        beforeEnter: checkAuth('auth.login'),
        component: () => import(/* webpackChunkName: "contracts.view" */ './views/contracts/view.vue')
      },
      {
        path: '/contratos/:id/compartilhar',
        name: 'contracts.share',
        beforeEnter: checkAuth('auth.login'),
        component: () => import(/* webpackChunkName: "contracts.share" */ './views/contracts/share.vue')
      },
      {
        path: '/contratos/:id/assinar',
        name: 'contracts.sign',
        component: () => import(/* webpackChunkName: "contracts.sign" */ './views/contracts/sign.vue')
      },
      {
        path: '/contratos/:id/identificacao',
        name: 'contracts.identification',
        component: () => import(/* webpackChunkName: "contracts.identification" */ './views/contracts/identification.vue')
      },
      {
        path: '/contratos/:id/assinado',
        name: 'contracts.signed',
        component: () => import(/* webpackChunkName: "contracts.signed" */ './views/contracts/signed.vue')
      },
      {
        path: '/contratos/:id/recusar',
        name: 'contracts.decline',
        component: () => import(/* webpackChunkName: "contracts.decline" */ './views/contracts/decline.vue')
      },
      {
        path: '/contratos/:id/recusado',
        name: 'contracts.refused',
        component: () => import(/* webpackChunkName: "contracts.refused" */ './views/contracts/refused.vue')
      }
    ]
  })

  return router
}
