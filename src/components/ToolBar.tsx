import React from 'react'
import { classNames } from '../lib/tools'
interface ToolItemProps {
    className?: string
    children?: React.ReactElement
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
    children?: React.ReactElement<ToolItemProps>[]
}

export const ToolBar = (props: ToolBarProps) => {
    return (
        <div className={classNames(props.className, 'tool-bar')}>
            {props.children}
        </div>
    )
}
