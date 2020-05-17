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
        output.push('rankdir=', dotStringify(this.rankdir), ';\n')
        output.push('forcelabels=', dotStringify(this.forcelabels), ';\n')
        for (const node of this.nodes) {
            node.render(output)
        }
        for (const edge of this.edges) {
            edge.render(output)
        }
        output.push('}\n')
    }
}

export function generateVizCode(machine: Machine): string {
    const graph = new Graph()

    for (const state of machine.states) {
        const node = new Node(state.name)
        node.shape = (state.accepted ? 'doublecircle' : 'circle')
        node.label = state.name
        graph.nodes.push(node)

        if (state.initial) {
            const node0 = new Node(`${state.name}_TMP${(Math.random() * 1000000).toFixed(0)}`)
            node0.shape = 'none'
            node0.label = ''
            graph.nodes.push(node0)

            const edge0 = new Edge(node0.name, node.name)
            edge0.arrowhead = 'vee'
            graph.edges.push(edge0)
        }
    }

    for (const transition of machine.transitions) {
        const edge = new Edge(transition.source.name, transition.target.name)
        
        if (transition.symbols.length === 0) {
            edge.label = '\u03B5'
        }
        else {
            edge.label = [...transition.symbols].join(', ')
        }

        graph.edges.push(edge)
    }

    const output = []
    graph.render(output)
    return output.join('')
}