import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
      {
      path: '/poll/:id',
      name: 'PollView',
      component: () => import('../views/PollView.vue')
    },
    {
      path: '/create/',
      name: 'CreateView',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/result/:id',
      name: 'ResultView',
      component: () => import('../views/ResultView.vue')
    },
    {
      path: '/instructions/',
      name: 'InstructionsView',
      component: () => import('../views/InstructionsView.vue')
    },
    {
      path: '/startgame/',
      name: 'StartgameView',
      component: () => import('../views/StartgameView.vue')
    },
    {
      path: '/waitingroom/',
      name: 'WaitingRoomView',
      component: () => import('../views/WaitingRoomView.vue')
    }
    
    
  ]
})

export default router
