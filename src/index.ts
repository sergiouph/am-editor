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

async function refresh(window: Window, $input, $dir, $output, $error) {
    try {
        const input = $input.val()
        const dir = $dir.val()
        const svgElement = await generateSvgElement(input, dir)

        $output.empty()
        $output.append(svgElement)

        const url = `?dir=${encodeURIComponent(dir)}&input=${encodeURIComponent(btoa(input))}`
        window.history.pushState({}, window.document.title, url)

        $error.text('')
    }
    catch (e) {
        console.error(e)
        $error.text(String(e))
    }
}


function loadUrlValues(window: Window, $input, $dir) {
    const params = new URLSearchParams(window.location.search)
    const dir = params.get('dir')
    const input = params.get('input')

    if (input) { $input.val(atob(input)) }
    if (dir) { $dir.val(dir) }
}


export async function init(
        window: Window, 
        inputElement: Element, 
        dirElement: Element, 
        outputElement: Element, 
        errorElement: Element) {
    const $input = $(inputElement);
    const $dir = $(dirElement);
    const $output = $(outputElement);
    const $error = $(errorElement);

    loadUrlValues(window, $input, $dir)
    
    try {
        const fnRefresh = _.throttle(() => refresh(window, $input, $dir, $output, $error), 1000)

        $input.on('change keyup paste', fnRefresh)
        $dir.on('change', fnRefresh)

        if (!$input.val()) {
            const example = await loadExample()

            $input.val(example)
        }

        await refresh(window, $input, $dir, $output, $error)
    }
    catch (e) {
        console.error(e)
        $error.text(String(e))
    }
}
