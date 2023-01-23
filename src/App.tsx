import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import { addTasksAC, removeTaskAC, TaskReduser } from './reducers/taskReduser';
import { changeFilterAC, FilterReduser } from './reducers/filterReduser';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, taskDispach] = useReducer(TaskReduser,[
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {
        /* let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks); */
        taskDispach(removeTaskAC(id))
    }

    function addTask(title: string) {
        /* let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks); */
        taskDispach(addTasksAC(title))
    }

    let [filter, filterDispach] = useReducer(FilterReduser,"all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        filterDispach(changeFilterAC(value));
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask} />
        </div>
    );
}

export default App;
