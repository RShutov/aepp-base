// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import VeeValidate from 'vee-validate'
import { focus } from 'vue-focus'
import App from './App.vue'
import getRouter from './router/index'
import store from './store'

Vue.use(Router)
Vue.use(VueClipboard)
Vue.use(VeeValidate, {
  dictionary: {
    en: {
      messages: {
        required: 'This field is required',
        min: (field, [length]) => `This field must be at least ${length} characters`
      }
    }
  }
})
Vue.directive('focus', focus)

console.log('use updateRPC(\'http://rpc-endpoint:8545\') to update the identity manager RPC endpoint')
window.updateRPC = function (rpcURL = 'https://kovan.infura.io') {
  store.dispatch('updateRPC', rpcURL)
}

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   console.log(to.name === 'id-manager' && !store.state.unlocked);
//   if(to.name === 'id-manager' && !store.state.unlocked) {
//     console.log(to.name, from.name);
//     next(false)
//     console.log(to.name, from );
//     next({ replace: true, name: 'unlock' })
//   }
// })

/* eslint-disable no-new */
const IdentityApp = Vue.extend({
  render: h => h(App),
  components: { App },
  store,
  router: getRouter(store)
})
const vm = new IdentityApp()
vm.$mount('#app')
