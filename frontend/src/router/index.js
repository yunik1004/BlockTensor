import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Scratch from '@/components/Scratch'
import Scroll from '@/components/Scroll'
import Select from '@/components/Select'
import NotFound from '@/components/NotFound'
import Swal from '@/components/Swal'
import Template from '@/components/Template'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Scroll', component: Scroll },
    { path: '/scratch', name: 'Scratch', component: Scratch },
    { path: '/select', name: 'Select', component: Select },
    { path: '/swal', name: 'Swal', component: Swal },
    { path: '/template', name: 'Template', component: Template },

    { path: '*', name: 'NotFound', component: NotFound },
    { path: '/test', name: 'Main', component: Main }
  ]
})
