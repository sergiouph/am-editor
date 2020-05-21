import React, { useEffect, useState, useRef, CSSProperties, DragEventHandler } from 'react'

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

    let x0: number = null
    let y0: number = null
    let mainSize0: number = null

    const onDragStart: DragEventHandler = (event) => {
        x0 = event.screenX
        y0 = event.screenY
        mainSize0 = mainSize
    }

    const onDrag: DragEventHandler = (event) => {
        // TODO update the size here for a better UX        
    }


    const onDragEnd: DragEventHandler = (event) => {
        if (x0 !== null && y0 != null) {
            let diffX = (x0 - event.screenX)
            let diffY = (y0 - event.screenY)
            
            if (!startSized) {
                diffX *= -1
                diffY *= -1
            }

            if (props.dir === 'h') {
                setMainSize(mainSize0 - diffY)
            }
            else {
                setMainSize(mainSize0 - diffX)
            }
        }
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
        <>
            <div className={`${props.className} ${dirClass} split-start`}
                    style={startStyles}>
                {props.start}
            </div>
            <div className={`${props.className} ${dirClass} split-bar`}
                    draggable="true"
                    style={barStyles} 
                    onDragStart={onDragStart} 
                    onDrag={onDrag} 
                    onDragEnd={onDragEnd} />
            <div className={`${props.className} ${dirClass} split-end`}
                    style={endStyles}>
                {props.end}
            </div>
        </>
    )
}