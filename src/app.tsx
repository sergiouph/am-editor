import React, { useEffect, useState, useRef } from 'react'
import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import { generateVizCode } from './machine-formatter'
import { parseMachine } from './machine-parser'
import { useAsync } from './tools'


async function generateSvgElement(input: string, dir: string) {
    const machine = parseMachine(input)
    const code = generateVizCode(machine, dir)
    const viz = new Viz({ Module, render })

    console.log(code)

    return viz.renderSVGElement(code)
}

const Graph = ({ input, dir }) => {
    const svgRef = useRef(null);
    const [error, setError] = useState(null)
    useAsync(async () => {
        try {
            const svg = await generateSvgElement(input, dir)
            if(svgRef.current && svg){
                while (svgRef.current.firstChild) {
                    svgRef.current.removeChild(svgRef.current.lastChild);
                }
                svgRef.current.appendChild(svg)
    
                const url = `?dir=${encodeURIComponent(dir)}&input=${encodeURIComponent(btoa(input))}`
                window.history.pushState({}, window.document.title, url)
            } 
        }
        catch (e) {
            while (svgRef.current.firstChild) {
                svgRef.current.removeChild(svgRef.current.lastChild);
            }
            svgRef.current.appendChild(document.createTextNode(String(e)))
        }
    });
    return (<div ref={svgRef} />)
}

export const App = ({ input0, dir0 }) => {
    const [input, setInput] = useState(input0)
    const [dir, setDir] = useState(dir0)
    
    function onChangeInput(e) {
        console.log(e)
        setInput(e.target.value)
    }

    function onChangeDir(e) {
        console.log(e)
        setDir(e.target.value)
    }
    
    return (
        <div id="layout">
            <div>
                <select value={dir} onChange={onChangeDir}>
                    <option value="LR">Left-Right</option>
                    <option value="TB">Top-Bottom</option>
                </select>
                <br/>
                <textarea id="input" cols="30" value={input} onChange={onChangeInput} />
            </div>
            <div id="output">
                <Graph input={input} dir={dir} />
            </div>
        </div>
    )
}
