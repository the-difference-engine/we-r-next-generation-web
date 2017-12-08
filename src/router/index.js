import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header'
import footer from '@/components/footer'
import landing from '@/components/landing'
import campInfo from '@/components/campInfo'

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
    }
  ]
})
