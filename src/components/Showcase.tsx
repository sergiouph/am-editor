import React, { MouseEventHandler, useRef } from 'react';
import { classNames } from '../lib/tools';

interface ShowcaseProps {
    className?: string
    help?: string
    children: React.ReactElement
}

export const Showcase = (props: ShowcaseProps) => {
    const ref = useRef<HTMLDivElement>(null);

    let dragging = false
    let x0: number | null = null
    let y0: number | null = null
    let scrollTop0: number | null = null
    let scrollLeft0: number | null = null

    const dragStart: MouseEventHandler = (e) => {
        if (ref.current) {
            x0 = e.screenX
            y0 = e.screenY
            scrollTop0 = ref.current.scrollTop
            scrollLeft0 = ref.current.scrollLeft
            dragging = true

            ref.current.classList.add('dragging')
        }
    }

    const dragMove: MouseEventHandler = (e) => {
        if (dragging && ref.current) {
            const diffX = e.screenX - (x0 || 0)
            const diffY = e.screenY - (y0 || 0)

            ref.current.scrollTop = (scrollTop0 || 0) - diffY
            ref.current.scrollLeft = (scrollLeft0 || 0) - diffX
        }
    }

    const dragStop: MouseEventHandler = () => {
        dragging = false

        if (ref.current) {
            ref.current.classList.remove('dragging')
        }
    }

    return (
        <div ref={ref} className={classNames(props.className, 'showcase')} title={props.help}
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseUp={dragStop}
            onMouseLeave={dragStop}>
            {props.children}
        </div>
    )
};
