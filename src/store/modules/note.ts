import { Module } from "vuex";
import store,{GlobalState} from '../index'
import {NoteState,Note,Page,Result} from '../typings'
import * as NoteAPI from '../../Api/notes'
import * as Types from '../action-types'

const state:NoteState={
    notes:[],
    isRequestError:false,
    isLoading:false
}
const note:Module<NoteState,GlobalState>={
    namespaced:true,
    state,
    mutations:{
        [Types.ADD_NOTES](state,payload:Note){
            console.log("000")
            state.notes.push(payload)
        },
        [Types.PUSH_NOTES](state,payload:Note[]){
            state.notes.push(...payload)
        },
        [Types.SET_NOTE](state,payload:Note[]){
            state.notes = payload
        },
        [Types.SET_ERROR](state,payload:boolean){
            state.isRequestError = payload
        },
        [Types.SET_LOADIBG](state,payload:boolean){
            state.isLoading = payload
        },
        [Types.UPDATE_NOTES](state,payload:any){
            state.notes.forEach((note:Note)=>{
                if(note.id === payload.id){
                    note.content = payload.note.content;
                    note.dates = payload.note.dates;
                }
            })
        },
        [Types.DELETE_NOTES](state,payload:number){
            const index = state.notes.findIndex((note:Note)=>{
                return note.id === payload;
            })
            state.notes.splice(index,1)
        },
        [Types.SEARCHBYCT_NOTE](state,payload:Note[]){
            state.notes = payload
        },
        [Types.SEARCHBYID_NOTE](state,payload:Note){
            state.notes.push(payload)
        },
    },
    actions: {
        // 分页请求
        [Types.PUSH_NOTES]({ commit }, payload: Page) {
            NoteAPI.getNotes<Result<Note[]>>(payload.page, payload.size).then(data => {
                if(payload.page === 1) {
                    commit(Types.SET_NOTE, data.data);
                }else{
                    commit(Types.PUSH_NOTES, data.data);
                }
            });
        },
        //根据content查询
        [Types.SEARCHBYCT_NOTE]({ commit }, payload: string){
            NoteAPI.getNoteListByContent<Result<Note[]>>(payload).then(data=>{
                commit(Types.SEARCHBYCT_NOTE, data.data);
            })
        },
        //根据id查询
        [Types.SEARCHBYID_NOTE]({ commit }, payload: number){
            NoteAPI.getNoteById<Result<Note[]>>(payload).then(data=>{
                commit(Types.SEARCHBYID_NOTE,data.data);
            })
        },
        // 添加note
        [Types.ADD_NOTES]({ commit }, payload: Note) {
            console.log("ADDNOTES")
            NoteAPI.addNote<Result<Note>>(payload).then(data => {
                console.log(data.data)
                commit(Types.ADD_NOTES, data.data);
            });
        },
        // 修改note
        [Types.UPDATE_NOTES]({commit,state},payload:any) {
            console.log("UPDATENOTES")
            NoteAPI.updateNote(payload.id,payload.note).then(data => {
                commit(Types.UPDATE_NOTES, {id:payload.id,note:payload.note}); // 更新数据
            });
        },
        // 删除note
        [Types.DELETE_NOTES]({ commit,state }, payload: number) {
            NoteAPI.deleteNote<Result<number>>(payload).then(data => {
                commit(Types.DELETE_NOTES, payload); // 更新数据
            })
        },
    }
}
export default note