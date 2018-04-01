import Vue from 'vue'
import App from './App.vue'
import fileUpload from '../src/'

Vue.use(fileUpload)

new Vue({
  render: h => h(App)
}).$mount('#app')
