import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import { generateVizCode } from '../lib/machine-formatter'
import { parseMachine } from '../lib/machine-parser'


export async function generateSvgElement(input: string, dir: string) {
    const machine = parseMachine(input)
    const code = generateVizCode(machine, dir)
    const viz = new Viz({ Module, render })

    console.log(code)

    return viz.renderSVGElement(code)
}
