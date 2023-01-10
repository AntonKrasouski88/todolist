import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Button} from "./components/Button/Button";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string)=> void
    updateTodoList:(todolistId: string, newTitle: string)=>void,
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const onChangeAddTask = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle);
    }
    const onChangeSpanHandler =  (tID: string, newTitle: string) => {
        props.updateTask(props.todolistId, tID, newTitle)
    }
    const onChangeTodolist = (newTitle: string) => {
        props.updateTodoList(props.todolistId, newTitle);
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={onChangeTodolist}/>
            <button onClick={removeTodolistHandler}>X</button>

        </h3>
        <AddItemForm callBack={onChangeAddTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    /*const onChangeSpanHandler =  (newTitle: string) => {
                        props.updateTask(props.todolistId, t.id, newTitle)
                    }*/
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callBack ={(newTitle)=>onChangeSpanHandler(t.id, newTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        {/*<div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>*/}
        <Button title={'All'} onClickHandler={onAllClickHandler} style={props.filter === 'all' ? "active-filter" : ""}/>
        <Button title={'Active'} onClickHandler={onActiveClickHandler} style={props.filter === 'active' ? "active-filter" : ""}/>
        <Button title={'Comleted'} onClickHandler={onCompletedClickHandler} style={props.filter === 'completed' ? "active-filter" : ""}/>
    </div>
}
