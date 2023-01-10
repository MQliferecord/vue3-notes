import * as Types from '../store/action-types'
import {Store} from 'vuex'
import {computed} from 'vue'
import {GlobalState} from '../store/index'
import {Page,Note} from '../store/typings/index'

export default function useNote(store:Store<GlobalState>){
    let notes = computed(()=>store.state.note.notes);
    let isLoading = computed(()=>store.state.note.isLoading);

    function getNotesByPage(payload:Page){
        store.dispatch(`note/${Types.PUSH_NOTES}`,payload);
    }
    function addNote(payload:Note){
        return store.dispatch(`note/${Types.ADD_NOTES}`,payload);
    }
    function searchNoteByContent(payload:String){
        return store.dispatch(`note/${Types.SEARCHBYCT_NOTE}`,payload);
    }
    function searchNoteById(payload:number){
        return store.dispatch(`note/${Types.SEARCHBYID_NOTE}`,payload);
    }
    function updateNote(payload:any){
        return store.dispatch(`note/${Types.UPDATE_NOTES}`,payload);
    }
    function deleteNote(payload:number){
        return store.dispatch(`note/${Types.DELETE_NOTES}`,payload)
    }
    return {
        notes,
        isLoading,
        getNotesByPage,
        addNote,
        updateNote,
        deleteNote,
        searchNoteByContent,
        searchNoteById
    }
}