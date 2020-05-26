import React, { useEffect, useState, useRef } from 'react'
import { useAsync } from '../lib/tools'
import { generateSvgElement } from '../lib/diagram-renderer'
import { Showcase } from './Showcase'
import { Machine } from '../lib/machine-engine'
import { parseMachine } from '../lib/parsing/index'
import { RenderOptions } from '../lib/machine-formatter'

interface DiagramPorps {
    input: string
    options: RenderOptions
    machineSetter: (machine: Machine) => void
}

export const Diagram = ({ input, options, machineSetter }) => {
    const svgRef = useRef(null);
    const [error, setError] = useState(null)
    useAsync(async () => {
        try {
            const machine = parseMachine(input)

            machineSetter(machine)

            const svg = await generateSvgElement(machine, options)
            if(svgRef.current && svg){
                while (svgRef.current.firstChild) {
                    svgRef.current.removeChild(svgRef.current.lastChild);
                }
                svgRef.current.appendChild(svg)
    
                const url = `?dir=${encodeURIComponent(options.dir)}&input=${encodeURIComponent(btoa(input))}`
                window.history.pushState({}, window.document.title, url)
            } 
        }
        catch (e) {
            console.error(e)
            while (svgRef.current.firstChild) {
                svgRef.current.removeChild(svgRef.current.lastChild);
            }
            svgRef.current.appendChild(document.createTextNode(String(e)))
        }
    });
    return (<Showcase className="diagram-container"><div ref={svgRef} /></Showcase>)
}