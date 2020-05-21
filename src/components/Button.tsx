import React, { useEffect, useState, ChangeEventHandler } from 'react'
import { classNames, uid } from '../lib/tools';

interface ButtonProps {
    className?: string
    onClick?
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