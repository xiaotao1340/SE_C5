// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    redirect: '',
    children: [
      {
        path: '/',
        name: 'Itro',
        component: () => import('../views/IntroView.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/RegisterView.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'Userhome',
    component: () => import('@/views/UserView.vue'),
    redirect: '/user/statistics',
    children: [
      {
        path: '/user/info',
        name: 'Info',
        component: () => import('../views/InfoView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path.includes("/user")) {
      if (sessionStorage.getItem("token")) {
          return next()
      } else {
          return router.push({
            name: "Login"
          })
      }
  }
  else {
    if (sessionStorage.getItem("token")) {
      return router.push({
        name: "Userhome"
      })
    } else {
        return next()
    }
  }
})

export default router
