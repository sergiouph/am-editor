import React, { useEffect, useState } from 'react'

import { Diagram } from './Diagram'
import { Split } from './Split'
import { CodeEditor } from './CodeEditor'
import { Menu } from './Menu'

export const App = ({ input0, dir0 }) => {
    const [input, setInput] = useState(input0)
    const [dir, setDir] = useState(dir0)
    const [menuHidden, setMenuHidden] = useState(false)
    
    function onChangeInput(e) {
        console.log(e)
        setInput(e.target.value)
    }

    function onChangeDir(e) {
        console.log(e)
        setDir(e.target.value)
    }

    function onClickMenu(e) {
        setMenuHidden(!menuHidden)
    }

    const toolbar = (
        <>
            <button onClick={onClickMenu}>Info</button>
            <label>Direction</label>
            <select value={dir} onChange={onChangeDir}>
                <option value="LR">Left-Right</option>
                <option value="TB">Top-Bottom</option>
            </select>
        </>
    )
    const menu = (
        <Menu />
    )
    const codeEditor = (
        <CodeEditor value={input} onChange={onChangeInput} />
    )
    const diagram = (
        <Diagram input={input} dir={dir} />
    )
    
    return (
        <Split className='menu-panel' dir='v' endSize={300} end={menu} endHidden={menuHidden} start={
            <Split className='root-panel' dir='h' startSize={50} start={toolbar} end={
                <Split className='diagram-panel' dir='v' startSize={300} start={codeEditor} end={diagram} />
            } />
        } />   
    )
}
