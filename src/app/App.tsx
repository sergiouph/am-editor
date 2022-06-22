import React, { ChangeEventHandler, useEffect, useState } from 'react'

import { downloadSvg } from '../lib/svg-downloader'
import { Diagram } from './Diagram'
import { SplitPanel } from '../components/SplitPanel'
import { CodeEditor } from './CodeEditor'
import { Menu } from '../components/Menu'
import { ToolBar, ToolItem } from '../components/ToolBar'
import { OptionGroup } from '../components/OptionGroup'
import { Switch } from '../components/Switch'
import { Button } from '../components/Button'
import { useAsync } from '../lib/tools'
import { RenderOptions } from '../lib/machine-formatter'
import { Machine } from '../lib/machine-engine'
import { getInitialAutomaton } from './lib/getInitialAutomaton'
import { TabFolder, TabItem } from '../components/TabFolder'
import { Syntax } from './Syntax'
import { About } from './About'
import { Options } from '../components/Options'

export const App: React.FC = () => {
    const [input, setInput] = useState(getInitialAutomaton())
    const [options, setOptions] = useState(new RenderOptions())
    const [menuVisible, setMenuVisible] = useState(false)

    let machine: Machine | null = null

    function setMachine(m: Machine | null) {
        machine = m
    }

    const onChangeInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        console.log(e)
        setInput(e.target.value)
    }

    function onChangeDir(value: string) {
        setOptions(options.patch({ dir: value }))
    }

    function onChangeMenu(value: boolean) {
        console.log(value)
        setMenuVisible(value)
    }

    function onDownload() {
        if (machine != null) {
            const svg = document.querySelector('.diagram-container svg');

            downloadSvg(svg as SVGSVGElement, machine.title || 'diagram')
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
        <TabFolder className='main-screen'>
            <TabItem value='Automata Editor'>
                <SplitPanel className='editor-split' startSize={400} start={codeEditor} end={diagram} />
            </TabItem>
            <TabItem value='Syntax'>
                <Syntax />
            </TabItem>
            <TabItem value='About'>
                <About />
            </TabItem>
            <TabItem value='Options'>
                <div>Settings!</div>
            </TabItem>
        </TabFolder>
    )
}
