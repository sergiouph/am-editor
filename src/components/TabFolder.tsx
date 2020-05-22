import React, { ReactElement, useEffect, useState, useRef, MouseEventHandler } from 'react'
import { classNames, uid } from '../lib/tools';

interface TabItemProps {
    className?: string
    value: string
    label?: string
    help?: string
    children: ReactElement[]
}

interface TabFolderProps {
    className?: string
    value?: string
    help?: string
    children: ReactElement<TabItemProps>[]
}

export const TabItem = (props: TabItemProps) => {
    return (<>{props.children}</>)
}

export const TabFolder = (props: TabFolderProps) => {
    const [active, setActive] = useState(props.value || props.children[0]?.props.value)
    const buttons = props.children.map((child) => {
        const onClick = (e) => {
            setActive(child.props.value)
        }
        return (
            <div key={child.props.value} className={classNames('tab-button', active === child.props.value ? 'active' : '')} onClick={onClick} tabIndex={0}>
                <div className='label'>{child.props.label || child.props.value}</div>
            </div>
        )
    })
    const items = props.children.map((child) => {
        return (
            <div className={classNames(props.className, 'tab-item', active === child.props.value ? 'active' : '')}>
                {child}
            </div>
        )
    })
    return (
        <div className={classNames(props.className, 'tab-folder')}>
            <div className='tab-button-group'>
                {buttons}
            </div>
            <div className='tab-item-group'>
                {items}
            </div>
        </div>
    )
}
