import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask:(title: string, todolistId: string) => void
    changeTaskStatus:(taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle:(taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("All" , props.id)
    const onActiveClickHandler = () => props.changeFilter("Active" , props.id)
    const onCompletedClickHandler = () => props.changeFilter("Completed" , props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title:string)=> {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={ changeTodolistTitle} /> <button onClick={removeTodolist}>X</button></h3>
            <AddItemForm

                addItem={addTask}
            />
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeStatusHandler}
                                       checked={t.isDone}/>
                                <EditableSpan title={t.title}
                                               onChange={ onChangeTitleHandler}
                                />
                                <button onClick={onRemoveHandler}>x</button>
                            </li>)
                    })
                }


            </ul>
            <div>
                <button className={ props.filter === "All" ? "active-filter" : ""} onClick={ onAllClickHandler}>All</button>
                <button className={ props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={ props.filter === "Completed" ? "active-filter" : ""} onClick={ onCompletedClickHandler}>Completed</button>
            </div>
        </div>


    )
}


