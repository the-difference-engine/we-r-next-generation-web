import Vue from 'vue'
import Router from 'vue-router'
import wernxgHeader from '@/components/wernxgHeader'
import wernxgFooter from '@/components/wernxgFooter'
import campInfo from '@/components/campInfo'
import successStories from '@/components/successStories'
import login from '@/components/login'
import signup from '@/components/signup'
import profile from '@/components/profile'
import volunteer from '@/components/volunteer'
import faq from '@/components/faq'
import donate from '@/components/donate'
import nullComp from '@/components/nullComp'
import homePage from '@/components/homePage'
import newLogin from '@/components/newLogin'
import forgotPassword from '@/components/forgotPassword'
import confirmation from '@/components/confirmation'
import opportunities from '@/components/opportunities'
import newPassword from '@/components/newPassword'
import adminApplications from '@/components/adminApplications'
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
      path: '/forgotPassword',
      name: 'forgotPassword',
      components: {
        default: forgotPassword,
        header: wernxgHeader,
        footer: nullComp
      }
    },
    {
      path: '/newPassword/:token',
      name: 'newPassword',
      components: {
        default: newPassword,
        header: wernxgHeader,
        footer: nullComp
      }
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
      path: '/opportunities',
      name: 'Opportunities',
      components: {
        default: opportunities,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/adminApplications',
      name: 'Admin Applications',
      components: {
        default: adminApplications,
        header: nullComp,
        footer: nullComp
      },
      beforeEnter: sessionCheck
    }
  ]
})
