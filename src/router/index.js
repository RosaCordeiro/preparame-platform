import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
Vue.use(VueRouter)


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })


  Router.beforeEach((to, from, next) => {
    const userType = localStorage.getItem('userType')

    if (userType) {
      const userTypesValid = to.matched[0].props.userTypes ? to.matched[0].props.userTypes : []

      if (userTypesValid.length > 0) {
        if (userTypesValid.includes(userType)) {
          return next()
        }
      } else {
        return next()
      }
    }

    return next()
  })

  return Router
}
