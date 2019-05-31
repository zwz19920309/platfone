import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage')
const platform = r => require.ensure([], () => r(require('@/page/signon/platform')), 'platform')
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: manage
    },
    {
      path: '/manage',
      component: manage,
      name: '',
      children: [{
        path: '/platform',
        component: platform,
        meta: []
      }
      ]
    }]
})
