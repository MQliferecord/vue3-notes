import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Note from '../views/Note/Note.vue'
import AddNote from '../views/Note/AddNote.vue'
import ToDo from '../views/ToDo/ToDo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'Note',
    component:Note
  },
  {
    path:'/todo',
    name:'ToDo',
    component:ToDo,
  },
  {
    path:'/addNote',
    name:'AddNote',
    component:AddNote,
    meta:{
      isAllHeight:true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass:'active'
})

export default router
