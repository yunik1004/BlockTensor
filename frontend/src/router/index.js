import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Scratch from '@/components/Scratch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/scratch',
      name: 'Scratch',
      component: Scratch
    }
  ]
})
