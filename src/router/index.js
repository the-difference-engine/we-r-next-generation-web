import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import footer from '@/components/footer'
import campInfo from '@/components/campInfo'
import login from '@/components/login'
import signup from '@/components/signup'
import profile from '@/components/profile'
import volunteer from '@/components/volunteer'
import faq from '@/components/faq'
import donate from '@/components/donate'
import nullComp from '@/components/nullComp'
import homePage from '@/components/homePage'

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
    {
      path: '/volunteer',
      name: 'volunteer',
      components: {
        default: volunteer,
        header: header,
        footer: footer
      }
    },
    {
      path: '/faq',
      name: 'faq',
      components: {
        default: faq,
        header: header,
        footer: footer
      }
    },
    {
      path: '/donate',
      name: 'donate',
      components: {
        default: donate,
        header: header,
        footer: footer
      }
    },
    {
      path: '/home',
      name: 'homePage',
      components: {
        default: homePage,
        header: header,
        footer: footer
      }
    }
  ]
})
