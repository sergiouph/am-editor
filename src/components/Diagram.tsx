import React, { useEffect, useState, useRef } from 'react'
import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import { generateVizCode } from '../lib/machine-formatter'
import { parseMachine } from '../lib/machine-parser'
import { useAsync } from '../lib/tools'


async function generateSvgElement(input: string, dir: string) {
    const machine = parseMachine(input)
    const code = generateVizCode(machine, dir)
    const viz = new Viz({ Module, render })

    console.log(code)

    return viz.renderSVGElement(code)
}

export const Diagram = ({ input, dir }) => {
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