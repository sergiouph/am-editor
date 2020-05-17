import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import jsonNumberAm from './assets/json-number.am'

import { generateVizCode } from './machine-formatter'
import { parseMachine } from './machine-parser'

import $ from 'jquery'
import _ from 'lodash'

async function generateSvgElement(input: string) {
    const machine = parseMachine(input)
    
    console.log(machine)
    
    const code = generateVizCode(machine)
    const viz = new Viz({ Module, render })

    console.log(code)

    return viz.renderSVGElement(code)
}

async function loadExample() {
    const response = await fetch(jsonNumberAm)
    
    return response.text()
}

async function refresh($input, $output, $error) {
    try {
        const input = $input.val()
        const svgElement = await generateSvgElement(input)

        $output.empty()
        $output.append(svgElement)

        $error.text('')
    }
    catch (e) {
        console.error(e)
        $error.text(String(e))
    }
}


export async function init(inputElement: Element, outputElement: Element, errorElement: Element) {
    const $input = $(inputElement);
    const $output = $(outputElement);
    const $error = $(errorElement);
    
    try {
        $input.on('change keyup paste', _.throttle(() => refresh($input, $output, $error), 1000))

        const example = await loadExample()

        $input.val(example)

        await refresh($input, $output, $error)
    }
    catch (e) {
        console.error(e)
        $error.text(String(e))
    }
}