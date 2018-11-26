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
    { path: '/', name: 'Main', component: Main },
    { path: '/scratch', name: 'Scratch', component: Scratch },
    { path: '/Scroll', name: 'Scroll', component: Scroll },
    { path: '/Select', name: 'Select', component: Select },
    { path: '*', name: 'NotFound', component: NotFound },
    { path: '/Swal', name: 'Swal', component: Swal },
    { path: '/Template', name: 'Template', component: Template }
  ]
})
