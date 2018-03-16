import Vue from 'vue'
import Router from 'vue-router'

import {sessionCheck} from '../sessionUtils'

import campInfo from '@/components/campInfo'
import confirmation from '@/components/confirmation'
import donate from '@/components/donate'
import faq from '@/components/faq'
import homePage from '@/components/homePage'
import login from '@/components/login'
import newLogin from '@/components/newLogin'
import nullComp from '@/components/nullComp'
import profile from '@/components/profile'
import signup from '@/components/signup'
import successStories from '@/components/successStories'
import users from '@/components/users'
import volunteer from '@/components/volunteer'
import wernxgFooter from '@/components/wernxgFooter'
import wernxgHeader from '@/components/wernxgHeader'

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
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: login,
        header: wernxgHeader,
        footer: nullComp
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/newlogin',
      name: 'newLogin',
      components: {
        default: newLogin,
        header: wernxgHeader,
        footer: nullComp
      },
    },
    {
      path: '/signup',
      name: 'signup',
      components: {
        default: signup,
        header: wernxgHeader,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/confirmation/:token',
      name: 'confirmation',
      components: {
        default: confirmation,
        header: wernxgHeader,
        footer: nullComp
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: profile,
        header: wernxgHeader,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/volunteer',
      name: 'volunteer',
      components: {
        default: volunteer,
        header: wernxgHeader,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/faq',
      name: 'faq',
      components: {
        default: faq,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/donate',
      name: 'donate',
      components: {
        default: donate,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/home',
      name: 'homePage',
      components: {
        default: homePage,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/campInfo',
      name: 'CampInfo',
      components: {
        default: campInfo,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/successStories',
      name: 'SuccessStories',
      components: {
        default: successStories,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/users',
      name: 'View Users',
      components: {
        default: users,
        header: wernxgHeader,
        footer: wernxgFooter
      },
      //beforeEnter: sessionCheck
    }
  ]
})
