import 'babel-polyfill'
import Vue from 'vue'
import ES6Promise from 'es6-promise'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import App from './App'
// import VueAnalytics from 'vue-analytics'

ES6Promise.polyfill()

sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: '#root',
    store,
    router,
    render: h => h(App)
})

// if (process.env.GA) {
//     Vue.use(VueAnalytics, {
//         id: 'UA-121890591-1',
//         router
//     })
// }
// Vue.use({
//     nVue
// });
//
// if(process.env.GA){
//     Vue.use(VueAnalytics, {
//         id: process.env.GA,
//         disableScriptLoader: true,
//         router,
//         autoTraking: {
//             pageviewOnload: false
//         }
//     })
// }
