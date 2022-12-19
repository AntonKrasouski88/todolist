import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId:string)=>void,
    filter: (filterValue: FilterValuesType) => void,
    addTask: (task: string)=> void
}


export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('');
    const tasksItems = props.tasks.length !== 0 ? props.tasks.map((task:TaskType) => {
        const onClickRemoveTaskHandler = () => {
            props.removeTask(task.id);
        }
        return (
            <li key = {task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>X</button>
            </li>
        )
    }) : <span>This todolist is empty</span>
    const onClickAddTaskHandler = ()=>{props.addTask(title); setTitle('');}
    const onChangeSetLocalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter'&& onClickAddTaskHandler();
    }

    const onClickSetFilterHandler = (filter: FilterValuesType) =>{return ()=>props.filter(filter)}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={onClickSetFilterHandler('all')}>All</button>
                <button onClick={onClickSetFilterHandler('active')}>Active</button>
                <button onClick={onClickSetFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};
