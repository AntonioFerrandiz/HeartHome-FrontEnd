import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lessor from '../components/Lessor.vue'
import Tenant from '../components/Tenant.vue'
import Property from '../components/Property.vue'
import ViewProperty from '../components/ViewProperty.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lessors',
    name: 'Lessors',
    component: Lessor
  },
  {
    path: '/tenants',
    name: 'Tenants',
    component: Tenant
  },
  {
    path: '/properties',
    name: 'Property',
    component: Property
  },
  {
    path: '/properties/Casa',
    name: 'Casa Campo',
    component: ViewProperty
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
