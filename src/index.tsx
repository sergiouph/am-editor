import React from 'react'
import ReactDOM from 'react-dom'

import jsonNumberAm from './assets/json-number.am'

import { App } from './app'

async function loadExample() {
    const response = await fetch(jsonNumberAm)
    
    return response.text()
}

(async () => {
    try {
        const params = new URLSearchParams(window.location.search)
        const dir = params.get('dir') || 'LR'
        let input = params.get('input')
    
        if (input) {
            input = atob(input)
        }
        else {
            input = await loadExample();
        }

        const element = (<App input0={input} dir0={dir} />);

        ReactDOM.render(element, document.getElementById('app'))
    }
    catch (e) {
        console.log(e)
    }
})();