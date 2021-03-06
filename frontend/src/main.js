// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import VueFullpage from 'fullpage-vue'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VuePromiseBtn from 'vue-promise-btn'
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css'
import 'fullpage-vue/src/fullpage.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-promise-btn/dist/vue-promise-btn.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueFullpage)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
Vue.use(VuePromiseBtn)

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: '/graphql'
  })
})

Vue.use(VueApollo)

/* Ignore pre-defined elements in other libraries */
Vue.config.ignoredElements = ['xml', 'category', 'block', 'value', 'field', 'vr1', 'vr2']

export const store = new Vuex.Store({
  state: {
    firstRun: true,
    test1inputs: [],
    test1labels: [],
    test1tests: []
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
