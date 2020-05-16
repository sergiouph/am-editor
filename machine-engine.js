function createMachine() {
    return {
        states: [],
        transitions: [],
    }
}

function makeState(machine, { name, initial, accepted, note }) {
    let result = null
    
    for (const state of machine.states) {
        if (state.name === name) {
            result = state
            break
        }
    }

    if (result === null) {
        result = {
            name,
            accepted: null,
            initial: null,
            notes: [],
        }
        machine.states.push(result)
    }

    if (initial === true || initial === false) {
        if (result.initial === null) {
            result.initial = initial
        }
        else if (result.initial !== initial) {
            throw new Error(`Ambiguous state definition: ${name}`)
        }
    }

    if (accepted === true || accepted === false) {
        if (result.accepted === null) {
            result.accepted = accepted
        }
        else if (result.accepted !== accepted) {
            throw new Error(`Ambiguous state definition: ${name}`)
        }
    }

    if (note) {
        result.notes.push(note)
    }
    
    return result;
}

function makeTransition(machine, { source, target, symbol, note }) {
    if (!source || !target) {
        throw new Error('Expected source and target.')
    }

    let result = null

    for (const transition of machine.transitions) {
        if (transition.source.name === source.name && transition.target.name === target.name) {
            result = transition
            break
        }
    }

    if (result === null) {
        result = {
            source, 
            target, 
            symbols: [], 
            notes: [],
        }
        machine.transitions.push(result)
    }
    
    if (symbol) {
        result.symbols.push(symbol)
    }

    if (note) {
        result.notes.push(note)
    }
    
    return result
}
