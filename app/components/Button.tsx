import React, { MouseEventHandler } from 'react';
import { classNames } from '../lib/tools';

interface ButtonProps {
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    label?: string
    help?: string
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={classNames(props.className, 'button')} onClick={props.onClick} title={props.help}>
            <span className='label'>{props.label}</span>
        </button>
    )
};
