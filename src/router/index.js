import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GirisView from '../views/GirisView.vue'
import ProfileView from '../views/ProfileView.vue'

import HizmetlistesiView from '../views/HizmetlistesiView.vue'
import HizmetekleView from '../views/HizmetekleView.vue'
import HizmetinceleView from '../views/HizmetinceleView.vue'

import {auth} from '../firebase/config'

const authKontrol = (to, from, next) => {
  const kullanici= auth.currentUser
  if (!kullanici) {
    next({ name: 'GirisView' })
  } else {
    next()
  }
}


const routes = [
  {
    path: '/',
    name: 'home/:id',
    component: HomeView
  },
  {
    path: '/giris',
    name: 'GirisView',
    component: GirisView
  },
  {
    path: '/profil',
    name: 'ProfileView',
    component: ProfileView,
    beforeEnter: authKontrol
  },
  {
    path: '/hizmet-listesi',
    name: 'HizmetlistesiView',
    component: HizmetlistesiView,
    beforeEnter: authKontrol
  },
  {
    path: '/hizmet-ekle',
    name: 'HizmetekleView',
    component: HizmetekleView,
    beforeEnter: authKontrol
  },
  {
    path: '/hizmeincele/:id',
    name: 'HizmetinceleView',
    component: HizmetinceleView,
    beforeEnter: authKontrol
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
