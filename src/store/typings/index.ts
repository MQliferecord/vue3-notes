import {Ref} from 'vue'

export interface Note{
    id?:number,
    dates:string,
    content:string
}

export interface NoteState{
    notes:Note[]
    isRequestError:boolean,
    isLoading:boolean
}
export interface ToDo{
    id?:number;
    done:boolean;
    content:string;
}
export interface ToDoState{
    todo:ToDo[]
}
export interface Page{
    page:number,
    size:number
}
export interface Result<T>{
    status:number,
    message:string,
    data:T
}
export interface noteListState{
    leftList:Note[]
    rightList:Note[]
}