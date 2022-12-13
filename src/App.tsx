import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1: string = 'What to learn';
    //const todoListTitle_2: string = 'What to buy';
    let [tasks, setTask] =useState <Array<TaskType>>( [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS & TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: number) => {
        setTask(tasks.filter(task => task.id !== taskId));//работает асинхроннно
        console.log(tasks);
    }
  /*  useEffect(()=> {
        console.log(tasks);
    }, [tasks]);*/

    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
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

    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={filterTaskForRender}
                removeTask={removeTask}
                filter = {changeFilter}
                />
        </div>
    );
}

export default App;
