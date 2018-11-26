// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import VueFullpage from 'fullpage-vue'
import BootstrapVue from 'bootstrap-vue'
import VueSwal from 'vue-swal'
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'animate.css'
import 'fullpage-vue/src/fullpage.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueFullpage)
Vue.use(BootstrapVue)
Vue.use(VueSwal)

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: '/graphql'
  })
})

Vue.use(VueApollo)

/* Ignore pre-defined elements in Blockly */
Vue.config.ignoredElements = ['xml', 'category', 'block', 'value', 'field']

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
