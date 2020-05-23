import { Context } from './Context'
import { Machine, StateData } from '../machine-engine'
import { Source, Location } from './Source'

export function parseMachine(input: string): Machine {
    const machine = new Machine()
    const source = new Source(input)
    const ctx = new Context(source, machine)

    let lastLocation: Location = null

    while (source.isAlive()) {
        source.skipLines()

        const location = source.getLocation()
        const active = (
            parseTitle(ctx) ||
            parseStyle(ctx) ||
            parseStates(ctx) ||
            false
        )

        if (active) {
            if (lastLocation !== null && lastLocation.line === location.line) {
                throw source.error('Expected line break', location)
            }

            lastLocation = location
        }
        else {
            break
        }
    }

    if (source.isAlive()) {
        throw source.error('Invalid syntax')
    }

    return machine
}


function parseTitle(ctx: Context): boolean {
    return ctx.source.transaction(() => {
        const keyword = ctx.source.pullKeyword()
        
        if (keyword !== 'title') {
            return false
        }
    
        ctx.source.skipSpaces()

        ctx.machine.title = ctx.source.pullText(['\n'])
    
        return true
    })
}

function parseStyle(ctx: Context): boolean {
    return false
}


function parseStates(ctx: Context): boolean {
    return ctx.source.transaction(() => {
        let initial = null    
        let accepted = null
    
        if (ctx.source.pullToken('->')) {
            initial = true

            ctx.source.skipSpaces()
        }
        else if (ctx.source.pullToken('=>')) {
            accepted = true

            ctx.source.skipSpaces()
        }
    
        const sources: StateData[] = []
    
        while (true) {
            const name = ctx.source.pullName()
            if (name === null) {
                if (sources.length === 0 && !initial && !accepted) {
                    return false
                }
                else {
                    throw ctx.source.error('Expected state name.')
                }
            }
            
            sources.push({ name, initial, accepted })
            
            ctx.source.skipSpaces()
            if (ctx.source.pullToken(',')) {
                ctx.source.skipLines()
            }
            else {
                break
            }
        }

        let transitionMode = false

        if (ctx.source.pullToken('->')) {
            initial = null
            accepted = null
            transitionMode = true
        }
        else if (ctx.source.pullToken('=>')) {
            initial = null
            accepted = true
            transitionMode = true
        }

        const targets: StateData[] = []
        
        if (transitionMode) {
            ctx.source.skipSpaces()

            while (true) {
                const name = ctx.source.pullName()
                if (name === null) {
                    throw ctx.source.error('Expected target state name.')
                }

                targets.push({ name, initial, accepted })

                ctx.source.skipSpaces()
                if (ctx.source.pullToken(',')) {
                    ctx.source.skipLines()
                }
                else {
                    break
                }
            }

            const symbols: string[] = []

            if (ctx.source.pullToken(':')) {
                ctx.source.skipSpaces()

                while (true) {
                    const symbol = ctx.source.pullText([',', '!', '\n'])
                    if (symbol === null) {
                        throw ctx.source.error('Expected transition symbols.')
                    }

                    symbols.push(symbol)

                    ctx.source.skipSpaces()
                    if (ctx.source.pullToken(',')) {
                        ctx.source.skipLines()
                    }
                    else {
                        break
                    }
                }
            }
            else {
                symbols.push(null)
            }

            const actions: string[] = []
            
            if (ctx.source.pullToken('!')) {
                ctx.source.skipSpaces()
                while(true) {
                    const action = ctx.source.pullText([',', '\n'])
                    if (action === null) {
                        throw ctx.source.error('Expected transition action.')
                    }

                    actions.push(action)

                    ctx.source.skipSpaces()
                    if (ctx.source.pullToken(',')) {
                        ctx.source.skipLines()
                    }
                    else {
                        break
                    }
                }
            }
            else {
                actions.push(null)
            }

            const mSources = sources.map(s => ctx.machine.state(s))
            const mTargets = targets.map(s => ctx.machine.state(s))

            for (const mSource of mSources) {
                for (const mTarget of mTargets) {
                    for (const symbol of symbols) {
                        for (const action of actions) {
                            ctx.machine.transition(mSource, mTarget, symbol, action)
                        }
                    }
                }
            }
        }
        else {
            let label: string

            if (ctx.source.pullToken(':')) {
                ctx.source.skipSpaces()

                label = ctx.source.pullText(['!', '\n'])

                if (label === null) {
                    throw ctx.source.error('Expected state label.')
                }
            }

            const actions: string[] = []
            
            if (ctx.source.pullToken('!')) {
                ctx.source.skipSpaces()
                while(true) {
                    const action = ctx.source.pullText([',', '\n'])
                    if (action === null) {
                        throw ctx.source.error('Expected transition action.')
                    }

                    actions.push(action)

                    ctx.source.skipSpaces()
                    if (ctx.source.pullToken(',')) {
                        ctx.source.skipLines()
                    }
                    else {
                        break
                    }
                }
            }
            else {
                actions.push(null)
            }

            for (const state of sources) {
                state.label = label
                
                for (const action of actions) {
                    state.action = action
                    
                    ctx.machine.state(state)
                }
            }
        }

        return true
    })
}
