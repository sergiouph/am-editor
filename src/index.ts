import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render'

import jsonNumberAm from './assets/json-number.am'

import { generateVizCode } from './machine-formatter'
import { parseMachine } from './machine-parser'

import $ from 'jquery'
import _ from 'lodash'

async function generateSvgElement(input: string, dir: string) {
    const machine = parseMachine(input)
    const code = generateVizCode(machine, dir)
    const viz = new Viz({ Module, render })

    console.log(code)

    return viz.renderSVGElement(code)
}

async function loadExample() {
    const response = await fetch(jsonNumberAm)
    
    return response.text()
}

async function refresh($input, $dir, $output, $error) {
    try {
        const input = $input.val()
        const dir = $dir.val()
        const svgElement = await generateSvgElement(input, dir)

        $output.empty()
        $output.append(svgElement)

        $error.text('')
    }
    catch (e) {
        console.error(e)
        $error.text(String(e))
    }
}


export async function init(inputElement: Element, dirElement: Element, outputElement: Element, errorElement: Element) {
    const $input = $(inputElement);
    const $dir = $(dirElement);
    const $output = $(outputElement);
    const $error = $(errorElement);
    
    try {
        const fnRefresh = _.throttle(() => refresh($input, $dir, $output, $error), 1000)

        $input.on('change keyup paste', fnRefresh)
        $dir.on('change', fnRefresh)

        const example = await loadExample()

        $input.val(example)

        await refresh($input, $dir, $output, $error)
    }
    catch (e) {
        console.error(e)
        $error.text(String(e))
    }
}