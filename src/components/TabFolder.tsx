import React, { ReactElement, useEffect, useState, useRef, MouseEventHandler } from 'react'
import { classNames, uid } from '../lib/tools';

interface TabItemProps {
    className?: string
    value: string
    label?: string
    help?: string
    children: ReactElement
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
        const onClick: MouseEventHandler<HTMLDivElement> = () => {
            setActive(child.props.value)
        }
        return (
            <div key={child.props.value} className={classNames('tab-head', active === child.props.value ? 'active' : '')} onClick={onClick} tabIndex={0}>
                <div className='label'>{child.props.label || child.props.value}</div>
            </div>
        )
    })

    const items = props.children.map((child) => {
        const bodyGroupStyle: React.CSSProperties = {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'stretch',
        }
        if (active !== child.props.value) {
            bodyGroupStyle.display = 'none';
        }

        return (
            <div key={child.key} className='tab-body' style={bodyGroupStyle}>
                {child}
            </div>
        )
    })

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'start',
        alignItems: 'stretch',
    };

    const headGroupStyle: React.CSSProperties = {
        flexGrow: 0,
    }

    return (
        <div className={classNames('tab-folder', props.className)} style={containerStyle}>
            <div className='tab-head-group' style={headGroupStyle}>
                {buttons}
            </div>
            {items}
        </div>
    )
}
