import { DotWriter } from './DotWriter'


export class Edge {
    source: string
    target: string
    label: string | null
    xlabel: string | null
    arrowhead: string | null

    constructor(source: string, target: string) {
        this.source = source
        this.target = target
        this.label = null
        this.xlabel = null
        this.arrowhead = null
    }

    render(writer: DotWriter) {
        writer.writeStatement(() => {
            writer.writeString(this.source)
            writer.writeToken('->')
            writer.writeString(this.target)
            writer.writeProperties({
                'label': this.label,
                'xlabel': this.xlabel,
                'arrowhead': this.arrowhead,
            })
        })
    }
}
