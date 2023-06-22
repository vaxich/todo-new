import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

let tasks1 = [
    {id:1 , title: "css", isDone: true},
    {id:2 , title: "js", isDone: true},
    {id:3 , title: "react", isDone: false},
]
let tasks2 = [
    {id:1 , title: "terminator", isDone: true},
    {id:2 , title: "xxx", isDone: false},
    {id:3 , title: "джентельмены удачи", isDone: true},
]

function App() {

    return (
        <div className="App">
            <Todolist title='what to learn' tasks={tasks1}/>
            <Todolist title='movies' tasks={tasks2}/>

        </div>
    );
}


export default App;
