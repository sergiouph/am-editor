import React, { useEffect, useState } from 'react'

import { downloadSvg } from '../lib/svg-downloader'
import { Diagram } from './Diagram'
import { Split } from './Split'
import { CodeEditor } from './CodeEditor'
import { Menu } from './Menu'
import { ToolBar, ToolItem } from './ToolBar'
import { OptionGroup } from './OptionGroup'
import { Switch } from './Switch'
import { Button } from './Button'
import { useAsync } from '../lib/tools'
import { RenderOptions } from '../lib/machine-formatter'


export const App = ({ input0, dir0 }) => {
    const [input, setInput] = useState(input0)
    const [options, setOptions] = useState(new RenderOptions())
    const [menuVisible, setMenuVisible] = useState(false)
    
    let machine = null

    function setMachine(m) {
        machine = m
    }

    function onChangeInput(e) {
        console.log(e)
        setInput(e.target.value)
    }

    function onChangeDir(value) {
        setOptions(options.patch({ dir: value }))
    }

    function onChangeMenu(value) {
        console.log(value)
        setMenuVisible(value)
    }

    function onDownload() {
        if (machine != null) {
            downloadSvg(document.querySelector('.diagram-container svg'), machine.title || 'diagram')
        }
    }

    const toolbar = (
        <ToolBar>
            <ToolItem>
                <div className='app-title'>Automata Editor</div>
            </ToolItem>
            <ToolItem>
                <OptionGroup onChange={onChangeDir} value={options.dir} options={[
                    {value: 'LR', help: 'Left-Right Direction'},
                    {value: 'TB', help: 'Top-Bottom Direction'},
                ]} />
            </ToolItem>
            <ToolItem expand={true} />
            <ToolItem>
                <Button onClick={onDownload} label="DOWNLOAD" help='Download diagram as an image'/>
            </ToolItem>
            <ToolItem>
                <Switch selected={menuVisible} onChange={onChangeMenu} label='INFO' help='Show/hide application information' />
            </ToolItem>
        </ToolBar>
    )
    const menu = (
        <Menu options={options} setter={setOptions} />
    )
    const codeEditor = (
        <CodeEditor value={input} onChange={onChangeInput} />
    )
    const diagram = (
        <Diagram input={input} options={options} machineSetter={setMachine} />
    )
    
    return (
        <Split className='menu-panel' dir='v' endSize={500} end={menu} endHidden={!menuVisible} start={
            <Split className='root-panel' dir='h' startSize={50} start={toolbar} end={
                <Split className='diagram-panel' dir='v' startSize={300} start={codeEditor} end={diagram} />
            } />
        } />   
    )
}
