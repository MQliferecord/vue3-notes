import axios from '.'
import {Note} from '@/store/typings'

export function getNotes<T>(page:number,size:number){
    return axios.get<T,T>(`/note/page/${page}/${size}`);
}
export function getNoteListByContent<T>(content:string){
    return axios.get<T,T>(`/note/content/${content}`);
}
export function getNoteById<T>(id:number){
    return axios.get<T,T>(`/note/id/${id}`);
}
export function addNote<T>(note:Note){
    console.log(note)
    return axios.post<T,T>('/note',note);
}
export function deleteNote<T>(id:number){
    return axios.delete(`/note/${id}`);
}
export function updateNote<T>(id:number,note:Note){
    return axios.put(`/note/${id}`,note);
}