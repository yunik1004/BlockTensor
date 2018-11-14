// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
/* Ignore pre-defined elements in Blockly */
Vue.config.ignoredElements = ['xml', 'category', 'block', 'value', 'field']

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: '/graphql'
  })
})

Vue.use(VueApollo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
