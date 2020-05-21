import React, { useEffect, useState } from 'react'

import { Diagram } from './Diagram'
import { Split } from './Split'
import { CodeEditor } from './CodeEditor'
import { Menu } from './Menu'
import { ToolBar, ToolItem } from './ToolBar'
import { OptionGroup } from './OptionGroup'
import { Switch } from './Switch'


export const App = ({ input0, dir0 }) => {
    const [input, setInput] = useState(input0)
    const [dir, setDir] = useState(dir0)
    const [menuVisible, setMenuVisible] = useState(false)
    
    function onChangeInput(e) {
        console.log(e)
        setInput(e.target.value)
    }

    function onChangeDir(value) {
        setDir(value)
    }

    function onChangeMenu(value) {
        console.log(value)
        setMenuVisible(value)
    }

    const toolbar = (
        <ToolBar>
            <ToolItem>
                <div className='app-title'>Automata Editor</div>
            </ToolItem>
            <ToolItem>
                <OptionGroup onChange={onChangeDir} value={dir} options={[
                    {value: 'LR', help: 'Left-Right Direction'},
                    {value: 'TB', help: 'Top-Bottom Direction'},
                ]} />
            </ToolItem>
            <ToolItem  expand={true} />
            <ToolItem>
                <Switch selected={menuVisible} onChange={onChangeMenu} label='INFO' help='Show/hide application information' />
            </ToolItem>
        </ToolBar>
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
        <Split className='menu-panel' dir='v' endSize={300} end={menu} endHidden={!menuVisible} start={
            <Split className='root-panel' dir='h' startSize={50} start={toolbar} end={
                <Split className='diagram-panel' dir='v' startSize={300} start={codeEditor} end={diagram} />
            } />
        } />   
    )
}
