import React from 'react';

export type ButtonPropsType = {
    title: string,
    onClickHandler: ()=>void,
    style?: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.onClickHandler} className={props.style}>{props.title}</button>
    );
};