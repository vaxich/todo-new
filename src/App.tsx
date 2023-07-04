import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = "All" | "Completed" | "Active"

function App() {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "css", isDone: true},
        {id: v1(), title: "js", isDone: true},
        {id: v1(), title: "react", isDone: false},
        {id: v1(), title: "redux", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterValuesType>("All")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => t.id != id)
        setTasks(filteredTasks)

    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)

    }

    function changeStatus (taskId: string, isDone: boolean) {
        let task = tasks.find( t =>   t.id === taskId )
        if (task) {
            task.isDone = isDone
        }

        setTasks([...tasks])
    }

    let tasksForTodolist = tasks;
    if (filter === "Completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "Active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <Todolist title='what to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeStatus}
                      addTask={addTask}
                      filter={filter}
            />


        </div>
    );
}


export default App;
