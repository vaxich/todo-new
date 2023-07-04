import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask:(title: string) => void
    changeTaskStatus:(taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}


export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        } else {
            setError("Обязательное поле")
        }

    }

    const onAllClickHandler = () => props.changeFilter("All")
    const onActiveClickHandler = () => props.changeFilter("Active")
    const onCompletedClickHandler = () => props.changeFilter("Completed")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={ onNewTitleChangeHandler}
                       onKeyPress={ onKeyPressHandler }
                       className={error ? "error" : ""}
                />
                <button onClick={ addTask }>+</button>
                { error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
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