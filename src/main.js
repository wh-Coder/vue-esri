import Vue from 'vue'
import App from './App.vue'
import Map from './Map.vue'
import VueRouter from 'vue-router'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
        path: '/',
        component: { template: '<div>root</div>' }
    }, {
        path: '/map',
        component: Map,
        children: [{
            name: 'foo',
            path: '/foo',
            component: Foo
        }, {
            name : 'bar',
            path: '/bar',
            component: Bar
        }]
    }]
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
