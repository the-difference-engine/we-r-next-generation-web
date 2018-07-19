import Vue from 'vue'
import Router from 'vue-router'
import { sessionCheck } from '../sessionUtils'

import adminApplications from '@/components/adminApplications'
import adminNavbar from '@/components/adminNavbar'
import adminWaiverView from '@/components/adminWaiverView'
import adminWaiverReview from '@/components/adminWaiverReview'
import adminWaiverEdit from '@/components/adminWaiverEdit'
import appFrame from '@/components/applicationFrame';
import appType from '@/components/applicationType';
import appPage1 from '@/components/appPage1';
import appPage2 from '@/components/appPage2';
import appPage3 from '@/components/appPage3';
import appConfirm from '@/components/appConfirm';
import campInfo from '@/components/campInfo';
import applicationSubmitted from '@/components/applicationSubmitted'
import confirmation from '@/components/confirmation'
import donate from '@/components/donate'
import faq from '@/components/faq'
import faqEdit from '@/components/faqEdit'
import faqAddNew from '@/components/faqAddNew'
import faqEditSingle from '@/components/faqEditSingle'
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
import successEdit from '@/components/successEdit'
import successAddNew from '@/components/successAddNew'
import successEditSingle from '@/components/successEditSingle'
import users from '@/components/users'
import wernxgFooter from '@/components/wernxgFooter'
import wernxgHeader from '@/components/wernxgHeader'
import homeEdit from '@/components/homeEdit'
import adminApp from '@/components/adminApp'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      path: '/',
      name: 'Root',
      components: {
        default: homePage,
        header: wernxgHeader,
        footer: wernxgFooter
      },
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
      path: '/application',
      name: 'application',
      components: {
        default: appFrame,
        header: wernxgHeader,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck,
      children: [
        {
          path: ':appType',
          name: 'appType',
          components: {
            default: appType
          },
          children: [
            {
              path: '1',
              name: 'page-1',
              components: {
                default: appPage1
              }
            },
            {
              path: '2',
              name: 'page-2',
              components: {
                default: appPage2
              }
            },
            {
              path: '3',
              name: 'page-3',
              components: {
                default: appPage3
              }
            },
            {
              path: 'confirm',
              name: 'appConfirm',
              components: {
                default: appConfirm
              }
            }
          ]
        },
      ],
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
      name: 'applicationSubmitted',
      components: {
        default: applicationSubmitted,
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
        default: adminWaiverEdit,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/waiver/:type/review',
      name: 'AdminUserWaiverReview',
      components: {
        default: adminWaiverReview,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/waiver/:id',
      name: 'AdminUserWaiverSingle',
      components: {
        default: adminWaiverView,
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
      path: '/admin/home-edit',
      name: 'homeEdit',
      components: {
        default: homeEdit,
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
    },
    {
      path: '/admin/faqEdit',
      name: 'faqEdit',
      components: {
        default: faqEdit,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/faqEditSingle',
      name: 'faqEditSingle',
      components: {
        default: faqEditSingle,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/faqAddNew',
      name: 'faqAddNew',
      components: {
        default: faqAddNew,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/successEdit',
      name: 'successEdit',
      components: {
        default: successEdit,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/successAddNew',
      name: 'successAddNew',
      components: {
        default: successAddNew,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
    {
      path: '/admin/successEditSingle',
      name: 'successEditSingle',
      components: {
        default: successEditSingle,
        header: adminNavbar,
        footer: wernxgFooter
      },
      beforeEnter: sessionCheck
    },
  ]
})
