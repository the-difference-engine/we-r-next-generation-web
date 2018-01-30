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
import {sessionCheck} from '../sessionUtils'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Root',
      components: {
        default: homePage,
        header: header,
        footer: footer
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: login,
        header: header,
        footer: nullComp
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/signup',
      name: 'signup',
      components: {
        default: signup,
        header: header,
        footer: footer
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: profile,
        header: header,
        footer: footer
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/volunteer',
      name: 'volunteer',
      components: {
        default: volunteer,
        header: header,
        footer: footer
      },
      beforeEnter: sessionCheck
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
    },
    {
      path: '/campInfo',
      name: 'CampInfo',
      components: {
        default: campInfo,
        header: header,
        footer: footer
      }
    }
  ]
})
