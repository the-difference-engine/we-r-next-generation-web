import Vue from 'vue'
import Router from 'vue-router'
import {sessionCheck, adminCheck} from '../sessionUtils'

import adminApplications from '@/components/adminApplications'
import adminNavbar from '@/components/adminNavbar'
import admin_waiver_view from '@/components/admin_waiver_view'
import admin_waiver_edit from '@/components/admin_waiver_edit'
import campInfo from '@/components/campInfo'
import camper from '@/components/camper'
import application_submitted from '@/components/application_submitted'
import confirmation from '@/components/confirmation'
import donate from '@/components/donate'
import faq from '@/components/faq'
import homePage from '@/components/homePage'
import login from '@/components/login'
import signup from '@/components/signup'
import forgotPassword from '@/components/forgotPassword'
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
import adminApp from '@/components/adminApp'

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
      //beforeEnter: adminCheck
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
      path: '/signup',
      name: 'signup',
      components: {
        default: signup,
        header: wernxgHeader,
        footer: nullComp
      },
    },
    {
      path: '/camper',
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
      name: 'opportunities',
      components: {
        default: opportunities,
        header: wernxgHeader,
        footer: wernxgFooter
      }
    },
    {
      path: '/applications/:id/submitted',
      name: 'application_submitted',
      components: {
        default: application_submitted,
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
      path: '/admin/users',
      name: 'View Users',
      components: {
        default: users,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/applications',
      name: 'Admin Applications',
      components: {
        default: adminApplications,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/waiver/:type/edit',
      name: 'AdminUserWaiverEdit',
      components: {
        default: admin_waiver_edit,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/waiver/:id',
      name: 'AdminUserWaiverSingle',
      components: {
        default: admin_waiver_view,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/camp/create',
      name: 'CreateCamp',
      components: {
        default: campex_create,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/camp/:id',
      name: 'ViewCamp',
      components: {
        default: campex_single,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/application/:id',
      name: 'adminApp',
      components: {
        default: adminApp,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    }
  ]
})
