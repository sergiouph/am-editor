import { Machine, State, Transition } from "./machine-engine"
import { Graph, Node, Edge, DotWriter } from './dot'

export class RenderOptions {

    dir: string
    ignoreActions: boolean

    constructor() {
        this.dir = 'LR'
        this.ignoreActions = false
    }

    patch({ dir = null, ignoreActions = null }): RenderOptions {
        const o = new RenderOptions()

        o.dir = dir ?? this.dir
        o.ignoreActions = ignoreActions ?? this.ignoreActions

        return o
    }

}


class RState {



}

class RTransition {

}

class RMachine {

    statesMap: Map<string, RState>
    


}


export function generateVizCode(machine: Machine, options: RenderOptions): string {
    const graph = new Graph()

    graph.rankdir = options.dir
    graph.title = machine.title

    for (const state of machine.states) {
        const node = graph.createNode(state.name)
        node.label = state.label ?? state.name
        node.shape = (state.accepted ? 'doublecircle' : 'circle')
    }

    for (const state of machine.states.filter(s => s.initial)) {
        const initialName = graph.nextName(state.name)
        const initialNode = graph.createNode(initialName)
        initialNode.shape = 'point'
        initialNode.label = ''

        graph.createEdge(initialName, state.name)
    }

    for (const transition of machine.transitions) {
        let source = transition.source.name
        
        if (!options.ignoreActions) {
            for (const action of transition.beforeActions) {
                const actionName = graph.nextName('action')
                const actionNode = graph.createNode(actionName)
                actionNode.label = action
                actionNode.shape = 'box'

                graph.createEdge(source, actionName)

                source = actionName
            }
        }

        let symbol: string

        if (transition.symbols.length === 0) {
            symbol = '\u03B5'  // epsilon lowercase
        }
        else {
            symbol = [...transition.symbols].join('\n')
        }

        if (options.ignoreActions || transition.afterActions.length == 0) {
            const symbolEdge = graph.createEdge(source, transition.target.name)
            symbolEdge.label = symbol
        }
        else {
            for (const action of transition.afterActions) {
                const actionName = graph.nextName('action');
                const actionNode = graph.createNode(actionName)
                actionNode.label = action
                actionNode.shape = 'box'

                if (symbol !== null) {
                    const symbolEdge = graph.createEdge(source, actionName)
                    symbolEdge.label = symbol
                    symbol = null
                }
                else {
                    graph.createEdge(source, actionName)
                }
                
                source = actionName
            }

            graph.createEdge(source, transition.target.name)
        }
    }

    const writer = new DotWriter()
    graph.render(writer)
    return writer.getCode()
}
