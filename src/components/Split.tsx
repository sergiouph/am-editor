import React, { useEffect, useState, useRef, CSSProperties, MouseEventHandler } from 'react'
import { classNames } from '../lib/tools';

interface SplitProperties {
    start: React.ReactElement
    end: React.ReactElement
    className?: string
    startSize?: number
    endSize?: number
    startHidden?: boolean
    endHidden?: boolean
    barSize?: number
    dir?: ('h'|'v')
}

export const Split = (props: SplitProperties) => {
    const startSized = Boolean(props.startSize)
    const [mainSize, setMainSize] = useState(props.startSize || props.endSize || 100)

    const [drag, setDrag] = useState({})
    
    const barSize = props.barSize || 4;
    const sizeProp = (props.dir==='h' ? 'height' : 'width')
    const startPosProp = (props.dir==='h' ? 'top' : 'left')
    const endPosProp = (props.dir==='h' ? 'bottom' : 'right')
    const startSideProp = (props.dir==='h' ? 'left' : 'top')
    const endSideProp = (props.dir==='h' ? 'right' : 'bottom')

    const startStyles: CSSProperties = {
        position: 'absolute',
        [startPosProp]: 0,
        [startSideProp]: 0,
        [endSideProp]: 0,
    }
    const barStyles: CSSProperties = {
        position: 'absolute',
        [sizeProp]: barSize,
        [startSideProp]: 0,
        [endSideProp]: 0,
    }
    const endStyles: CSSProperties = {
        position: 'absolute',
        [endPosProp]: 0,
        [startSideProp]: 0,
        [endSideProp]: 0,
    }

    if (startSized) {
        startStyles[sizeProp] = mainSize
        barStyles[startPosProp] = mainSize
        endStyles[startPosProp] = mainSize + barSize
    }
    else {
        startStyles[endPosProp] = mainSize + barSize
        barStyles[endPosProp] = mainSize
        endStyles[sizeProp] = mainSize
    }

    
    const dragOpen: MouseEventHandler = (event) => {
        setDrag({
            x0: event.pageX,
            y0: event.pageY,
            mainSize0: mainSize,
            moving: true,
        })
    }

    const dragMove: MouseEventHandler = (event) => {
        if (drag.moving) {
            let diffX = (drag.x0 - event.pageX)
            let diffY = (drag.y0 - event.pageY)

            if (!startSized) {
                diffX *= -1
                diffY *= -1
            }

            let newMainSize: number

            if (props.dir === 'h') {
                newMainSize = drag.mainSize0 - diffY
            }
            else {
                newMainSize = drag.mainSize0 - diffX
            }

            if (newMainSize < barSize) { newMainSize = barSize }

            setMainSize(newMainSize)
        }
    }


    const dragClose: MouseEventHandler = (e) => {
        setDrag({})
    }

    const dirClass = `split-dir-${props.dir || 'v'}`

    if (props.startHidden) {
        startStyles['display'] = 'none'
        barStyles['display'] = 'none'
        endStyles[startPosProp] = 0
    }

    if (props.endHidden) {
        delete startStyles[sizeProp]
        startStyles[endPosProp] = 0
        barStyles['display'] = 'none'
        endStyles['display'] = 'none'
    }

    return (
        <div onMouseMove={dragMove} onMouseUp={dragClose} onMouseLeave={dragClose}>
            <div className={classNames(props.className, dirClass, 'split-start')} style={startStyles}>
                {props.start}
            </div>
            <div className={classNames(props.className, dirClass, 'split-bar')} style={barStyles} onMouseDown={dragOpen} />
            <div className={classNames(props.className, dirClass, 'split-end')} style={endStyles}>
                {props.end}
            </div>
        </div>
    )
}