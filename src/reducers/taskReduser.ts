import { v1 } from 'uuid';
import {TaskType} from '../Todolist'

export const TaskReduser = (state: TaskType[], action: allType)=> {
    switch(action.type) {
        case 'REMOVE-TASK': {
            return state.filter(el=>el.id!==action.payload.id);
        }
        case 'ADD-TASK': {
            let task = { id: v1(), title: action.payload.title, isDone: false }
            return [task,...state]
        }
        default: return state
    }
}

type allType = removeTaskACType | addTaskAC
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskAC =ReturnType<typeof addTasksAC>

export const removeTaskAC = (id:string) => {
    return {
        type: 'REMOVE-TASK',
        payload:{
            id
        }
    } as const
}

export const addTasksAC = (title:string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title
        }
    } as const
}

