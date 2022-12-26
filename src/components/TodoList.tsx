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
    changeTodoListFilter: (filterValue: FilterValuesType) => void,
    addTask: (task: string)=> void
    changeTaskStatus: (taskId: string, isDone: boolean) =>void
    filter: FilterValuesType
}


export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const tasksItems = props.tasks.length !== 0 ? props.tasks.map((task:TaskType) => {
        const onClickRemoveTaskHandler = () => {
            props.removeTask(task.id);
        }
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
        const isDoneClass = task.isDone ? 'isDone': 'notIsDone'
        return (
            <li key = {task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeStatusHandler}/>
                <span className={isDoneClass}>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>X</button>
            </li>
        )
    }) : <span>This todolist is empty</span>

    const onClickAddTaskHandler = ()=>{
        if(title.trim() !== "") {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError(true)
        }

    }

    const onChangeSetLocalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter'&& onClickAddTaskHandler();
    }

    const onClickSetFilterHandler = (filter: FilterValuesType) =>{return ()=>props.changeTodoListFilter(filter)}
    const errorInputStyle = error ? 'inputError': undefined;
    const errorMessage = <p style={{color:'red', margin: '0px'}}>Please, enter task title</p>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={errorInputStyle}
                />
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && errorMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={onClickSetFilterHandler('all')}
                        className={props.filter === 'all' ? 'activeFilter' : undefined}>All</button>
                <button onClick={onClickSetFilterHandler('active')}
                        className={props.filter === 'active' ? 'activeFilter' : undefined}>Active</button>
                <button onClick={onClickSetFilterHandler('completed')}
                        className={props.filter === 'completed' ? 'activeFilter' : undefined}>Completed</button>
            </div>
        </div>
    );
};
