import React, { useLayoutEffect, useState } from 'react'
import { classNames } from '../lib/tools';

interface DragData {
    position: number;
    initialStartSize: number;
    initialTotalSize: number;
}

interface SplitPanelProps {
    start: React.ReactElement
    end: React.ReactElement
    startSize?: number;
    className?: string
    barSize?: number
}

export const SplitPanel: React.FC<SplitPanelProps> = (props) => {
    const barSize = props.barSize ?? 5;
    const startRef = React.createRef<HTMLDivElement>();
    const [startSize, setSize] = useState<number>(props.startSize ?? 100);
    const [endSize, setEndSize] = useState<number>(0);
    const [drag, setDrag] = useState<DragData | null>(null);
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'start',
        alignItems: 'stretch',
    };
    const startStyle: React.CSSProperties = {
        width: startSize,
    };
    const endStyle: React.CSSProperties = {
        flexGrow: 1
    }
    const barStyle: React.CSSProperties = {
        backgroundColor: 'red',
        width: barSize,
    };

    const dragOpen: React.MouseEventHandler = (event) => {
        if (startRef.current) {
            setDrag({
                position: event.pageX,
                initialStartSize: startRef.current.clientWidth,
                initialTotalSize: startRef.current.parentElement?.clientWidth ?? 0,
            })
        }
    };

    const dragMove: React.MouseEventHandler = (event) => {
        if (drag) {
            const diff = event.pageX - drag.position
            const newStartSize = drag.initialStartSize + diff
            const newEndSize = drag.initialTotalSize - newStartSize - barSize;

            setSize(newStartSize)
            setEndSize(newEndSize)
        }
    };

    const dragClose: React.MouseEventHandler = () => {
        setDrag(null)
    };

    return (
        <div className={classNames('split-panel', props.className)} style={containerStyle} onMouseMove={dragMove} onMouseUp={dragClose} onMouseLeave={dragClose}>
            <div className='split-start' style={startStyle} ref={startRef} >{props.start}</div>
            <div className='split-bar' style={barStyle} onMouseDown={dragOpen} />
            <div className='split-end' style={endStyle}>{props.end}</div>
        </div>
    )
};
