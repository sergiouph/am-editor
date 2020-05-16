import { createMachine, makeState, makeTransition } from './machine-engine'

const BLANKS = [' ', '\t', '\n', '\r']

function tokenize(input) {
    const tokens = []
    const buffer = []
    let delimiter = null
    let escaped = false

    function flushBuffer() {
        if (escaped) {
            throw new Error('Unfinished escaped char')
        }
        else if (buffer.length > 0 || delimiter !== null) {
            const value = buffer.join('')
            tokens.push({ value })
            buffer.length = 0
        }
    }

    for (const char of input) {
        if (delimiter !== null) {
            if (char === '\\') {
                escaped = true
            }
            else if (escaped) {
                escaped = false
                if (['\"', '\'', '\\'].includes(char)) {
                    buffer.push(char)
                }
                else if (char === 'b') { buffer.push('\b') }
                else if (char === 'f') { buffer.push('\f') }
                else if (char === 'n') { buffer.push('\n') }
                else if (char === 'r') { buffer.push('\r') }
                else if (char === 't') { buffer.push('\t') }
                // TODO implement \uXXXX
                else {
                    throw new Error(`Unsupported escaped char: ${JSON.stringify(char)}`)
                }
            }
            else if (char === delimiter) {
                flushBuffer()
                delimiter = null
            }
            else {
                buffer.push(char)
            }
        }
        else if (BLANKS.includes(char)) {
            flushBuffer()
        }
        else if (char === '\"' || char === '\'') {
            delimiter = char
        }
        else {
            buffer.push(char)
        }
    }

    flushBuffer()

    return tokens
}

function read(tokens, expected) {
    if (tokens.length === 0) {
        throw new Error('Unexpected EOF')
    }
    
    const token = tokens.shift()

    if (expected && !expected.includes(token.value)) {
        throw new Error(`Unexpected token: ${token.value}`)
    }
    
    return token.value
}

function tryRead(tokens, expected) {
    if (tokens.length > 0) {
        if (expected && !expected.includes(tokens[0].value)) {
            return null
        }
        const token = tokens.shift()
        return token.value
    }
    return null
}

export function parseMachine(input) {
    const machine = createMachine()
    const tokens = tokenize(input)

    while (tokens.length > 0) {
        if (tryReadState(tokens, machine) === null 
                && tryReadTransition(tokens, machine) === null) {
            break
        }
    }

    if (tokens.length > 0) {
        throw new Error(`Unexpected token: ${tokens[0].value}`)
    }

    return machine
}

function tryReadState(tokens, machine) {
    const type = tryRead(tokens, ['I', 'A', 'S'])

    if (type === null) { return null }

    const name = read(tokens)
    const note = tryReadNote(tokens)

    return makeState(machine, { 
        name,
        initial: (type === 'I'),
        accepted: (type === 'A'),
        note,
    })
}

function tryReadTransition(tokens, machine) {
    if (tryRead(tokens, ['T']) === null) {
        return null
    }

    const sourceName = read(tokens)

    read(tokens, ['->'])

    const targetName = read(tokens)
    
    let symbol
    if (tryRead(tokens, [':'])) {
        symbol = read(tokens)
    }

    const note = tryReadNote(tokens)

    const source = makeState(machine, { name: sourceName })
    const target = makeState(machine, { name: targetName })
    return makeTransition(machine, { source, target, symbol, note })
}

function tryReadNote(tokens) {
    if (!tryRead(tokens, ['!'])) {
        return null
    }
    return read(tokens)
}
