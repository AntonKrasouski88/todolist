import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskACType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistActionType |
    RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
           return {...state,
               [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskId)
           }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title:action.title, isDone: false} ,...state[action.todolistID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el=> el.id === action.id ? {...el, isDone: action.isDone}: el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {...el, title: action.newTitle}: el)
            }
        case "ADD-TODOLIST":
            return{
                ...state,
                [action.todolistId]: []

            }
        case "REMOVE-TODOLIST":
            /*let copyState = {...state}
            delete copyState[action.id]
            return copyState*/
            let {[action.id]:[],...rest} = {...state}
            return rest
        default:
            throw new Error("I don't understand this type")
    }
}



export const removeTaskAC = (taskId: string, todolistID: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistID} as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return { type: 'ADD-TASK', title, todolistID} as const
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string)=> {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId} as const
}
