import Vue from 'vue'
import Router from 'vue-router'
import Starships from '@/components/Starships'
import Starship from '@/components/Starship'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/starships/1'
    },
    {
      path: '/starships',
      redirect: '/starships/1'
    },
    {
      path: '/starships/:page*',
      name: 'Starships',
      component: Starships,
      props: true
    },
    {
      path: '/starship/:id*',
      name: 'Starship',
      component: Starship,
      props: true
    }
  ]
})
