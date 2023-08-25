import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";



type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("")
        } else {
            setError("Обязательное поле")
        }

    }

    return <div>

        <TextField value={newTaskTitle}
                   variant={"outlined"}
                   label={'Type value'}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               error = {!!error}
                   helperText={error}
        />

        <IconButton  color={"primary"} onClick={addTask}>
            <ControlPoint />
        </IconButton>

    </div>

}