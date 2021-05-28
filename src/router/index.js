import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import movies from '../views/movies.vue'
import movieDetail from '../views/movieDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies/:search',
    name: 'movies',
    component: movies,
    props: true,
  },
  {
    path:'/movieDetail/:id',
    name: 'movieDetail',
    component: movieDetail,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
