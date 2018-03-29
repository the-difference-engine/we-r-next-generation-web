import Vue from 'vue'
import Router from 'vue-router'
import {sessionCheck, adminCheck} from '../sessionUtils'

import adminApplications from '@/components/adminApplications'
import adminNavbar from '@/components/adminNavbar'
import campInfo from '@/components/campInfo'
import camper from '@/components/camper'
import applications from '@/components/applications'
import confirmation from '@/components/confirmation'
import donate from '@/components/donate'
import faq from '@/components/faq'
import forgotPassword from '@/components/forgotPassword'
import homePage from '@/components/homePage'
import login from '@/components/login'
import newLogin from '@/components/newLogin'
import campex_create from '@/components/campex_create'
import campex_single from '@/components/campex_single'
import newPassword from '@/components/newPassword'
import nullComp from '@/components/nullComp'
import opportunities from '@/components/opportunities'
import partner from '@/components/partner'
import profile from '@/components/profile'
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
      },
      beforeEnter: adminCheck
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
      name: 'camper',
      components: {
        default: camper,
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
      path: '/partner',
      name: 'partner',
      components: {
        default: partner,
        header: wernxgHeader,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/applications',
      name: 'applications',
      components: {
        default: applications,
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
      //beforeEnter: sessionCheck
      components: {
        default: users,
        header: wernxgHeader,
        footer: wernxgFooter
      },
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
        header: adminNavbar,
        footer: nullComp
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/camp/create',
      name: 'CreateCamp',
      components: {
        default: campex_create,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/camp/:id',
      name: 'ViewCamp',
      components: {
        default: campex_single,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
  ]
})
