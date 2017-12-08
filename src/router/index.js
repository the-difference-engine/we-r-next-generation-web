import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import footer from '@/components/footer'
import campInfo from '@/components/campInfo'
import login from '@/components/login'
import signup from '@/components/signup'
import profile from '@/components/profile'
import nullComp from '@/components/nullComp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
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
        header: nullComp,
        footer: nullComp
      }
    },
    {
      path: '/signup',
      name: 'signup',
      components: {
        default: signup,
        header: nullComp,
        footer: nullComp
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: profile,
        header: header,
        footer: footer
      }
    },
  ]
})
