import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import { generateVizCode } from '../lib/machine-formatter'
import { Machine } from './machine-engine'


export async function generateSvgElement(machine: Machine, dir: string) {
    const code = generateVizCode(machine, dir)
    const viz = new Viz({ Module, render })

    console.log(code)

    return viz.renderSVGElement(code)
}
