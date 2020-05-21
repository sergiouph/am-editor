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


export async function downloadDiagram(input: string, dir: string) {
    const machine = parseMachine(input)
    const code = generateVizCode(machine, dir)
    const viz = new Viz({ Module, render })

    const img = await viz.renderImageElement(code)

    img.style.display = 'none'

    const a = document.createElement('a')
    a.href = img.src
    a.target = '_blank'
    a.style.display = 'none'

    try {
        document.body.appendChild(img)
        try {
            document.body.appendChild(a)
    
            a.click()
        }
        finally {
            a.remove()
        }
    }
    finally {
        img.remove()
    }
}
