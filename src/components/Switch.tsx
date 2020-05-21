import React, { useEffect, useState, ChangeEventHandler } from 'react'
import { classNames, uid } from '../lib/tools';

interface SwitchProps {
    selected?: boolean
    className?: string
    onChange?
    label?: string
    help?: string
}

export const Switch = (props: SwitchProps) => {
    const onClick = () => {
        if (props.onChange) {
            props.onChange(!props.selected)
        }
    }
    return (
        <span className={classNames(props.className, 'switch', props.selected ? 'selected' : null)} onClick={onClick} title={props.help} tabIndex='0'>
            <span className='label'>{props.label}</span>
        </span>
    )
};