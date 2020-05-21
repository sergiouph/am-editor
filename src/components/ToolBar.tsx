import React, { useEffect, useState, useRef, CSSProperties, DragEventHandler } from 'react'
import { classNames } from '../lib/tools'


interface ToolItemProps {
    className?: string
    children?
    expand?: boolean
}

export const ToolItem = (props: ToolItemProps) => {
    const classes = [props.className, 'tool-item']

    if (props.expand) {
        classes.push('expand')
    }

    return (
        <div className={classNames(classes)}>
            {props.children}
        </div>
    )
}


interface ToolBarProps {
    className?: string
    children?
}

export const ToolBar = (props: ToolBarProps) => {
    return (
        <div className={classNames(props.className, 'tool-bar')}>
            {props.children}
        </div>
    )
}