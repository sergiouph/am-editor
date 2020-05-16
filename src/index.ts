import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import jsonNumberAm from './assets/json-number.am'

import { generateVizCode } from './machine-formatter'
import { parseMachine } from './machine-parser'

export async function generateSvgElement(input: string) {
    const machine = parseMachine(input)
    
    console.log(machine)
    
    const code = generateVizCode(machine)
    const viz = new Viz({ Module, render })

    console.log(code)

    return viz.renderSVGElement(code)
}

export async function loadExample() {
    const response = await fetch(jsonNumberAm)
    
    return response.text()
}
