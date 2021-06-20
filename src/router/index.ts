import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { isAuthenticated } from '../api/api'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    //login page
    component: () => import('../views/Login.vue')
  },
  {
    path: '/list/:id',
    name: 'List',
    //List page
    component: () => import('../views/List.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  }
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated()) {
    next({ name: 'Login' })
  } else
    next()
})

export default router