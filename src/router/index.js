import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contract/new',
    name: 'NewContract',
    component: () => import('../views/NewContract.vue')
  },
  {
    path: '/contract/list',
    name: 'ContractList',
    component: () => import('../views/ContractList.vue')
  },
  {
    path: '/contract/detail/:id?',
    name: 'ContractDetail',
    component: () => import('../views/ContractDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
