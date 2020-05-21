export class State {
    name: string
    accepted: boolean
    initial: boolean
    notes: string[]

    constructor(name: string) {
        this.name = name
        this.accepted = false
        this.initial = false
        this.notes = []
    }
}

export class Transition {
    source: State
    target: State
    symbols: string[]
    notes: string[]

    constructor(source: State, target: State) {
        this.source = source
        this.target = target
        this.symbols = []
        this.notes = []
    }
}

export class Machine {
    states: State[]
    transitions: Transition[]

    constructor() {
        this.states = []
        this.transitions = []
    }

    state(name: string, initial: boolean = false, accepted: boolean = false, note: string = null ): State {
        let result = null
        
        for (const state of this.states) {
            if (state.name === name) {
                result = state
                break
            }
        }
    
        if (result === null) {
            result = new State(name)
            this.states.push(result)
        }
    
        if (initial === true) {
            result.initial = true
        }
    
        if (accepted === true) {
            result.accepted = true
        }
    
        if (note) {
            result.notes.push(note)
        }
        
        return result;
    }

    transition(source: State, target: State, symbol: string = null, note: string = null): Transition {
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

        if (note) {
            result.notes.push(note)
        }
        
        return result
    }

}
