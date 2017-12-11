import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import footer from '@/components/footer'
import landing from '@/components/landing'
import campInfo from '@/components/campInfo'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      components: {
        default: landing,
        header: header,
        footer: footer
      }
    },
    {
      path: '/info',
      name: 'campInfo',
      components: {
        default: campInfo,
        header: header,
        footer: footer
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: login,
        header: null,
        footer: null
      }
    }
  ]
})
