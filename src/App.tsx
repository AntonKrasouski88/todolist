import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1: string = 'What to learn';
    //const todoListTitle_2: string = 'What to buy';
    let [tasks, setTask] =useState <Array<TaskType>>( [
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS & TS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTask(tasks.filter(task => task.id !== taskId));//работает асинхроннно
        console.log(tasks);
    }
  /*  useEffect(()=> {
        console.log(tasks);
    }, [tasks]);*/

    const changeTodoListFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
       setTask(tasks.map(task => task.id === taskId ? {...task, isDone: isDone}: task));
    }

    const getFilteredTaskForRender = () => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone);
            case "completed":
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
    }}

    let filterTaskForRender:Array<TaskType> = getFilteredTaskForRender()

    const addTask = (task: string) => {
        const newTask = {id: v1(), title: task, isDone: false}
        setTask([ newTask,...tasks])
    }

    return (
        <div className="App">
            <TodoList
                title = {todoListTitle_1}
                tasks = {filterTaskForRender}
                addTask = {addTask}
                removeTask = {removeTask}
                changeTodoListFilter = {changeTodoListFilter}
                changeTaskStatus = {changeTaskStatus}
                filter = {filter}
                />
        </div>
    );
}

export default App;
