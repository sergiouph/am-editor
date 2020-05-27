import { DotWriter } from './DotWriter'
import { Node } from './Node'
import { Edge } from './Edge'

export class Graph {
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

    createNode(name: string): Node {
        if (this.containsName(name)) {
            throw new Error(`Node already exists: ${JSON.stringify(name)}`)
        }
        const node = new Node(name)
        this.nodes.push(node)
        return node
    }

    createEdge(source: string, target: string): Edge {
        const edge = new Edge(source, target)
        this.edges.push(edge)
        return edge
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
        let result: string
        let number = 0
        do {
            result = `${base ?? ''}_${number}`

            number++
        } while (this.containsName(result))

        return result
    }

    render(output: DotWriter) {
        output.writeToken(this.type)
        output.writeString(this.name)
        output.writeBody(() => {
            if (this.title) {
                output.writeStatement(() => {
                    output.writeProperty('label', this.title)
                })
            }
    
            if (this.rankdir) {
                output.writeStatement(() => {
                    output.writeProperty('rankdir', this.rankdir)
                })
            }
            
            if (this.forcelabels) {
                output.writeStatement(() => {
                    output.writeProperty('forcelabels', this.forcelabels)
                })
            }
            
            output.writeStatement(() => {
                output.writeToken('graph')
                output.writeProperties({
                    fontname: 'sans-serif'
                })
            })
            output.writeStatement(() => {
                output.writeToken('node')
                output.writeProperties({
                    fontname: 'sans-serif'
                })
            })
            output.writeStatement(() => {
                output.writeToken('edge')
                output.writeProperties({
                    fontname: 'sans-serif'
                })
            })
            
            for (const node of this.nodes) {
                node.render(output)
            }
            for (const edge of this.edges) {
                edge.render(output)
            }
        })
    }
}