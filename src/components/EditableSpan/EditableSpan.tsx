import React, {ChangeEvent, useState} from 'react';

type EdibatelSpanType = {
    title: string,
    callBack: (newTitle:string)=>void,
}

export const EditableSpan = (props: EdibatelSpanType) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(props.title);
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        setNewTitle(props.title)
        addTask()
    }
    const onChangeNewTitleHandler =(e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }


    return (
        edit ? <input value={newTitle} onChange={onChangeNewTitleHandler} onBlur={onDoubleClickHandler} autoFocus/> :
        <span onDoubleClick={onDoubleClickHandler} >{props.title}</span>
    );
};