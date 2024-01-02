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
      path: '/username/:id',
      name: 'Username',
      component: () => import('../views/Username.vue')
    },
    {
      path: '/instructions/',
      name: 'InstructionsView',
      component: () => import('../views/InstructionsView.vue')
    },
    {
      path: '/startgame/:id/:uid',
      name: 'StartgameView',
      
      component: () => import('../views/StartgameView.vue')
    },
    {
      path: '/waitingroom/:id/:uid', 
      name: 'WaitingRoomView',
      component: () => import('../views/WaitingRoomView.vue')
    },
    {
      path: '/question/:id/:uid', 
      name: 'AnswerQuestionView',
      component: () => import('../views/AnswerQuestionView.vue')
    },
     {
      path: '/joingame/',
      name: 'JoinGameView',
      component: () => import('../views/JoinGameView.vue')
    },
    {
      path: '/correctanswer/:id/:uid',
      name: 'CorrectAnswerView',
      component: () => import('../views/CorrectAnswerView.vue')
    }, 
    {
      path: '/leaderboard/:id/:uid',
      name: 'leaderboardView',
      component: () => import('../views/leaderboardView.vue')
    }, 
    {
      path: '/createlobby/',
      name: 'CreateLobby',
      component: () => import('../views/CreateLobby.vue')
    },
    {
      path: '/results/',
      name: 'ResultsView',
      component: () => import('../views/ResultsView.vue')
    } ,
  ]
})

export default router
