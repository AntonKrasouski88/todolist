import {createStore, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reduser";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})
export const store = legacy_createStore(rootReducer)
export type AppStateType = ReturnType<typeof rootReducer>
//@ts-ignore
window.store = store;