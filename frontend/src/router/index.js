import Vue from 'vue'
import Router from 'vue-router'
import Scratch from '@/components/Scratch'
import Scroll from '@/components/Scroll'
import NotFound from '@/components/NotFound'
import Swal from '@/components/Swal'
import Template from '@/components/Template'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Scroll', component: Scroll },
    { path: '/template', name: 'Template', component: Template },
    { path: '/scratch/:stageName', name: 'Scratch', component: Scratch },

    { path: '*', name: 'NotFound', component: NotFound },

    { path: '/swal', name: 'Swal', component: Swal }
  ]
})
