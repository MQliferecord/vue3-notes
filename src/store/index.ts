import { createStore } from 'vuex'
import {NoteState} from './typings'
import note from './modules/note'
export interface GlobalState{
  note:NoteState
}

const store = createStore<GlobalState>({
  mutations: {
  },
  actions: {
  },
  modules: {
    note
  }
})

export default store
