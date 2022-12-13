import React from 'react';
import {FilterValuesType} from "../App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId:number)=>void,
    filter: (filterValue: FilterValuesType) => void,
}


export const TodoList = (props: TodoListPropsType) => {
    const tasksItems = props.tasks.length !== 0 ? props.tasks.map((task:TaskType) => {
        return (
            <li key = {task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    }) : <span>This todolist is empty</span>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={() => props.filter('all')}>All</button>
                <button onClick={() => props.filter('active')}>Active</button>
                <button onClick={() => props.filter('completed')}>Completed</button>
            </div>
        </div>
    );
};
