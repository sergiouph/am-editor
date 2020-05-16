import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import { generateVizCode } from './machine-formatter'
import { parseMachine } from './machine-parser'

export function refresh() {
    const input = document.getElementById('input').value
    const machine = parseMachine(input)
    
    console.log(machine)
    
    const code = generateVizCode(machine);
    const viz = new Viz({ Module, render });

    console.log(code)

    viz
    .renderSVGElement(code)
    .then(function (element) {
        const container = document.getElementById('output')
        while (container.firstChild) {
        container.removeChild(container.lastChild)
        }
        container.appendChild(element)
    })
    .catch((error) => console.error(error));
}