import { Machine, State, Transition } from "./machine-engine"

function dotStringify(value: any) {
    return JSON.stringify(value)
}

function renderProperties(output: string[], properties: object) {
    const names = Object.keys(properties)
    
    if (names.length > 0) {
        output.push(' [')

        let count = 0

        for (const name of names) {
            const value = properties[name]

            if (value !== null) {
                if (count > 0) {
                    output.push(', ')
                }

                output.push(name)
                output.push('=')
                output.push(dotStringify(value))

                count++
            }
        }

        output.push(']')
    }
}

class Node {
    name: string
    shape: string
    label: string
    xlabel: string

    constructor(name: string) {
        this.name = name
        this.shape = null
        this.label = null
        this.xlabel = null
    }

    render(output: string[]) {
        output.push(this.name)

        renderProperties(output, {
            'shape': this.shape,
            'label': this.label,
            'xlabel': this.xlabel,
        })

        output.push(';\n')
    }
}

class Edge {
    source: string
    target: string
    label: string
    xlabel: string
    arrowhead: string
    
    constructor(source: string, target: string) {
        this.source = source
        this.target = target
        this.label = null
        this.xlabel = null
        this.arrowhead = null
    }

    render(output: string[]) {
        output.push(this.source)
        output.push(' -> ')
        output.push(this.target)

        renderProperties(output, {
            'label': this.label,
            'xlabel': this.xlabel,
            'arrowhead': this.arrowhead,
        })

        output.push(';\n')
    }
}

class Graph {
    type: string
    name: string
    title: string
    rankdir: string
    forcelabels: boolean
    nodes: Node[]
    edges: Edge[]

    constructor() {
        this.type = 'digraph'
        this.name = 'automaton'
        this.rankdir = 'LR'
        this.forcelabels = true
        this.nodes = []
        this.edges = []
    }

    render(output: string[]) {
        output.push(this.type, ' ', dotStringify(this.name), ' {\n')
        
        output.push('graph [fontname = "sans-serif"];\n')
        output.push('node [fontname = "sans-serif"];\n')
        output.push('edge [fontname = "sans-serif"];\n')

        if (this.title) {
            output.push('label=', dotStringify(this.title), ';\n')
        }

        if (this.rankdir) {
            output.push('rankdir=', dotStringify(this.rankdir), ';\n')
        }
        
        output.push('forcelabels=', dotStringify(this.forcelabels), ';\n')
        for (const node of this.nodes) {
            node.render(output)
        }
        for (const edge of this.edges) {
            edge.render(output)
        }
        output.push('}\n')
    }

    createNode(base: string = null): Node {
        const name = this.nextName(base)
        const node = new Node(name)
        this.nodes.push(node)
        return node
    }

    containsName(name: string) {
        for (const node of this.nodes) {
            if (node.name === name) {
                return true
            }
        }
        return false
    }

    nextName(base: string = null) {
        if (base === null) {
            base = 'N'
        }

        let result: string
        let number = 0
        do {
            result = `${base}_${number}`

            number++
        } while (this.containsName(result))

        return result
    }
}

export function generateVizCode(machine: Machine, dir: string): string {
    const graph = new Graph()
    const heads = {}
    const tails = {}

    graph.rankdir = dir
    graph.title = machine.title

    for (const state of machine.states) {
        let head = null
        let tail = null
        const node = graph.createNode('STATE')
        node.label = state.label || state.name
        node.shape = (state.accepted ? 'doublecircle' : 'circle')

        let firstName: string = null
        let lastNode: Node = null

        for (const action of state.actions) {
            const actionNode = graph.createNode('ACTION')
            actionNode.label = action
            actionNode.shape = 'box'

            if (firstName === null) {
                firstName = actionNode.name
            })

            if (lastNode !== null) {
                const actionEdge = new Edge(lastNode.name, actionNode.name)

                graph.edges.push(actionEdge)
            }

            lastNode = actionNode
        }

        if (lastNode != null) {
            const lastEdge = new Edge(lastNode.name, node.name)

            graph.edges.push(lastEdge)
        }

        heads[state.name] = firstName || node.name
        tails[state.name] = node.name
    }

    for (const state of machine.states.filter(s => s.initial)) {
        const target = heads[state.name]
        const initialNode = graph.createNode('INITIAL')
        initialNode.shape = 'point'
        initialNode.label = ''

        const edge0 = new Edge(initialNode.name, target)
        graph.edges.push(edge0)
    }

    for (const transition of machine.transitions) {
        let source = tails[transition.source.name]
        let symbol: string

        if (transition.symbols.length === 0) {
            symbol = '\u03B5'
        }
        else {
            symbol = [...transition.symbols].join(', ')
        }

        for (const action of transition.actions) {
            const actionNode = graph.createNode('ACTION')
            actionNode.label = action
            actionNode.shape = 'box'

            const actionEdge = new Edge(source, actionNode.name)

            if (symbol !== null) {
                actionEdge.label = symbol
                symbol = null
            }

            graph.edges.push(actionEdge)

            source = actionNode.name
        }

        const target = heads[transition.target.name]
        const edge = new Edge(source, target)
        edge.label = symbol
        graph.edges.push(edge)
    }

    const output = []
    graph.render(output)
    return output.join('')
}