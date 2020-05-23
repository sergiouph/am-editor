export class State {
    name: string
    label: string
    accepted: boolean
    initial: boolean
    actions: string[]

    constructor(name: string) {
        this.name = name
        this.accepted = false
        this.initial = false
        this.actions = []
    }
}

export class Transition {
    source: State
    target: State
    symbols: string[]
    actions: string[]

    constructor(source: State, target: State) {
        this.source = source
        this.target = target
        this.symbols = []
        this.actions = []
    }
}

export interface StateData {
    name: string
    label?: string
    initial?: boolean
    accepted?: boolean
    action?: string
}

export class Machine {
    title?: string
    states: State[]
    transitions: Transition[]

    constructor() {
        this.states = []
        this.transitions = []
    }

    state(data: StateData): State {
        let result = null
        
        for (const state of this.states) {
            if (state.name === data.name) {
                result = state
                break
            }
        }
    
        if (result === null) {
            result = new State(data.name)
            this.states.push(result)
        }

        if (data.label) {
            // check for overrides
            result.label = data.label
        }
    
        if (data.initial === true) {
            result.initial = true
        }
    
        if (data.accepted === true) {
            result.accepted = true
        }
    
        if (data.action) {
            result.actions.push(data.action)
        }
        
        return result;
    }

    transition(source: State, target: State, symbol: string = null, action: string = null): Transition {
        if (!source || !target) {
            throw new Error('Expected source and target.')
        }

        let result = null

        for (const transition of this.transitions) {
            if (transition.source.name === source.name && transition.target.name === target.name) {
                result = transition
                break
            }
        }

        if (result === null) {
            result = new Transition(source, target)
            this.transitions.push(result)
        }
        
        if (symbol && !result.symbols.includes(symbol)) {
            result.symbols.push(symbol)
        }

        if (action) {
            result.actions.push(action)
        }
        
        return result
    }

}
