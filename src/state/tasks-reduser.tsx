import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: EveryThingsTasksAC) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el=>el.id !== action.payload.id)}
        case 'ADD_TASK':
            return {...state, [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false},...state[action.payload.todolistId]]}
        case 'CHANGE_STATUS':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el=>el.id === action.payload.id ? {...el, isDone: action.payload.isDone}: el)}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el=>el.id === action.payload.id ? {...el, title: action.payload.newTitle}: el)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            /*let copyState = {...state}
            delete copyState[action.id]
            return copyState*/
            let {[action.id]:[], ...rest} = {...state}
            return rest
        default:
            return state
    }
}

export type EveryThingsTasksAC = RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTaskTitleACType | AddTodolistActionType | RemoveTodolistActionType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistId,
        }
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistId,
            title,
        }
    }  as const
}

export const changeStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            todolistId,
            id,
            isDone,
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistId,
            id,
            newTitle,
        }
    } as const
}
