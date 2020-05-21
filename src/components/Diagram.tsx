import React, { useEffect, useState, useRef } from 'react'
import { useAsync } from '../lib/tools'
import { generateSvgElement } from '../lib/diagram-renderer'


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